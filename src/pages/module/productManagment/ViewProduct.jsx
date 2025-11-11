import React, { useState } from "react";
import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../components/uiComponent/PagePath2";

const ViewProduct = () => {
  const [visible, setVisible] = useState(true);

  // 🟠 Dummy product data (replace with API data later)
  const product = {
    category: "Pen",
    name: "Uni-ball",
    price: "₹ 10",
    addedOn: "10/05/2010",
    returnPolicy: "Easy Return Within 2 days",
    description:
      "German brand famous for high-quality fountain pens, Offers a wide range from student-grade to luxury writing instruments",
    images: [
      "https://linclimited.com/wp-content/uploads/2023/04/blue-sl-500-2.jpg",
      "https://linclimited.com/wp-content/uploads/2023/04/black-sl-500-3.jpg",
    "https://linclimited.com/wp-content/uploads/2023/04/blue-sl-500-3.jpg",
    ],
  };

  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div>
      {/* 🧭 Breadcrumb */}
      <BreadCrumb
        linkText={[
          { text: "Product Management", href: "/product-management" },
          { text: "View Product" },
        ]}
      />

      {/* 🧩 Header */}
      <PagePath2 title="View Product Details" />

      <div className="bg-white p-6 rounded-lg shadow-md mt-4">
        {/* Image + Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 🖼️ Product Image */}
          <div className="flex flex-col items-center">
            <div className="border rounded-md p-4 w-[280px] h-[280px] flex items-center justify-center relative">
              <img
                src={product.images[currentImage]}
                alt={product.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {/* 🟤 Dots */}
            <div className="flex gap-2 mt-3">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-2.5 h-2.5 rounded-full ${
                    currentImage === index ? "bg-gray-800" : "bg-gray-400"
                  }`}
                ></button>
              ))}
            </div>
          </div>

          {/* 📋 Product Details */}
          <div>
            <h3 className="text-lg font-semibold border-b pb-2 mb-4 flex items-center gap-2">
              <span className="border-l-4 border-orange-500 pl-2">
                Product Information
              </span>
            </h3>

            <div className="space-y-2 text-sm">
              <p>
                <strong>Product Category :</strong> {product.category}
              </p>
              <p>
                <strong>Product Name :</strong> {product.name}
              </p>
              <p>
                <strong>Price :</strong> {product.price}
              </p>
              <p>
                <strong>Added On :</strong> {product.addedOn}
              </p>
              <p>
                <strong>Return :</strong> {product.returnPolicy}
              </p>
              <p>
                <strong>Description :</strong> {product.description}
              </p>
            </div>
          </div>
        </div>

        {/* 🟢 Product Visibility */}
        <div className="flex items-center gap-2 mt-8">
          <img
            src="/icons/visibility.svg"
            alt="visibility"
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
      </div>
    </div>
  );
};

export default ViewProduct;
