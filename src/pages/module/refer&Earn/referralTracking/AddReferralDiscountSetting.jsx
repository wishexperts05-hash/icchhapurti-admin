import { Formik, Form } from "formik";
import * as Yup from "yup";
import Button from "../../../../components/uiComponent/Button";
import FormField from "../../../../components/uiComponent/FormField";
import { useEffect, useState } from "react";
import useReferAndEarn from "../../../../hooks/referAndEarn/useReferAndEarn";
import LoaderSpinner from "../../../../components/uiComponent/LoaderSpinner";

const AddReferralDiscountSetting = ({ onClose }) => {
    const { createRefferalDisSetting, fetchReferralTypes, fetchRefferalDisSetting, loading } = useReferAndEarn();
    const [referralTypes, setReferralTypes] = useState([]);
    const [fetchingTypes, setFetchingTypes] = useState(true);

    useEffect(() => {
        const getTypes = async () => {
            try {
                const types = await fetchReferralTypes();
                if (types) {
                    setReferralTypes(types);
                }
            } catch (error) {
                console.error("Failed to fetch referral types", error);
            } finally {
                setFetchingTypes(false);
            }
        };
        getTypes();
    }, []);

    const validationSchema = Yup.object().shape({
        referralType: Yup.string().required("Referral Type is required"),
        ReferrerCoins: Yup.number()
            .required("Referrer Coins is required")
            .min(0, "Coins cannot be negative"),
        RefereeCoins: Yup.number()
            .required("Referee Coins is required")
            .min(0, "Coins cannot be negative"),
        isActive: Yup.boolean().default(true),
    });

    const handleSave = async (values) => {
        const payload = {
            referralType: values.referralType,
            ReferrerCoins: values.ReferrerCoins,
            RefereeCoins: values.RefereeCoins,
            isActive: values.isActive,
        };
        const res = await createRefferalDisSetting(payload);
        if (res) {
            fetchRefferalDisSetting();
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-2xl w-[420px] shadow-2xl">
                {fetchingTypes || loading ? (
                    <div className="flex justify-center items-center py-8">
                        <LoaderSpinner />
                    </div>
                ) : (
                    <Formik
                        initialValues={{
                            referralType: "",
                            ReferrerCoins: 0,
                            RefereeCoins: 0,
                            isActive: true,
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => handleSave(values)}
                    >
                        {({ isSubmitting }) => (
                            <Form className="flex flex-col space-y-4">
                                {/* Title */}
                                <label className="font-semibold text-xl text-center text-gray-800 mb-2">
                                    Add Referral Discount Setting
                                </label>

                                {/* Referral Type (Dropdown Select) */}
                                <FormField
                                    name="referralType"
                                    fieldType="select"
                                    label="Referral Type"
                                    placeholder="Select Referral Type"
                                    options={referralTypes}
                                />

                                {/* Referrer Coins */}
                                <FormField
                                    name="ReferrerCoins"
                                    fieldType="input"
                                    label="Referrer Coins"
                                    placeholder="Enter Referrer Coins"
                                    type="number"
                                />

                                {/* Referee Coins */}
                                <FormField
                                    name="RefereeCoins"
                                    fieldType="input"
                                    label="Referee Coins"
                                    placeholder="Enter Referee Coins"
                                    type="number"
                                />

                                {/* Is Active Checkbox */}
                                <div className="py-2">
                                    <FormField
                                        name="isActive"
                                        fieldType="input"
                                        type="checkbox"
                                        label="Is Active"
                                    />
                                </div>

                                {/* Buttons */}
                                <div className="flex justify-center gap-6 pt-2">
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
                )}
            </div>
        </div>
    );
};

export default AddReferralDiscountSetting;
