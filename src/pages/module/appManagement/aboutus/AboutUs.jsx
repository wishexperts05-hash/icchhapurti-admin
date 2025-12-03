import React from "react";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";

function AboutUs() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#F9F9F9] min-h-screen pb-6">
      <BreadCrumb
        linkText={[{ text: "App Management" }, { text: "About Us" }]}
      />

      <PagePath2
        title="About Us"
        showAddButton
        addButtonText="Edit Information"
        onClick={() => navigate("/app-management/aboutus/edit")}
        selectPlaceHolder="Select Category"
      />
    </div>
  );
}

export default AboutUs;
