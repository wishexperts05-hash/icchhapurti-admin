import React, { useRef, useState, useEffect } from "react";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import Button from "../../../../components/uiComponent/Button";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import FormField from "../../../../components/uiComponent/FormField";
import useAboutUs from "../../../../hooks/appManagement/useAboutUs";

function AboutusEdit() {
  const navigate = useNavigate();
  const { aboutUs, loading, fetchAboutUs, updateAboutUs, deleteAboutUsImage } = useAboutUs();

  // State for new images to upload
  const [heroImages, setHeroImages] = useState([]);
  const [missionImages, setMissionImages] = useState([]);
  const [visionImages, setVisionImages] = useState([]);
  const [teamImages, setTeamImages] = useState([null, null, null]);

  // Fetch about us data on component mount
  useEffect(() => {
    fetchAboutUs();
  }, []);

  // Validation schema
  const validationSchema = Yup.object({
    heroTitle: Yup.string().required("Title is required"),
    heroDescription: Yup.string().required("Description is required"),
    sellingProducts: Yup.string().required("Selling products is required"),
    satisfiedCustomer: Yup.string().required("Satisfied customer is required"),
    worldwideHonors: Yup.string().required("Worldwide honors is required"),
    missionDescription: Yup.string().required("Mission description is required"),
    visionDescription: Yup.string().required("Vision description is required"),
    team1Name: Yup.string().required("Team member 1 name is required"),
    team1Role: Yup.string().required("Team member 1 role is required"),
    team1Description: Yup.string().required("Team member 1 description is required"),
    team2Name: Yup.string().required("Team member 2 name is required"),
    team2Role: Yup.string().required("Team member 2 role is required"),
    team2Description: Yup.string().required("Team member 2 description is required"),
    team3Name: Yup.string().required("Team member 3 name is required"),
    team3Role: Yup.string().required("Team member 3 role is required"),
    team3Description: Yup.string().required("Team member 3 description is required"),
  });

  // Initial values from API data
  const initialValues = {
    heroTitle: aboutUs?.heroSection?.title || "",
    heroDescription: aboutUs?.heroSection?.description || "",
    sellingProducts: aboutUs?.statistics?.sellingProducts || "",
    satisfiedCustomer: aboutUs?.statistics?.satisfiedCustomer || "",
    worldwideHonors: aboutUs?.statistics?.worldwideHonors || "",
    showCustomerRatings: aboutUs?.showCustomerRatings ?? true,
    missionDescription: aboutUs?.ourMission?.description || "",
    visionDescription: aboutUs?.ourVision?.description || "",
    team1Name: aboutUs?.ourTeam?.[0]?.name || "",
    team1Role: aboutUs?.ourTeam?.[0]?.role || "",
    team1Description: aboutUs?.ourTeam?.[0]?.description || "",
    team2Name: aboutUs?.ourTeam?.[1]?.name || "",
    team2Role: aboutUs?.ourTeam?.[1]?.role || "",
    team2Description: aboutUs?.ourTeam?.[1]?.description || "",
    team3Name: aboutUs?.ourTeam?.[2]?.name || "",
    team3Role: aboutUs?.ourTeam?.[2]?.role || "",
    team3Description: aboutUs?.ourTeam?.[2]?.description || "",
    customerRating: aboutUs?.showCustomerRatings ?? true,
  };

  // Handle image file selection
  const handleImageChange = (e, setter, index = null) => {
    const files = Array.from(e.target.files);
    if (index !== null) {
      // For single image (team members)
      setter(prev => {
        const newArr = [...prev];
        newArr[index] = files[0];
        return newArr;
      });
    } else {
      // For multiple images (hero, mission, vision)
      setter(prev => [...prev, ...files]);
    }
  };

  // Delete existing image from server
  const handleDeleteExistingImage = async (type, imageId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this image?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });

    if (result.isConfirmed) {
      const res = await deleteAboutUsImage(type, imageId);
      if (res) {
        Swal.fire("Deleted!", "Image has been deleted.", "success");
        // Refresh data after deletion
        await fetchAboutUs();
      }
    }
  };

  // Remove newly selected image before upload
  const handleRemoveNewImage = (setter, index) => {
    setter(prev => {
      if (Array.isArray(prev)) {
        return prev.filter((_, i) => i !== index);
      }
      // For team images array
      const newArr = [...prev];
      newArr[index] = null;
      return newArr;
    });
  };

  // Handle form submission
  const handleSubmit = async (values) => {
    const formData = new FormData();

    // Append hero section data
    formData.append("heroSection[title]", values.heroTitle);
    formData.append("heroSection[description]", values.heroDescription);

    // Append statistics data
    formData.append("statistics[sellingProducts]", values.sellingProducts);
    formData.append("statistics[satisfiedCustomers]", values.satisfiedCustomer);
    formData.append("statistics[worldwideHonors]", values.worldwideHonors);

    // Append customer ratings toggle
    // formData.append("showCustomerRatings", values.showCustomerRatings);
     formData.append("customerRating", values.customerRating);

    // Append mission data
    formData.append("ourMission[description]", values.missionDescription);

    // Append vision data
    formData.append("ourVision[description]", values.visionDescription);

    // Append team members data
    formData.append("ourTeam[0][name]", values.team1Name);
    formData.append("ourTeam[0][role]", values.team1Role);
    formData.append("ourTeam[0][description]", values.team1Description);

    formData.append("ourTeam[1][name]", values.team2Name);
    formData.append("ourTeam[1][role]", values.team2Role);
    formData.append("ourTeam[1][description]", values.team2Description);

    formData.append("ourTeam[2][name]", values.team3Name);
    formData.append("ourTeam[2][role]", values.team3Role);
    formData.append("ourTeam[2][description]", values.team3Description);

   

    // Append new images
    heroImages.forEach((image) => {
      formData.append("heroSection", image);
    });

    missionImages.forEach((image) => {
      formData.append("ourMission", image);
    });

    visionImages.forEach((image) => {
      formData.append("ourVision", image);
    });

    teamImages.forEach((image, index) => {
      if (image) {
        formData.append(`ourTeam${index+1}`, image);
      }
    });

    // Submit form data
    const res = await updateAboutUs(formData);
    if (res) {
      Swal.fire("Saved!", "About Us updated successfully", "success");
      navigate("/app-management/about-us");
    }
  };

  const handleCancel = () => {
    navigate("/app-management/about-us");
  };

  // Show loading spinner while fetching data
  if (loading && !aboutUs) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <>
      <BreadCrumb
        linkText={[
          { text: "App Management" },
          { text: "About Us", href: "/app-management/about-us" },
          { text: "Edit Information" },
        ]}
      />
      <PagePath2 title="Edit About Us" />

      <div className="w-full flex justify-center">
        <div className="bg-white w-full rounded-xl shadow-lg mb-2 p-8">
          <Formik
            initialValues={initialValues}
            // validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({ values, setFieldValue, errors, touched }) => (
              <Form>
                {/* Hero Section */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-4">Hero Section</h2>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input
                      type="text"
                      name="heroTitle"
                      value={values.heroTitle}
                      onChange={(e) => setFieldValue("heroTitle", e.target.value)}
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="Enter title"
                    />
                    {errors.heroTitle && touched.heroTitle && (
                      <div className="text-red-500 text-sm mt-1">{errors.heroTitle}</div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      name="heroDescription"
                      value={values.heroDescription}
                      onChange={(e) => setFieldValue("heroDescription", e.target.value)}
                      rows={4}
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="Enter description"
                    />
                    {errors.heroDescription && touched.heroDescription && (
                      <div className="text-red-500 text-sm mt-1">{errors.heroDescription}</div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Upload Images</label>
                    <div className="flex gap-4 flex-wrap">
                      {/* Existing images */}
                      {aboutUs?.heroSection?.images?.map((img, idx) => (
                        <div key={img._id} className="relative border rounded-lg overflow-hidden">
                          <img 
                            src={img.url} 
                            alt={`Hero ${idx + 1}`} 
                            className="w-40 h-40 object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => handleDeleteExistingImage("heroSection", img._id)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
                          >
                            ×
                          </button>
                        </div>
                      ))}

                      {/* New images to upload */}
                      {heroImages.map((img, idx) => (
                        <div key={`new-${idx}`} className="relative border rounded-lg overflow-hidden">
                          <img 
                            src={URL.createObjectURL(img)} 
                            alt={`New ${idx + 1}`} 
                            className="w-40 h-40 object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveNewImage(setHeroImages, idx)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
                          >
                            ×
                          </button>
                        </div>
                      ))}

                      {/* Upload button */}
                      <label className="border-2 border-dashed rounded-lg p-4 w-40 h-40 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
                        <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
                        </svg>
                        <span className="text-sm text-blue-500 mt-2">Choose files</span>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={(e) => handleImageChange(e, setHeroImages)}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Statistics */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-4">Statistics</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Selling Products</label>
                      <input
                        type="text"
                        name="sellingProducts"
                        value={values.sellingProducts}
                        onChange={(e) => setFieldValue("sellingProducts", e.target.value)}
                        className="w-full border rounded-lg px-3 py-2"
                        placeholder="50K+"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Satisfied Customer</label>
                      <input
                        type="text"
                        name="satisfiedCustomer"
                        value={values.satisfiedCustomer}
                        onChange={(e) => setFieldValue("satisfiedCustomer", e.target.value)}
                        className="w-full border rounded-lg px-3 py-2"
                        placeholder="15K+"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Worldwide Honors</label>
                      <input
                        type="text"
                        name="worldwideHonors"
                        value={values.worldwideHonors}
                        onChange={(e) => setFieldValue("worldwideHonors", e.target.value)}
                        className="w-full border rounded-lg px-3 py-2"
                        placeholder="10+"
                      />
                    </div>
                  </div>
                </div>

                {/* Customer Ratings Toggle */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-4">Customer Ratings</h2>
                  
                  <div className="flex items-center justify-between border rounded-lg p-4">
                    <span className="font-medium">Show Customer Ratings</span>
          <label className="relative inline-flex items-center cursor-pointer">
  <input
    type="checkbox"
    checked={values.customerRating}
    onChange={(e) => setFieldValue("customerRating", e.target.checked)}
    className="sr-only peer"
  />
  <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-500"></div>
</label>

                  </div>
                </div>

                {/* Our Mission */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-4">Our Mission</h2>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      name="missionDescription"
                      value={values.missionDescription}
                      onChange={(e) => setFieldValue("missionDescription", e.target.value)}
                      rows={4}
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="Enter mission description"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Upload Images</label>
                    <div className="flex gap-4 flex-wrap">
                      {aboutUs?.ourMission?.images?.map((img) => (
                        <div key={img._id} className="relative border rounded-lg overflow-hidden">
                          <img src={img.url} alt="Mission" className="w-40 h-40 object-cover" />
                          <button
                            type="button"
                            onClick={() => handleDeleteExistingImage("ourMission", img._id)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
                          >
                            ×
                          </button>
                        </div>
                      ))}

                      {missionImages.map((img, idx) => (
                        <div key={`new-${idx}`} className="relative border rounded-lg overflow-hidden">
                          <img src={URL.createObjectURL(img)} alt={`New ${idx + 1}`} className="w-40 h-40 object-cover" />
                          <button
                            type="button"
                            onClick={() => handleRemoveNewImage(setMissionImages, idx)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
                          >
                            ×
                          </button>
                        </div>
                      ))}

                      <label className="border-2 border-dashed rounded-lg p-4 w-40 h-40 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
                        <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
                        </svg>
                        <span className="text-sm text-blue-500 mt-2">Choose files</span>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={(e) => handleImageChange(e, setMissionImages)}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Our Vision */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-4">Our Vision</h2>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      name="visionDescription"
                      value={values.visionDescription}
                      onChange={(e) => setFieldValue("visionDescription", e.target.value)}
                      rows={4}
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="Enter vision description"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Upload Images</label>
                    <div className="flex gap-4 flex-wrap">
                      {aboutUs?.ourVision?.images?.map((img) => (
                        <div key={img._id} className="relative border rounded-lg overflow-hidden">
                          <img src={img.url} alt="Vision" className="w-40 h-40 object-cover" />
                          <button
                            type="button"
                            onClick={() => handleDeleteExistingImage("ourVision", img._id)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
                          >
                            ×
                          </button>
                        </div>
                      ))}

                      {visionImages.map((img, idx) => (
                        <div key={`new-${idx}`} className="relative border rounded-lg overflow-hidden">
                          <img src={URL.createObjectURL(img)} alt={`New ${idx + 1}`} className="w-40 h-40 object-cover" />
                          <button
                            type="button"
                            onClick={() => handleRemoveNewImage(setVisionImages, idx)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
                          >
                            ×
                          </button>
                        </div>
                      ))}

                      <label className="border-2 border-dashed rounded-lg p-4 w-40 h-40 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
                        <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
                        </svg>
                        <span className="text-sm text-blue-500 mt-2">Choose files</span>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={(e) => handleImageChange(e, setVisionImages)}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Our Team */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-4">Our Team</h2>
                  
                  {[1, 2, 3].map((num, teamIdx) => (
                    <div key={num} className="border-t pt-6 mt-6">
                      <h3 className="text-lg font-semibold mb-4">Team Member {num}</h3>
                      
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Upload Image</label>
                        <div className="flex gap-4">
                          {/* Existing team member image */}
                          {aboutUs?.ourTeam?.[teamIdx]?.image && !teamImages[teamIdx] && (
                            <div className="relative border rounded-lg overflow-hidden">
                              <img 
                                src={aboutUs.ourTeam[teamIdx].image.url} 
                                alt={`Team ${num}`} 
                                className="w-32 h-32 object-cover rounded-full" 
                              />
                              <button
                                type="button"
                                onClick={() => handleDeleteExistingImage(`ourTeam${num}`, aboutUs.ourTeam[teamIdx].image._id)}
                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
                              >
                                ×
                              </button>
                            </div>
                          )}

                          {/* New team member image */}
                          {teamImages[teamIdx] && (
                            <div className="relative border rounded-lg overflow-hidden">
                              <img 
                                src={URL.createObjectURL(teamImages[teamIdx])} 
                                alt="New" 
                                className="w-32 h-32 object-cover rounded-full" 
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveNewImage(setTeamImages, teamIdx)}
                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
                              >
                                ×
                              </button>
                            </div>
                          )}

                          {/* Upload button for team member */}
                          {!teamImages[teamIdx] && !aboutUs?.ourTeam?.[teamIdx]?.image && (
                            <label className="border-2 border-dashed rounded-lg p-4 w-32 h-32 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
                              <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
                              </svg>
                              <span className="text-sm text-blue-500 mt-2">Choose file</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageChange(e, setTeamImages, teamIdx)}
                                className="hidden"
                              />
                            </label>
                          )}
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Name</label>
                        <input
                          type="text"
                          name={`team${num}Name`}
                          value={values[`team${num}Name`]}
                          onChange={(e) => setFieldValue(`team${num}Name`, e.target.value)}
                          className="w-full border rounded-lg px-3 py-2"
                          placeholder="Enter name"
                        />
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Role</label>
                        <input
                          type="text"
                          name={`team${num}Role`}
                          value={values[`team${num}Role`]}
                          onChange={(e) => setFieldValue(`team${num}Role`, e.target.value)}
                          className="w-full border rounded-lg px-3 py-2"
                          placeholder="Enter role"
                        />
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Description</label>
                        <textarea
                          name={`team${num}Description`}
                          value={values[`team${num}Description`]}
                          onChange={(e) => setFieldValue(`team${num}Description`, e.target.value)}
                          rows={3}
                          className="w-full border rounded-lg px-3 py-2"
                          placeholder="Enter description"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center mt-10 gap-8">
                  <Button
                    text="Cancel"
                    variant={2}
                    onClick={handleCancel}
                    type="button"
                  />

                  <Button
                    text="Save"
                    variant={1}
                    type="submit"
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}

export default AboutusEdit;