import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../components/uiComponent/PagePath2";
import { FaTimes, FaPlus } from "react-icons/fa";
import Button from "../../../components/uiComponent/Button";
import returnIcon from "../../../assets/returnProduct.png";
import { useNavigate } from "react-router-dom";
import Added from '../../../assets/Added.png';
const AddProduct = () => {
  const [productImages, setProductImages] = useState([]);
  const [easyReturn, setEasyReturn] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();


   const addProduct = () => {
    // setShowConfirmModal(false);
    // simulate delete success
    setTimeout(() => {
      setShowSuccessModal(true);
      navigate("/product-management");
      setTimeout(() => setShowSuccessModal(false), 2000);
    }, 500);
  };

  // ✅ Formik setup
  const formik = useFormik({
    initialValues: {
      category: "",
      name: "",
      price: "",
      description: "",
      returnDays: "",
    },
    validationSchema: Yup.object({
      category: Yup.string().required("Category is required"),
      name: Yup.string().required("Product name is required"),
      price: Yup.number()
        .typeError("Price must be a number")
        .positive("Price must be positive")
        .required("Price is required"),
      description: Yup.string().required("Description is required"),
      returnDays: Yup.number()
        .min(0, "Must be 0 or greater")
        .required("Return days are required"),
    }),
    onSubmit: (values) => {
      const productData = {
        ...values,
        easyReturn,
        visible,
        productImages,
      };
      console.log("✅ Submitted Product Data:", productData);
      // You can call your API here
    },
  });

  // ✅ Image upload logic
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setProductImages((prev) => [...prev, ...imageUrls]);
  };

  // ✅ Remove image logic
  const handleRemoveImage = (index) => {
    setProductImages((prev) => prev.filter((_, i) => i !== index));
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
            <label className="block text-gray-700 font-medium mb-2">Price:</label>
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
        <div className="mt-4">
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
        </div>

        {/* Product Images */}
        <div className="mt-4">
          <label className="block text-gray-700 font-medium mb-2">
            Product Image (Min 3):
          </label>
          <div className="flex flex-wrap gap-4">
            {productImages.map((image, index) => (
              <div key={index} className="relative w-24 h-24 border rounded-lg overflow-hidden">
                <img
                  src={image}
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
        <div className="mt-4">
          <label className="block text-gray-700 font-medium mb-2">
            Enter Return Days:
          </label>
          <input
            name="returnDays"
            type="number"
            min="0"
            placeholder="2"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.returnDays}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
          {formik.touched.returnDays && formik.errors.returnDays && (
            <p className="text-red-500 text-sm">{formik.errors.returnDays}</p>
          )}
        </div>

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
          <Button variant={1} text="Add" type="submit" onClick={addProduct} />
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
                  <div className= "flex justify-center text-green-500 text-6xl mb-2">
                    <img src={Added} alt="TrashBin" />
                  </div>
                  <p className="font-semibold text-lg">Product Deleted Successfully</p>
                {/* </motion.div> */}
                </div>
              </div>
            )}
    </div>
  );
};

export default AddProduct;
