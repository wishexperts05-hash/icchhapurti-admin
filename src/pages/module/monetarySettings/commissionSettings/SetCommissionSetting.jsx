import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import LoaderSpinner from "../../../../components/uiComponent/LoaderSpinner";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormField from "../../../../components/uiComponent/FormField";
import Button from "../../../../components/uiComponent/Button";
import { BeatLoader } from "react-spinners";
import useDropdown from "../../../../hooks/dropdown/useDropdown";
import useCommissionSetting from "../../../../hooks/monetarySettings/useCommissionSetting";
import { useParams, useNavigate } from "react-router-dom";
import DetailsField from "../../../../components/uiComponent/DetailsField";

const SetCommissionSetting = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = Boolean(id);
    const [isEditing, setIsEditing] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);

    // ⬇ Dropdown Values
    const {
        fetchSalesType,
        fetchUserType,
        fetchProductDropdown,
        salesType,
        userType,
        productDropdown,
        loadingSales,
        loadingUser,
        loadingProduct,
        resetUserType
    } = useDropdown();

    // ⬇ Commission Setting API
    const {
        fetchCommissionSettingDetails,
        commissionSettingDetails,
        addCommissionSetting,
        updateCommissionSetting,
        loading: commissionLoading,
        resetCommissionSettingDetails
    } = useCommissionSetting();
    
    useEffect(() => {
        if (id) {
            fetchCommissionSettingDetails(id);
        }
        return () => {
            resetCommissionSettingDetails();
        };
    }, [id]);

    useEffect(() => {
        fetchSalesType();
        fetchProductDropdown();
    }, []);

    useEffect(() => {
        setIsEditing(false);
    }, [id]);

    const getProductName = (productId) => {
        const product = productDropdown.find(item => item._id === productId);
        return product ? product.name : "-";
    };

    if ((loadingSales || loadingProduct) || commissionLoading) {
        return (
            <div className="w-full flex items-center justify-center py-10">
                <LoaderSpinner />
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <BreadCrumb
                linkText={[
                    { text: "Monetary Settings" },
                    { text: "Commission Settings", href: "/commission-settings" },
                    { text: isEditMode ? (isEditing ? "Edit Commission" : "View Commission") : "Add Commission" },
                ]}
            />

            <PagePath2
                title={isEditMode ? (isEditing ? "Edit Commission Setting" : "View Commission Setting") : "Add Commission Setting"}
                description="Manage commission settings for staff, user, promoter."
            />

            <div className="bg-white rounded-lg shadow-md p-6 mt-4">
                {isEditMode && !isEditing ? (
                    // ⬇ VIEW MODE
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <DetailsField
                            label="Sales Type"
                            value={commissionSettingDetails?.salesType || "-"}
                        />

                        <DetailsField
                            label="User Type"
                            value={commissionSettingDetails?.userType || "-"}
                        />

                        <DetailsField
                            label="Product"
                            value={getProductName(commissionSettingDetails?.productId) || "-"}
                        />

                        <DetailsField
                            label="Product Quantity"
                            value={commissionSettingDetails?.productQuantity || "-"}
                            type="number"
                        />

                        <DetailsField
                            label="Commission"
                            value={commissionSettingDetails?.commission || "-"}
                        />

                        <div className="col-span-2 flex justify-center gap-4 mt-4">
                            <Button
                                text="Back"
                                variant={2}
                                type="button"
                                onClick={() => navigate("/commission-settings")}
                            />

                            <Button
                                text="Edit Commission"
                                type="button"
                                variant={1}
                                onClick={() => setIsEditing(true)}
                            />
                        </div>
                    </div>
                ) : (
                    <Formik
                        enableReinitialize
                        initialValues={{
                            salesType: commissionSettingDetails?.salesType || "",
                            userType: commissionSettingDetails?.userType || "",
                            productId: commissionSettingDetails?.productId || "",
                            productQuantity: commissionSettingDetails?.productQuantity || "",
                            commission: commissionSettingDetails?.commission || "",
                        }}
                        validationSchema={Yup.object({
                            salesType: Yup.string().required("Sales type is required"),
                            userType: Yup.string().required("User type is required"),
                            productId: Yup.string().required("Product is required"),
                            productQuantity: Yup.number()
                                .typeError("Quantity must be a number")
                                .required("Product quantity is required"),
                            commission: Yup.number()
                                .typeError("Commission must be a number")
                                .required("Commission is required"),
                        })}
                        onSubmit={async (values) => {
                            if (isEditMode) {
                                await updateCommissionSetting(id, values);
                            } else {
                                await addCommissionSetting(values);
                            }
                            navigate("/commission-settings");
                        }}
                    >
                        {({ values, setFieldValue }) => (
                            <Form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <FormField
                                    label="Sales Type"
                                    name="salesType"
                                    fieldType="select"
                                    options={salesType.map((i) => ({ value: i, label: i }))}
                                    loading={loadingSales}
                                    onChange={(option) => {
                                        const selectedValue = option?.value || "";
                                        setFieldValue('salesType', selectedValue);
                                        resetUserType();
                                        if (selectedValue) {
                                            fetchUserType(selectedValue);
                                        }
                                    }}
                                />

                                <FormField
                                    label="User Type"
                                    name="userType"
                                    fieldType="select"
                                    options={userType.map((i) => ({ value: i, label: i }))}
                                    loading={loadingUser}
                                />

                                <FormField
                                    label="Select Product"
                                    name="productId"
                                    fieldType="select"
                                    loading={loadingProduct}
                                    options={productDropdown.map((item) => ({
                                        value: item._id,
                                        label: item.name,
                                    }))}
                                />

                                <FormField
                                    label="Enter Product quantity"
                                    name="productQuantity"
                                    placeholder="Enter quantity"
                                    fieldType="input"
                                    type="number"
                                />

                                <FormField
                                    label="Commission"
                                    name="commission"
                                    placeholder="Enter commission"
                                    fieldType="input"
                                    type="number"
                                />

                                <div className="col-span-2 flex justify-center gap-4 mt-4">
                                    <Button
                                        text={isEditMode ? "Cancel" : "Back"}
                                        variant={2}
                                        type="button"
                                        onClick={() => {
                                            if (isEditMode) {
                                                setIsEditing(false);
                                            } else {
                                                navigate("/commission-settings");
                                            }
                                        }}
                                    />

                                    <Button
                                        text={isEditMode ? "Update Commission" : "Add Commission"}
                                        type="submit"
                                        variant={1}
                                        disabled={commissionLoading}
                                        icon={commissionLoading ? <BeatLoader size={8} color="#fff" /> : null}
                                    />
                                </div>
                            </Form>
                        )}
                    </Formik>
                )}
            </div>
        </div>
    );
};

export default SetCommissionSetting;