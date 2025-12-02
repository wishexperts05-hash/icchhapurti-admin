import { Formik } from "formik";
import { Form, Field } from "formik";
import Button from "../../../../components/uiComponent/Button";
import FormField from "../../../../components/uiComponent/FormField";

const EditReferralTracking = ({ onClose }) => {

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-none flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl w-[400px] shadow-xl">

                <Formik
                    initialValues={{ discount: "10%" }}
                    onSubmit={(values) => {
                        console.log("Updated:", values);
                        onClose();
                    }}
                >
                    {({ values, handleChange }) => (
                        <Form>

                            <label className="font-semibold text-lg block mb-2">
                                Edit Referral Discount
                            </label>

                            <FormField
                               
                                name="discount"
                                fieldType="input"
                                placeholder="Enter discount"
                                type="text"
                            />


                            <div className="col-span-2 flex justify-center gap-4 mt-4">
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
