import React, { useState } from "react";
import { useFormik } from "formik";
import JoditEditor from "jodit-pro-react";
import { useRef } from "react";
import * as Yup from "yup";
import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../components/uiComponent/PagePath2";
import { FaTimes, FaPlus } from "react-icons/fa";
import Button from "../../../components/uiComponent/Button";
import returnIcon from "../../../assets/returnProduct.png";
import { useNavigate } from "react-router-dom";
import Added from "../../../assets/Added.png";
import useProductManagement from "../../../hooks/productList/useProductManagment";
const AddProduct = () => {
  const [productImages, setProductImages] = useState([]);
  const [productVideos, setProductVideos] = useState([]);
  const [easyReturn, setEasyReturn] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [visible, setVisible] = useState(true);
  const { addProduct } = useProductManagement();
  const navigate = useNavigate();
  const editorRefs = useRef([]);
  const [isAdding, setIsAdding] = useState(false);

  const editorConfig = {
    readonly: false,
    placeholder: "Write product details...",
    minHeight: 200,
    buttons: [
      "bold",
      "italic",
      "underline",
      "|",
      "ul",
      "ol",
      "|",
      "font",
      "fontsize",
      "|",
      "align",
      "undo",
      "redo",
      "|",
      "link",
      "table",
      "hr",
      "fullsize",
    ],
    removeButtons: ["file", "video", "ai-assistant"],
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
    toolbarAdaptive: false,
  };

  //  Formik setup
  const formik = useFormik({
    initialValues: {
      category: "",
      name: "",
      price: "",
      // description: "",

      descriptions: [
        {
          title: "",
          content: "",
        },
      ],
      returnable: "",
    },
    validationSchema: Yup.object({
      category: Yup.string().required("Category is required"),
      name: Yup.string().required("Product name is required"),
      price: Yup.number()
        .typeError("Price must be a number")
        .positive("Price must be positive")
        .required("Price is required"),
      // description: Yup.string().required("Description is required"),
      returnable: Yup.string()
        // .min(0, "Must be 0 or greater")
        .required("Return days are required"),
    }),
    onSubmit: async (values) => {
      setIsAdding(true); // Start loading
      const formData = new FormData();

      formData.append("category", values.category);
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("returnableDays", values.returnable);

      // formData.append(
      //   "description",
      //   JSON.stringify(values.descriptions)
      // );

      formData.append("productDetails", JSON.stringify(values.descriptions));

      formData.append("returnable", easyReturn);
      formData.append("visible", visible);

      productImages.forEach((img) => {
        formData.append("images", img);
      });

      // Append videos to form data
      productVideos.forEach((video) => {
        formData.append("videos", video);
      });

      try {
        await addProduct(formData);
        // setShowSuccessModal(true);
      } catch (error) {
        console.error("Error adding product:", error);
      } finally {
        setIsAdding(false); // Stop loading
      }

      console.log("FormData sent:", formData);
    },
  });

  //  Image upload logic
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setProductImages((prev) => [...prev, ...files]);
  };

  // Video upload logic
  const handleVideoUpload = (e) => {
    const files = Array.from(e.target.files);
    setProductVideos((prev) => [...prev, ...files]);
  };

  // Remove video logic
  const handleRemoveVideo = (index) => {
    setProductVideos((prev) => prev.filter((_, i) => i !== index));
  };

  //  Remove image logic
  const handleRemoveImage = (index) => {
    setProductImages((prev) => prev.filter((_, i) => i !== index));
  };

  const addDescription = () => {
    formik.setFieldValue("descriptions", [
      ...formik.values.descriptions,
      { title: "", content: "" },
    ]);
  };

  const removeDescription = (index) => {
    const updated = [...formik.values.descriptions];
    updated.splice(index, 1);
    formik.setFieldValue("descriptions", updated);
  };

  return (
    <div>
      <BreadCrumb
        linkText={[
          { text: "Product Management", href: "/product-management" },
          { text: "Add Product" },
        ]}
      />
      <PagePath2 title="Add Product" />

      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md mt-4"
      >
        {/* Product Category & Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Product Category:
            </label>
            <input
              name="category"
              type="text"
              placeholder="e.g. Pen"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.category}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
            {formik.touched.category && formik.errors.category && (
              <p className="text-red-500 text-sm">{formik.errors.category}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Product Name:
            </label>
            <input
              name="name"
              type="text"
              placeholder="e.g. Pelikan"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-sm">{formik.errors.name}</p>
            )}
          </div>
        </div>

        {/* Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Price:
            </label>
            <input
              name="price"
              type="text"
              placeholder="₹ 10"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.price}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
            {formik.touched.price && formik.errors.price && (
              <p className="text-red-500 text-sm">{formik.errors.price}</p>
            )}
          </div>
        </div>

        {/* Description */}
        {/* <div className="mt-4">
          <label className="block text-gray-700 font-medium mb-2">
            Description:
          </label>
          <textarea
            name="description"
            rows="3"
            placeholder="Write a short product description..."
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
          {formik.touched.description && formik.errors.description && (
            <p className="text-red-500 text-sm">{formik.errors.description}</p>
          )}
        </div> */}

        {/* Product Images */}
        <div className="mt-4">
          <label className="block text-gray-700 font-medium mb-2">
            Product Image (Min 3):
          </label>
          <div className="flex flex-wrap gap-4">
            {productImages.map((image, index) => (
              <div
                key={index}
                className="relative w-24 h-24 border rounded-lg overflow-hidden"
              >
                <img
                  src={URL.createObjectURL(image)}
                  alt={`product-${index}`}
                  className="object-cover w-full h-full"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
                >
                  <FaTimes />
                </button>
              </div>
            ))}

            <label
              htmlFor="upload"
              className="w-24 h-24 flex items-center justify-center border border-dashed border-gray-400 rounded-lg cursor-pointer hover:bg-gray-100"
            >
              <FaPlus className="text-gray-500" />
              <input
                id="upload"
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>
        </div>

        {/* Product Videos */}
        <div className="mt-4">
          <label className="block text-gray-700 font-medium mb-2">
            Product Videos:
          </label>
          <div className="flex flex-wrap gap-4">
            {productVideos.map((video, index) => (
              <div
                key={index}
                className="relative w-24 h-24 border rounded-lg overflow-hidden"
              >
                <video
                  src={URL.createObjectURL(video)}
                  controls
                  className="object-cover w-full h-full"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveVideo(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
                >
                  <FaTimes />
                </button>
              </div>
            ))}
            <label
              htmlFor="upload-video"
              className="w-24 h-24 flex items-center justify-center border border-dashed border-gray-400 rounded-lg cursor-pointer hover:bg-gray-100"
            >
              <FaPlus className="text-gray-500" />
              <input
                id="upload-video"
                type="file"
                accept="video/*"
                multiple
                className="hidden"
                onChange={handleVideoUpload}
              />
            </label>
          </div>
        </div>

        {/* Product Descriptions */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-gray-700 font-medium">
              Product Details
            </label>
            <button
              type="button"
              onClick={addDescription}
              className="flex items-center gap-1 text-orange-600 font-medium"
            >
              <FaPlus /> Add Details
            </button>
          </div>

          {formik.values.descriptions.map((desc, index) => (
            <div key={index} className="border rounded-lg p-4 mb-3 relative">
              {/* Remove */}
              {formik.values.descriptions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeDescription(index)}
                  className="absolute top-2 right-2 text-red-500"
                >
                  <FaTimes />
                </button>
              )}

              {/* Title */}
              <input
                type="text"
                placeholder="Title (e.g. Material, Usage, Care)"
                value={desc.title}
                onChange={(e) =>
                  formik.setFieldValue(
                    `descriptions[${index}].title`,
                    e.target.value
                  )
                }
                className="w-full border rounded-md p-2 mb-2"
              />

              {/* Description */}
              <div className="border rounded-lg overflow-hidden">
                <JoditEditor
                  ref={(el) => (editorRefs.current[index] = el)}
                  value={desc.content}
                  config={editorConfig}
                  tabIndex={1}
                  onBlur={(newContent) =>
                    formik.setFieldValue(
                      `descriptions[${index}].content`,
                      newContent
                    )
                  }
                  onChange={() => {}}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Easy Return Toggle */}
        <div className="flex items-center gap-2 mt-6">
          <img src={returnIcon} alt="" className="w-6 h-6 text-yellow-600" />
          <span className="text-gray-700 font-medium">Easy Return</span>
          <label className="relative inline-flex items-center cursor-pointer ml-2">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={easyReturn}
              onChange={() => setEasyReturn(!easyReturn)}
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-500 rounded-full peer peer-checked:bg-green-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
          </label>
        </div>

        {/* Return Days */}
        {easyReturn && (
          <div className="mt-4">
            <label className="block text-gray-700 font-medium mb-2">
              Enter Return Days:
            </label>
            <input
              name="returnable"
              type="text"
              min="0"
              placeholder="2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.returnable}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
            {formik.touched.returnable && formik.errors.returnable && (
              <p className="text-red-500 text-sm">{formik.errors.returnable}</p>
            )}
          </div>
        )}

        {/* Product Visibility Toggle */}
        <div className="flex items-center gap-2 mt-6">
          <img src={returnIcon} alt="" className="w-6 h-6 text-yellow-600" />
          <span className="text-gray-700 font-medium">Product Visibility</span>
          <label className="relative inline-flex items-center cursor-pointer ml-2">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={visible}
              onChange={() => setVisible(!visible)}
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-500 rounded-full peer peer-checked:bg-green-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
          </label>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <Button
            variant={2}
            text="Cancel"
            onClick={() => navigate("/product-management")}
          />
          <Button
            variant={1}
            text={isAdding ? "Adding..." : "Add"}
            disabled={isAdding}
            type="submit"
          />
        </div>
      </form>

      {/* 🔸 Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-70 flex items-center justify-center z-50">
          {/* <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-white p-6 rounded-xl shadow-md text-center w-80"
                > */}
          <div className="bg-white p-6 rounded-xl shadow-md text-center w-80">
            <div className="flex justify-center text-green-500 text-6xl mb-2">
              <img src={Added} alt="TrashBin" />
            </div>
            <p className="font-semibold text-lg">Product Added Successfully</p>
            {/* </motion.div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
