import React, { useRef } from "react";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import Button from "../../../../components/uiComponent/Button";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import FormField from "../../../../components/uiComponent/FormField";
import JoditEditor from "jodit-pro-react";

function AboutusEdit() {
  const navigate = useNavigate();
  const editor = useRef(null);
  const validate = Yup.object({
    editAboutUs: Yup.string()
  })
  const handleSave = () => {
    Swal.fire("Saved", "", "Saved Sucessfully")
  }
  const handleCancel = () => {
    navigate("/app-management/aboutus")
  }
  return (
    <>
      <BreadCrumb
        linkText={[
          { text: "App Management" },
          { text: "About Us", href: "/app-management/aboutus" },
          { text: "Edit Information " },
        ]}
      />
      <PagePath2
        title=" Edit About Us"
      />
      <div className="w-full flex justify-center">
  <div className="bg-white w-full  rounded-xl shadow-lg mb-2 p-8">


    <div className="border rounded-lg overflow-hidden shadow-sm">
      <JoditEditor
  ref={editor}
  
  onChange={(content) => setFieldValue("editAboutUs", content)}
  config={{
    height: 300,
    toolbarAdaptive: false,
    readonly: false,
    placeholder: "Start typing your content...",

    buttons: [
      "bold",
      "italic",
      "underline",
      "|",
      "ul",
      "ol",
      "|",
      "fontsize",
      "font",
      "brush",          // text color & background
      "|",
      "left",
      "center",
      "right",
      "justify",
      "|",
      "undo",
      "redo",
      "|",
      "link",
      "table",
      "symbol",
      "fullsize"
    ],

    // Optional: cleaner look
    removeButtons: [
      "copyformat",
      "cut",
      "hr",
      "paragraph",
      "eraser",
      "video",
      "image",
      "file",
      "preview",
      "source",
      "indent",
      "outdent"
    ]
  }}
/>

    </div>

    {/* Buttons */}
    <div className="flex justify-center mt-10 gap-8">
      <Button
        text="Cancel"
        variant={2}
        onClick={handleCancel}
      />

      <Button
        text="Save"
        variant={1}
        onClick={handleSave}
      />
    </div>

  </div>
</div>


    </>
  );
}

export default AboutusEdit;
