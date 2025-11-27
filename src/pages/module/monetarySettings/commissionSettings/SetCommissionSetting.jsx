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
                            name: countryDetail?.country?.name || "",
                            defaultLanguage: countryDetail?.country?.defaultLanguage || "",
                            defaultCurrency: countryDetail?.country?.defaultCurrency || "",
                        }}
                        validationSchema={Yup.object({
                            name: Yup.string().required("Country is required"),
                            defaultLanguage: Yup.string().required(
                                "Default language is required"
                            ),
                            defaultCurrency: Yup.string().required(
                                "Default Currency is required"
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
                                        const data = await getCountryByName(values.name);
                                        if (data) {
                                            setFieldValue("defaultLanguage", data.defaultLanguage || "");
                                            setFieldValue("defaultCurrency", data.defaultCurrency || "");

                                        }
                                        setLocalLoading(false);
                                    }
                                };

                                autoFill();
                            }, [values.name]);
                            return (
                                <Form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <FormField
                                        label="Country"
                                        name="name"
                                        fieldType="select"
                                        options={[
                                            { value: "", label: "Choose Country" },
                                            ...dropdownOptions,
                                        ]}
                                    />

                                    <FormField
                                        label="Default Language"
                                        name="defaultLanguage"
                                        placeholder="Enter default language (e.g., EN)"
                                        rightElement={localLoading ? <BeatLoader size={6} /> : null}
                                    />


                                    <FormField
                                        label="Default Currency"
                                        name="defaultCurrency"
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