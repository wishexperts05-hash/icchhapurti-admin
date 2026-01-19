import React, { useEffect } from "react";
import useTestimonials from "../../../../hooks/appManagement/useTestimonials";
import LoaderSpinner from "../../../../components/uiComponent/LoaderSpinner";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import { useNavigate } from "react-router-dom";

const Testimonials = () => {
  const {
    fetchTestimonials,
    testimonials,
    loading,
    deleteTestimonial,
  } = useTestimonials();

  const navigate = useNavigate();

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleDelete = (imageUrl) => {
    deleteTestimonial(imageUrl);
  };

  return (
    <div className="bg-[#F9F9F9] w-full">
      <BreadCrumb
        linkText={[{ text: "App Management" }, { text: "Testimonials" }]}
      />

      <PagePath2
        title="Testimonials"
        showAddButton
        addButtonText="Create Testimonial"
        onClick={() =>
          navigate("/app-management/testimonials/create-testimonial")
        }
      />

      <div className="bg-white border shadow rounded-2xl p-6">
        {loading ? (
          <div className="flex justify-center py-20">
            <LoaderSpinner />
          </div>
        ) : testimonials?.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No testimonials found
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {testimonials.map((imageUrl, index) => (
              <div
                key={index}
                className="relative border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
              >
                <button
                  onClick={() => handleDelete(imageUrl)}
                  className="absolute top-2 right-2 text-white px-2 py-1 text-xs rounded hover:bg-red-600"
                >
                  ❌
                </button>

                <img
                  src={imageUrl}
                  alt={`testimonial-${index}`}
                  className="w-full h-40 object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Testimonials;
