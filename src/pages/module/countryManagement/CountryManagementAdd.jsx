import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormField from "../../../components/uiComponent/FormField";
import Button from "../../../components/uiComponent/Button";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../components/uiComponent/PagePath2";
import useCountryManagement from "../../../hooks/countryManagement/useCountryManagement";
import LoaderSpinner from "../../../components/uiComponent/LoaderSpinner";
import { BeatLoader } from "react-spinners";

const CountryManagementAdd = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [pageLoading, setPageLoading] = useState(true);
    const [localLoading, setLocalLoading] = useState(false);


  const path = location.pathname.toLowerCase().replace(/\/+$/, ""); // trim trailing slashes
  const isEditMode = path.split("/").includes("edit-country");

  console.log(isEditMode);

  const {
    updateCountry,
    fetchCountryDetailById,
    addCountry,
    countryDetail,
    LoaderSpinner,
    countryDropdown,
    dropdown,
    getCountryByName
    
  } = useCountryManagement();

  const [easyReturn] = useState(true);
  const [visible] = useState(true);

  useEffect(() => {
  const loadData = async () => {
    setPageLoading(true);

    await countryDropdown();      // DROPDOWN MUST LOAD FIRST

    if (isEditMode && id) {
      await fetchCountryDetailById(id);
    }

    setPageLoading(false);
  };

  loadData();
}, [id, isEditMode]);



  const dropdownOptions =
    dropdown?.map((item) => ({
      value: item.name,
      label: item.name,
    })) || [];

  const handleCancel = () => navigate("/country-management");

  return (
    <div className="bg-gray-50 ">
      <BreadCrumb
        linkText={[
          { text: "Country Management", href: "/country-management" },
          { text: isEditMode ? "Edit Country" : "Add Country" },
        ]}
      />

      <PagePath2
        title={isEditMode ? "Edit Country" : "Add Country"}
        description="Manage country information below."
      />

      {pageLoading  ? (
        <div className="w-full flex items-center justify-center">
          <LoaderSpinner />
        </div>
      ) : (
        <div className="bg-white p-4 mb-4 border-b rounded-xl shadow-md">
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
            {({ values,setFieldValue  }) => {

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
           return(
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
            )}}
          </Formik>
        </div>
      )}
    </div>
  );
};

export default CountryManagementAdd;
