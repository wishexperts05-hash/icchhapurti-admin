import React, { useState } from "react";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import LoaderSpinner from "../../../../components/uiComponent/LoaderSpinner";
import useTestimonials from "../../../../hooks/appManagement/useTestimonials";

const CreateTestimonial = () => {
  const { createTestimonial, loading } = useTestimonials();
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (images.length === 0) {
      alert("Please select at least one image");
      return;
    }

    // ✅ Create FormData here
    const formData = new FormData();
    images.forEach((file) => {
      formData.append("images", file);
    });

    createTestimonial(formData);
  };

  return (
    <div className="bg-[#F9F9F9] w-full">
      <BreadCrumb
        linkText={[
          { text: "App Management" },
          { text: "Testimonials",href:"/app-management/testimonials" },
          { text: "Create Testimonial" },
        ]}
      />

      <PagePath2 title="Create Testimonial" />

      <div className="bg-white border shadow rounded-2xl p-6 mt-4 w-full">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Upload Images
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* Preview */}
          {images.length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              {images.map((file, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="h-24 w-full object-cover rounded"
                />
              ))}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600"
          >
            {loading ? <LoaderSpinner size="sm" /> : "Create Testimonial"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTestimonial;
