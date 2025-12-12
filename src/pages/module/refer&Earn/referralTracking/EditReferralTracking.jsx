import { Formik } from "formik";
import { Form } from "formik";
import * as Yup from "yup";
import Button from "../../../../components/uiComponent/Button";
import FormField from "../../../../components/uiComponent/FormField";
import { useEffect } from "react";
import useReferAndEarn from "../../../../hooks/referAndEarn/useReferAndEarn";
import LoaderSpinner from "../../../../components/uiComponent/LoaderSpinner";

const EditReferralTracking = ({ onClose }) => {
    const { refferalDisSettingById, loading, updateRefferalDisSetting,
        fetchRefferalDisSetting, resetRefferalDisSettingById } = useReferAndEarn();

    useEffect(() => {
        return () => {
            resetRefferalDisSettingById();
        };
    }, []);

    const validationSchema = Yup.object().shape({
        discount: Yup.number()
            .required("Discount is required")
            .min(0, "Discount cannot be negative")
            .max(100, "Discount cannot exceed 100"),
    });

    const handleSave = async (values) => {
        if (!refferalDisSettingById?._id) {
            alert("Setting ID not found");
            return;
        }
        const updateData = { discount: values.discount };
        await updateRefferalDisSetting(refferalDisSettingById._id, updateData);
        fetchRefferalDisSetting();
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-2xl w-[420px] shadow-2xl">
                {loading ? (
                    <div className="flex justify-center items-center py-8">
                        <LoaderSpinner />
                    </div>
                ) : refferalDisSettingById ? (
                    <Formik
                        initialValues={{
                            discount: refferalDisSettingById.discount || 0,
                            referralType: refferalDisSettingById.referralType || "",
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => handleSave(values)}
                    >
                        {({ isSubmitting, errors, touched }) => (
                            <Form className="flex flex-col space-y-6">
                                {/* Title */}
                                <label className="font-semibold text-xl text-center text-gray-800">
                                    Edit Referral Discount
                                </label>

                                {/* Referral Type (Read-only) */}
                                <FormField
                                    name="referralType"
                                    fieldType="input"
                                    label="Referral Type"
                                    placeholder="Referral Type"
                                    type="text"
                                    readOnly
                                />

                                {/* Discount Input */}
                                <FormField
                                    name="discount"
                                    fieldType="input"
                                    label="Discount (%)"
                                    placeholder="Enter discount percentage"
                                    type="number"
                                />

                                {/* Buttons */}
                                <div className="flex justify-center gap-6 pt-1">
                                    <Button
                                        text="Cancel"
                                        variant={2}
                                        type="button"
                                        onClick={onClose}
                                    />
                                    <Button
                                        text="Save"
                                        type="submit"
                                        variant={1}
                                        disabled={isSubmitting || loading}
                                    />
                                </div>
                            </Form>
                        )}
                    </Formik>
                ) : (
                      <div className="flex justify-center items-center py-8">
                        <LoaderSpinner />
                    </div>
                )}
            </div>
        </div>
    );
};

export default EditReferralTracking;
