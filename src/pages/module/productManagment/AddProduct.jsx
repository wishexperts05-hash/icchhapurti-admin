import React, { useState } from "react";
import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../components/uiComponent/PagePath2";
import { FaTimes, FaPlus } from "react-icons/fa";
import Button from "../../../components/uiComponent/Button";
import returnIcon from '../../../assets/returnProduct.png';
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [productImages, setProductImages] = useState([]);
  const [easyReturn, setEasyReturn] = useState(true);
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setProductImages((prev) => [...prev, ...imageUrls]);
  };

 
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


      <div className="bg-white p-6 rounded-lg shadow-md mt-4">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Product Category:
            </label>
            <input
              type="text"
              placeholder="e.g. Pen"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Product Name:
            </label>
            <input
              type="text"
              placeholder="e.g. Pelikan"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Price:</label>
            <input
              type="text"
              placeholder="₹ 10"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Description */}
        <div className="mt-4">
          <label className="block text-gray-700 font-medium mb-2">
            Description:
          </label>
          <textarea
            rows="3"
            placeholder="Write a short product description..."
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
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

        {/* Easy Return */}
        <div className="flex items-center gap-2 mt-6">
          <img
            src={returnIcon}
            alt=""
            className="w-6 h-6 text-yellow-600"
          />
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
            type="number"
            min="0"
            placeholder="2"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
        </div>

        {/* Product Visibility */}
        <div className="flex items-center gap-2 mt-6">
          <img
            src={returnIcon}
            alt=""
            className="w-6 h-6 text-yellow-600"
          />
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
            type={Button}
            variant={4}
            text="Cancel"
            onClick={() => navigate("/product-management")}
            // className="px-6 py-2 border border-yellow-600 text-yellow-700 rounded-md hover:bg-yellow-50"
          />
         
        
           <Button
            type={Button}
            variant={3}
            text="Add"
            // className="px-6 py-2 border border-yellow-600 text-yellow-700 rounded-md hover:bg-yellow-50"
          />
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
