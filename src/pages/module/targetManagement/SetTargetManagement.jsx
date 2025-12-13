import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../components/uiComponent/PagePath2";
import Button from "../../../components/uiComponent/Button";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormField from "../../../components/uiComponent/FormField";
import useTargetManagement from "../../../hooks/targetManagment/useTargetManagment";
import { useEffect } from "react";
import { toast } from "react-toastify";
import LoaderSpinner from "../../../components/uiComponent/LoaderSpinner";

const validate = Yup.object({
  dailyQuantity: Yup.number().required("Required").min(1, "Must be at least 1"),
  ticketOnWeaklyTarget: Yup.number().required("Required").min(0, "Cannot be negative"),
  quantityAboveTheWeekTarget: Yup.number().required("Required").min(0, "Cannot be negative"),
  giveTicket: Yup.number().required("Required").min(0, "Cannot be negative"),
});

const SetTargetManagement = () => {
  const navigate = useNavigate();
  const { fetchTargetDetails, setTarget, loading, targetDetails } = useTargetManagement();

  useEffect(() => {
    fetchTargetDetails();
  }, []);

  console.log("targetDetails", targetDetails);

  return (
    <>
      <BreadCrumb
        linkText={[
          { text: "Target Management", href: "/target-management" },
          { text: "Set Target" },
        ]}
      />

      <PagePath2 title="Set Target" />
      {/* Formik Start */}
      <Formik
        enableReinitialize={true}
        initialValues={{
          dailyQuantity: targetDetails?.dailyQuantity || "",
          ticketOnWeaklyTarget: targetDetails?.giveTicketOnWeeklyTarget || "",
          quantityAboveTheWeekTarget: targetDetails?.quantityAboveTheWeekTarget || "",
          giveTicket: targetDetails?.giveTicketOnExtraQuantity || "",
        }}
        validationSchema={validate}
        onSubmit={async (values) => {
          const weeklyQuantity = Number(values.dailyQuantity) * 7;
          const payload = {
            dailyQuantity: Number(values.dailyQuantity),
            weeklyQuantity: weeklyQuantity,
            giveTicketOnWeeklyTarget: Number(values.ticketOnWeaklyTarget),
            quantityAboveTheWeekTarget: Number(values.quantityAboveTheWeekTarget),
            giveTicketOnExtraQuantity: Number(values.giveTicket),
          };
          const res = await setTarget(payload);
          navigate("/target-management");
        }}
      >
        {({ values }) => (
          <div className="bg-white rounded-2xl shadow-md p-6 mt-4 mb-2">
            {loading ? (<div className="flex justify-center"> <LoaderSpinner /></div>

            ) : (
              <Form>
                <div className="grid grid-cols-1  md:grid-cols-2 gap-6">
                  <FormField
                    label="Daily Quantity"
                    name="dailyQuantity"
                    type="number"
                    min="1"
                    placeholder="Enter daily quantity"
                  />

                  <div className="relative">
                    <div className="flex items-center gap-2 mb-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Weekly Quantity
                      </label>
                      <span className="text-xs text-gray-500">
                        (Auto-calculated: Daily × 7)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={values.dailyQuantity ? values.dailyQuantity * 7 : ''}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100"
                      />
                    </div>
                  </div>

                  <FormField
                    label="Ticket on Weekly Target"
                    name="ticketOnWeaklyTarget"
                    type="number"
                    placeholder="Enter ticket on weekly target"
                  />

                  <FormField
                    label="Quantity Above Weekly Target"
                    name="quantityAboveTheWeekTarget"
                    type="number"
                    placeholder="Enter quantity above target"
                  />

                  <FormField
                    label="Give Ticket"
                    name="giveTicket"
                    type="number"
                    placeholder="Enter ticket count"
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-center gap-8 mt-10">
                  <Button
                    text="Cancel"
                    variant={2}
                    type="button"
                    onClick={() => navigate("/target-management")}
                  />
                  <Button text="Save" variant={1} type="submit" />
                </div>
              </Form>
            )}
          </div>
        )}
      </Formik>
    </>
  );
};

export default SetTargetManagement;
