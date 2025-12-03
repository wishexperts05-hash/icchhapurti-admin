import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../components/uiComponent/PagePath2";
import Button from "../../../components/uiComponent/Button";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormField from "../../../components/uiComponent/FormField";

const SetTargetManagement = () => {
  const navigate = useNavigate();
  //  Yup Validation Schema
  const validate = Yup.object({
    dailyQuantity: Yup.number().required("Required"),
    weaklyQuantity: Yup.number().required("Required"),
    ticketOnWeaklyTarget: Yup.number().required("Required"),
    ticketAboveWeaklyTarget: Yup.number().required("Required"),
    giveTicket: Yup.number().required("Required"),
  });

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
        initialValues={{
          dailyQuantity: "",
          weaklyQuantity: "",
          ticketOnWeaklyTarget: "",
          ticketAboveWeaklyTarget: "",
          giveTicket: "",
        }}
        validationSchema={validate}
        onSubmit={(values) => {
          console.log("Saved:", values);
          alert("Target added successfully!");
          navigate("/target-management");
        }}
      >
        {() => (
             <div className="bg-white rounded-lg shadow-md p-6 mt-4 mb-2">
          <Form >
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
          </div>
        )}
      </Formik>
    </>
  );
};

export default SetTargetManagement;
