import { Formik } from "formik";
import { Form, Field } from "formik";
import Button from "../../../../components/uiComponent/Button";
import FormField from "../../../../components/uiComponent/FormField";
import Swal from "sweetalert2";

const EditReferralTracking = ({ onClose }) => {
    // handle save
    const handleSave = () => {
        Swal.fire("Saved!", "", "success");
    };
    
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-2xl w-[420px] shadow-2xl">
                <Formik
                    initialValues={{ discount: "10%" }}
                    onSubmit={(values) => {
                        console.log("Updated:", values);
                        onClose();
                    }}
                >
                    {() => (
                        <Form className="flex flex-col space-y-6">
                            {/* Title */}
                            <label className="font-semibold text-xl text-center text-gray-800">
                                Edit Referral Discount
                            </label>
                            {/* Input */}
                            <FormField
                                name="discount"
                                fieldType="input"
                                placeholder="Enter discount"
                                type="text"
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
                                    onClick={handleSave}
                                    variant={1}
                                />
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default EditReferralTracking;
