import React from 'react'
import BreadCrumb from '../../../../components/uiComponent/BreadCrumb';
import PagePath2 from '../../../../components/uiComponent/PagePath2';
import LoaderSpinner from '../../../../components/uiComponent/LoaderSpinner';
import { Form, Formik } from 'formik';
import FormField from '../../../../components/uiComponent/FormField';
import { BeatLoader } from 'react-spinners';
import Button from '../../../../components/uiComponent/Button';

const SetCommissionSetting = () => {
    return (
        <div className="bg-gray-50 min-h-screen">
            <BreadCrumb
                linkText={[
                    { text: "Dashboard" },
                    { text: "Country Management", href: "/country-management" },
                    { text: isEditMode ? "Edit Country" : "Add Country" },
                ]}
            />

            <PagePath2
                title={isEditMode ? "Edit Country" : "Add Country"}
                description="Manage country information below."
            />

            {pageLoading ? (
                <div className="w-full flex items-center justify-center">
                    <LoaderSpinner />
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow-md p-6 mt-4">
                    <Formik
                        enableReinitialize
                        initialValues={{
                            salesType: countryDetail?.country?.salesType || "",
                            userType: countryDetail?.country?.userType || "",
                            productId: countryDetail?.country?.productId || "",
                            productQuantity: countryDetail?.country?.productQuantity || "",
                            commissionIn: countryDetail?.country?.commissionIn || "",
                        }}
                        validationSchema={Yup.object({
                            salesType: Yup.string().required("Sales Type is required"),
                            userType: Yup.string().required(
                                "User Type is required"
                            ),
                            productId: Yup.string().required(
                                "Product is required"
                            ),
                            productQuantity: Yup.string().required(
                                "Product Quantity is required"
                            ),
                            commissionIn: Yup.string().required(
                                "Commission is required"
                            ),
                        })}
                        onSubmit={async (values) => {
                            const payload = {
                                ...values,
                                easyReturn,
                                visible,
                            };

                            if (isEditMode) {
                                await updateCountry(id, payload);
                            } else {
                                await addCountry(payload);
                            }
                        }}
                    >
                        {({ values, setFieldValue }) => {

                            useEffect(() => {
                                const autoFill = async () => {
                                    if (values.name) {
                                        setLocalLoading(true);
                                        const data = await getCountryByName(values.salesType);
                                        if (data) {
                                            setFieldValue("userType", data.userType || "");
                                            setFieldValue("productId", data.productId || "");

                                        }
                                        setLocalLoading(false);
                                    }
                                };

                                autoFill();
                            }, [values.name]);
                            return (
                                <Form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <FormField
                                        label="Sales Type"
                                        name="salesType"
                                        fieldType="select"
                                        options={[
                                            { value: "", label: "Choose Sales Type" },
                                            ...dropdownOptions,
                                        ]}
                                    />

                                    <FormField
                                        label="User Type"
                                        name="userType"
                                        placeholder="Enter user type"
                                        rightElement={localLoading ? <BeatLoader size={6} /> : null}
                                    />

                                    <FormField
                                        label="Select Product"
                                        name="productId"
                                        placeholder="Enter currency (e.g., USD, INR)"
                                        rightElement={localLoading ? <BeatLoader size={6} /> : null}
                                    />

                                    <div className="col-span-2 flex justify-center gap-4 mt-4">
                                        <Button
                                            text="Cancel"
                                            variant={2}
                                            type="button"
                                            onClick={handleCancel}
                                        />
                                        <Button
                                            text={isEditMode ? "Update Country" : "Add Country"}
                                            type="submit"
                                            variant={1}
                                        />
                                    </div>
                                </Form>
                            )
                        }}
                    </Formik>
                </div>
            )}
        </div>
    )
}

export default SetCommissionSetting