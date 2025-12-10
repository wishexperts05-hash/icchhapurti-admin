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

const SetTargetManagement = () => {
  const navigate = useNavigate();
  //  Yup Validation Schema
  const validate = Yup.object({
    dailyQuantity: Yup.number().required("Required"),
    weaklyQuantity: Yup.number()
      .required("Required")
      .test(
        "match-daily-x7",
        "Weekly quantity must be 7 times the daily quantity",
        function (value) {
          const { dailyQuantity } = this.parent;
          return value === dailyQuantity * 7;
        }
      ),
    ticketOnWeaklyTarget: Yup.number().required("Required"),
    ticketAboveWeaklyTarget: Yup.number().required("Required"),
    giveTicket: Yup.number().required("Required"),
  });

  const { getAllStaffTargets, allStaffTarget, saveGlobalTarget,loading } =
    useTargetManagement();

  useEffect(() => {
    getAllStaffTargets();
  }, []);

  console.log("bcc", allStaffTarget);

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
          dailyQuantity: allStaffTarget?.dailyQuantity || "",
          weaklyQuantity: allStaffTarget?.weeklyQuantity || "",
          ticketOnWeaklyTarget: allStaffTarget?.giveTicketOnWeeklyTarget,
          ticketAboveWeaklyTarget: allStaffTarget?.quantityAboveTheWeekTartget,
          giveTicket: allStaffTarget?.giveTicketOnExtraQuantity,
        }}
        validationSchema={validate}
        onSubmit={async (values) => {
          const payload = {
            dailyQuantity: Number(values.dailyQuantity),
            weeklyQuantity: Number(values.weaklyQuantity),
            giveTicketOnWeeklyTarget: Number(values.ticketOnWeaklyTarget),
            quantityAboveTheWeekTartget: Number(values.ticketAboveWeaklyTarget),
            giveTicketOnExtraQuantity: Number(values.giveTicket),
          };

          try {
            const res = await saveGlobalTarget(payload);
            toast(res.message || "Target saved successfully!");
            navigate("/target-management");
          } catch (err) {
            console.log("Error saving target");
          }
        }}
      >
        {() => (
          <div className="bg-white rounded-lg shadow-md p-6 mt-4 mb-2">
            {loading? (<div className="flex justify-center"> <LoaderSpinner/></div>

            ):(
            <Form>
              <div className="grid grid-cols-1  md:grid-cols-2 gap-6">
                <FormField
                  label="Daily Quantity"
                  name="dailyQuantity"
                  type="number"
                  placeholder="Enter daily quantity"
                />

                <FormField
                  label="Weekly Quantity"
                  name="weaklyQuantity"
                  type="number"
                  placeholder="Enter weekly quantity"
                />

                <FormField
                  label="Ticket on Weekly Target"
                  name="ticketOnWeaklyTarget"
                  type="number"
                  placeholder="Enter ticket on weekly target"
                />

                <FormField
                  label="Quantity Above Weekly Target"
                  name="ticketAboveWeaklyTarget"
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
