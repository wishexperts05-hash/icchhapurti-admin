import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormField from "../../../components/uiComponent/FormField";
import Button from "../../../components/uiComponent/Button";
import { useNavigate, useParams } from "react-router-dom";
import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../components/uiComponent/PagePath2";
import useCountryManagement from "../../../hooks/countryManagement/useCountryManagement";
import LoaderSpinner from "../../../components/uiComponent/LoaderSpinner";




const CountryManagementEdit = () => {
    const navigate = useNavigate();
    const{id} = useParams();
    // console.log(id)
    const [easyReturn ] = useState(true);
      const [visible] = useState(true);

    const {updateCountry, fetchCountryDetailById, countryDetail, loading,countryDropdown,dropdown} = useCountryManagement();

   

    useEffect(()=>{
        fetchCountryDetailById(id);
        countryDropdown(); 

    },[id]);

    const dropdownOptions = dropdown?.map((item) => ({
  value: item.name,
  label: item.name,
})) || [];

// console.log("fropdown",dropdownOptions)


    // console.log("country ",countryDetail?.country?.name);

    // const formik = useFormik({
    //     enableReinitialize :true,
    //     initialValues:{
    //         name: countryDetail?.country?.name || "",
    //         defaultLanguage: countryDetail?.country?.defaultLanguage || "",
    //         defaultCurrency: countryDetail?.country?.defaultCurrency || "",
    //     },

    //     validationSchema :Yup.object({
    //         name: Yup.string().required("Country is required"),
    //         defaultLanguage: Yup.string().required("Default language is required"),
    //         defaultCurrency: Yup.string().required("Default Currency is required"),
    //     }),

    //     onSubmit: async (values) => {
    //         const rawJson = JSON.stringify(values);
    //         console.log(rawJson);

    //         Object.keys(values).forEach((key) => {
    //             rawJson.append(key, values[key]);
    //         });

    //         rawJson.append("easyReturn", easyReturn);
    //         rawJson.append("visible", visible);

    //         await updateCountry(id, rawJson);

    //     }

    // });



    




   




    // // Simple initial values without any ID dependency
    // const initialValues = {
    //     countryName: "",
    //     countryCode: "",
    //     currency: "",
    //     currencySymbol: "",
    //     phoneCode: "",
    //     region: "",
    //     timezone: "",
    //     capital: "",
    //     status: "",
    // };

    // const handleSubmit = (values, { resetForm }) => {
    //     console.log("Country Updated:", values);
    //     alert("Country updated successfully!");
    //     resetForm();
    //     navigate("/country-management");
    // };

    const handleCancel = () => {
        navigate("/country-management");
    };

    return (
        <div className="">
            <BreadCrumb
                linkText={[
                    { text: "Country Management", href: "/country-management" },
                    { text: "Edit Country" },
                ]}
            />
            <PagePath2 title="Edit Country" />

             {loading ? (
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
    defaultLanguage: Yup.string().required("Default language is required"),
    defaultCurrency: Yup.string().required("Default Currency is required"),
  })}
  onSubmit={async (values) => {
    const body = {
      ...values,
      easyReturn,
      visible,
    };

    await updateCountry(id, body);
  }}
>
  {({ values }) => (
    <Form className="bg-white rounded-lg shadow-md p-6 mt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

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
          placeholder="Enter Default Language"
        />

        <FormField
          label="Default Currency"
          name="defaultCurrency"
          placeholder="Enter Default Currency (e.g., USD, INR)"
        />

        <hr className="col-span-2 mt-4" />

        <div className="col-span-2 flex justify-center gap-4 mt-4">
          <Button text="Cancel" variant={2} type="button" onClick={handleCancel} />
          <Button text="Edit" type="submit" variant={1} />
        </div>

      </div>
    </Form>
  )}
</Formik>

            </div>
      )}
        </div>
    );
};

export default CountryManagementEdit;