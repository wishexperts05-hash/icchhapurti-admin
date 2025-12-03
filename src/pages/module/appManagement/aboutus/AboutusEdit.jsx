import React from "react";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";

function AboutusEdit() {
  return (
    <div className="bg-[#F9F9F9] min-h-screen pb-6">
      <BreadCrumb
        linkText={[
          { text: "App Management" },
          { text: "About Us", href: "/app-management/aboutus" },
          { text: "Edit Information " },
        ]}
      />

      <PagePath2
        title="About Us"
        showAddButton
        selectPlaceHolder="Select Category"
      />
    </div>
  );
}

export default AboutusEdit;
