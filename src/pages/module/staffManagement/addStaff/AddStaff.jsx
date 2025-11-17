import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormField from "../../../../components/uiComponent/FormField";
import Button from "../../../../components/uiComponent/Button";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";

const validationSchema = Yup.object().shape({
  staffName: Yup.string().required("Staff name is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Invalid phone number")
    .required("Phone number is required"),
  dob: Yup.date().required("Date of birth is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  location: Yup.string().required("Location is required"),
  referralCode: Yup.string().required("Referral code is required"),
});

const AddStaff = () => {
  const navigate = useNavigate();

  const initialValues = {
    staffName: "",
    phoneNumber: "",
    dob: "",
    email: "",
    location: "",
    referralCode: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    console.log("Staff Added:", values);
    alert("Staff added successfully!");
    resetForm();
    navigate("/staff-management");
  };

  const handleCancel = () => {
    navigate("/staff-management");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <BreadCrumb
        linkText={[
          
          { text: "Staff Management", href: "/staff-management" },
          { text: "Add New Staff" },
        ]}
      />

      <PagePath2
        title="Add New Staff"
        description="Fill in the staff details below to add new staff information."
      />

      <div className="bg-white shadow-md rounded-2xl p-6">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormField label="Staff Name" name="staffName" placeholder="Enter staff name" />
              <FormField label="Staff Phone Number" name="phoneNumber" placeholder="Enter phone number" />
              <FormField label="Date of Birth" name="dob" type="date" placeholder="Select date of birth" />
              <FormField label="Email ID" name="email" type="email" placeholder="Enter email address" />
              <FormField label="Staff Location" name="location" placeholder="Enter staff location" />
              <FormField label="Assign Referral Code" name="referralCode" placeholder="Enter referral code" />

              <div className="col-span-1 sm:col-span-2 flex justify-center gap-4 mt-4">
                <Button text="Cancel" variant={2} type="button" onClick={handleCancel} />
                <Button text="Add Staff" type="submit" variant={1} />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddStaff;
