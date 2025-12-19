import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormField from "../../../components/uiComponent/FormField";
import Button from "../../../components/uiComponent/Button";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../components/uiComponent/PagePath2";
import useOfferManagement from "../../../hooks/offerManagement/useOfferManagement";
import useDropdown from "../../../hooks/dropdown/useDropdown";
import LoaderSpinner from "../../../components/uiComponent/LoaderSpinner";

// Dynamic validation schema using Yup.when to depend on form values.offerType
const getValidationSchema = () => {
    return Yup.object().shape({
        title: Yup.string().required("Offer title is required"),
        offerType: Yup.string().required("Offer type is required"),
        targetAudience: Yup.string().required("Target audience is required"),
        startDate: Yup.date().required("Start date is required"),
        endDate: Yup.date()
            .min(Yup.ref("startDate"), "End date must be after start date")
            .required("End date is required"),
        isActive: Yup.boolean(),

        // BUY_GET fields
        buyGet: Yup.object().when('offerType', (offerType, schema) => {
            if (offerType === 'BUY_GET') {
                return Yup.object().shape({
                    productId: Yup.string().required('Product is required'),
                    buyQty: Yup.number().typeError('Buy quantity must be a number').positive('Buy quantity must be positive').required('Buy quantity is required'),
                    getQty: Yup.number().typeError('Get quantity must be a number').positive('Get quantity must be positive').required('Get quantity is required'),
                }).required();
            }
            return schema.notRequired();
        }),

        // DISCOUNT fields
        discount: Yup.object().when('offerType', (offerType, schema) => {
            if (offerType === 'DISCOUNT') {
                return Yup.object().shape({
                    productId: Yup.string().required('Product is required'),
                    discountPercent: Yup.number().typeError('Discount must be a number').min(1, 'Discount must be at least 1%').max(100, 'Discount cannot exceed 100%').required('Discount percent is required'),
                }).required();
            }
            return schema.notRequired();
        }),

        // FREE_DELIVERY
        productId: Yup.string().when('offerType', (offerType, schema) => {
            return offerType === 'FREE_DELIVERY' ? schema.required('Product is required') : schema.notRequired();
        }),

        // PRODUCT_BUNDLE
        productBundle: Yup.object().when('offerType', (offerType, schema) => {
            if (offerType === 'PRODUCT_BUNDLE') {
                return Yup.object().shape({
                    buyProductIds: Yup.array().min(1, 'Select at least one product to buy').required('Buy products are required'),
                    getProductId: Yup.string().required('Get product is required'),
                }).required();
            }
            return schema.notRequired();
        }),
    });
};

const OfferManagementAdd = () => {
    const { loading, fetchOfferDetails, addOffer, updateOffer, offerDetail, resetOfferDetails } = useOfferManagement();
    const { fetchProductDropdown, loadingProducts, productDropdown, fetchUserType, loadingUserType, userType,
        fetchOfferType, loadingOfferType, offerType
    } = useDropdown();
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const isEditMode = location.pathname.includes("edit-offer") || (id && !location.pathname.includes("add-offer"));
    const [selectedOfferType, setSelectedOfferType] = useState("");

    useEffect(() => {
        fetchProductDropdown();
        fetchUserType();
        fetchOfferType();
    }, []);
    console.log("offerDetail :", offerDetail);

    useEffect(() => {
        if (id && isEditMode) {
            fetchOfferDetails(id);
        }
        return () => {
            resetOfferDetails();
        };
    }, [id, isEditMode]);

    useEffect(() => {
        if (offerDetail && isEditMode) {
            setSelectedOfferType(offerDetail.offerType || "");
        }
    }, [offerDetail, isEditMode]);

    const parseDateValue = (val) => {
        if (!val) return "";
        if (val instanceof Date) return val;
        if (typeof val === "string") {
            // handle dd/mm/yyyy format or ISO
            if (val.includes("/")) {
                const parts = val.split("/");
                if (parts.length === 3) {
                    const [d, m, y] = parts;
                    // construct yyyy-mm-dd for Date constructor
                    return new Date(`${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`);
                }
            }
            const parsed = new Date(val);
            return isNaN(parsed.getTime()) ? "" : parsed;
        }
        return "";
    };

    const getInitialValues = () => {
        if (!isEditMode) {
            return {
                title: "",
                offerType: "",
                targetAudience: "ALL",
                startDate: "",
                endDate: "",
                isActive: true,
                buyGet: { productId: "", buyQty: "", getQty: "" },
                discount: { productId: "", discountPercent: "" },
                productId: "",
                productBundle: { buyProductIds: [], getProductId: "" },
            };
        }

        return {
            title: offerDetail?.title || "",
            offerType: offerDetail?.offerType || "",
            targetAudience: offerDetail?.targetAudience || "ALL",
            startDate: parseDateValue(offerDetail?.startDate) || "",
            endDate: parseDateValue(offerDetail?.endDate) || "",
            isActive: offerDetail?.isActive ?? true,
            // Normalize nested structures to match form fields
            buyGet: offerDetail?.buyGet || { productId: "", buyQty: "", getQty: "" },
            discount: offerDetail?.discount || { productId: "", discountPercent: "" },
            // Free delivery may be stored under freeDelivery.productId
            productId: offerDetail?.productId || offerDetail?.freeDelivery?.productId || "",
            productBundle: (() => {
                const pb = offerDetail?.productBundle;
                if (!pb) return { buyProductIds: [], getProductId: "" };
                // Support different shapes: { buyProducts: [{productId, ...}], getProduct: {productId,...} }
                const buyProductIds = (pb.buyProductIds && Array.isArray(pb.buyProductIds))
                    ? pb.buyProductIds
                    : (pb.buyProducts && Array.isArray(pb.buyProducts))
                        ? pb.buyProducts.map(p => p.productId || p._id || "")
                        : [];
                const getProductId = pb.getProductId || pb.getProduct?.productId || pb.getProduct?._id || "";
                return { buyProductIds, getProductId };
            })(),
        };
    };

    const handleSubmit = async (values, { resetForm }) => {
        console.log('handleSubmit called with values:', values);
        try {
            console.log('Preparing payload...');
            const payload = {
                title: values.title,
                offerType: values.offerType,
                targetAudience: values.targetAudience,
                startDate: values.startDate,
                endDate: values.endDate,
                isActive: values.isActive,
            };

            // Add type-specific fields
            if (values.offerType === "BUY_GET") {
                payload.buyGet = values.buyGet;
            } else if (values.offerType === "DISCOUNT") {
                payload.discount = values.discount;
            } else if (values.offerType === "FREE_DELIVERY") {
                payload.productId = values.productId;
            } else if (values.offerType === "PRODUCT_BUNDLE") {
                payload.productBundle = values.productBundle;
            }

            if (isEditMode && id) {
                console.log('Calling updateOffer with id:', id, 'payload:', payload);
                await updateOffer(id, payload);
            } else {
                console.log('Calling addOffer with payload:', payload);
                await addOffer(payload);
            }
            resetForm();
            navigate("/offer-management");
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    const handleCancel = () => {
        navigate("/offer-management");
    };

    // Map `offerType` strings from `useDropdown` into select options
    const offerTypeOptions = (offerType || []).map((ot) => {
        const labelMap = {
            BUY_GET: 'Buy & Get',
            DISCOUNT: 'Discount',
            FREE_DELIVERY: 'Free Delivery',
            PRODUCT_BUNDLE: 'Product Bundle',
        };
        return { value: ot, label: labelMap[ot] || ot };
    });

    const productOptions = productDropdown?.map((p) => ({
        value: p._id,
        label: p.productName || p.name,
    })) || [];

    const initialValues = getInitialValues();
    const validationSchema = getValidationSchema();

    return (
        <div className="bg-gray-50 min-h-screen">
            <BreadCrumb
                linkText={[
                    { text: "Offer Management", href: "/offer-management" },
                    { text: isEditMode ? "Edit Offer" : "Add New Offer" },
                ]}
            />

            <PagePath2 title={isEditMode ? "Edit Offer" : "Add New Offer"} />

            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <LoaderSpinner />
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-md p-6 mt-4">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                        enableReinitialize
                    >
                        {({ values, setFieldValue, errors, touched }) => (
                            <Form className="space-y-6" onSubmitCapture={() => { console.log('Form onSubmitCapture'); }}>
                                {/* Basic Information Section */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <FormField
                                        label="Offer Title"
                                        name="title"
                                        placeholder="Enter offer title"
                                    />
                                    <FormField
                                        label="Offer Type"
                                        name="offerType"
                                        fieldType="select"
                                        options={offerTypeOptions}
                                        isLoading={loadingOfferType}
                                        disabled={isEditMode}
                                        onChange={(option) => {
                                            setFieldValue("offerType", option?.value || "");
                                            setSelectedOfferType(option?.value || "");
                                        }}
                                    />

                                    <FormField
                                        label="Start Date"
                                        name="startDate"
                                        type="date"
                                    />
                                    <FormField
                                        label="End Date"
                                        name="endDate"
                                        type="date"
                                    />

                                    <FormField
                                        label="Target Audience"
                                        name="targetAudience"
                                        fieldType="select"
                                        options={userType}
                                        isLoading={loadingUserType}
                                    />
                                </div>

                                {/* Conditional Fields Based on Offer Type */}
                                {selectedOfferType === "BUY_GET" && (
                                    <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Buy & Get Details</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                            <FormField
                                                label="Product"
                                                name="buyGet.productId"
                                                fieldType="select"
                                                options={productOptions}
                                                isLoading={loadingProducts}
                                            />
                                            <FormField
                                                label="Buy Quantity"
                                                name="buyGet.buyQty"
                                                type="number"
                                                placeholder="Enter quantity to buy"
                                            />
                                            <FormField
                                                label="Get Quantity (Free)"
                                                name="buyGet.getQty"
                                                type="number"
                                                placeholder="Enter free quantity"
                                            />
                                        </div>
                                    </div>
                                )}

                                {selectedOfferType === "DISCOUNT" && (
                                    <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Discount Details</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <FormField
                                                label="Product"
                                                name="discount.productId"
                                                fieldType="select"
                                                options={productOptions}
                                                isLoading={loadingProducts}
                                            />
                                            <FormField
                                                label="Discount Percentage (%)"
                                                name="discount.discountPercent"
                                                type="number"
                                                placeholder="Enter discount (1-100)"
                                                onInput={(e) => {
                                                    let value = e.target.value;
                                                    if (value > 100) value = 100;
                                                    setFieldValue("discount.discountPercent", value);
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}

                                {selectedOfferType === "FREE_DELIVERY" && (
                                    <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Free Delivery Details</h3>
                                        <FormField
                                            label="Product"
                                            name="productId"
                                            fieldType="select"
                                            options={productOptions}
                                            isLoading={loadingProducts}
                                        />
                                    </div>
                                )}

                                {selectedOfferType === "PRODUCT_BUNDLE" && (
                                    <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Bundle Details</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <FormField
                                                label="Products to Buy (Multi-select)"
                                                name="productBundle.buyProductIds"
                                                fieldType="select"
                                                options={productOptions}
                                                isMulti
                                                isLoading={loadingProducts}
                                                onChange={(selectedOptions) => {
                                                    const ids = selectedOptions?.map((opt) => opt.value) || [];
                                                    setFieldValue("productBundle.buyProductIds", ids);
                                                }}
                                            />
                                            <FormField
                                                label="Free Product"
                                                name="productBundle.getProductId"
                                                fieldType="select"
                                                options={productOptions}
                                                isLoading={loadingProducts}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <hr className="my-6" />
                                <div className="col-span-1 sm:col-span-2 flex justify-center gap-4">
                                    <Button
                                        text="Cancel"
                                        variant={2}
                                        type="button"
                                        onClick={handleCancel}
                                    />
                                    <Button
                                        text={isEditMode ? "Update Offer" : "Add Offer"}
                                        type="submit"
                                        variant={1}
                                        // onClick={() => { console.log('Submit Button clicked', { values, errors, touched }); }}
                                    />
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            )}
        </div>
    );
};

export default OfferManagementAdd;