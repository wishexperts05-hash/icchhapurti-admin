import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../components/uiComponent/PagePath2";
import Button from "../../../components/uiComponent/Button";
import { useNavigate } from "react-router-dom";
import useProductManagement from "../../../hooks/productList/useProductManagment";
import LoaderSpinner from "../../../components/uiComponent/LoaderSpinner";

const ViewProduct = () => {
  const [visible, setVisible] = useState();
  const [currentVideo, setCurrentVideo] = useState(0);

  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    fetchProductDetailById,
    productDetail,
    loading,
    updateProductStatus,
  } = useProductManagement();
  useEffect(() => {
    fetchProductDetailById(id);
  }, [id]);

  console.log("Product Detail:", productDetail);

  useEffect(() => {
    if (productDetail?.product) {
      setVisible(productDetail.product.isActive);
    }
  }, [productDetail]);

  // 🟠 Dummy product data (replace with API data later)
  // const product = {
  //   category: "Pen",
  //   name: "Uni-ball",
  //   price: "₹ 10",
  //   addedOn: "10/05/2010",
  //   returnPolicy: "Easy Return Within 2 days",
  //   description:
  //     "German brand famous for high-quality fountain pens, Offers a wide range from student-grade to luxury writing instruments",
  //   images: [
  //     "https://linclimited.com/wp-content/uploads/2023/04/blue-sl-500-2.jpg",
  //     "https://linclimited.com/wp-content/uploads/2023/04/black-sl-500-3.jpg",
  //   "https://linclimited.com/wp-content/uploads/2023/04/blue-sl-500-3.jpg",
  //   ],
  // };

  const product = productDetail?.product;

  //  const navigate = useNavigate();
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
      {loading ? (
        <div className="flex items-center justify-center">
          <LoaderSpinner />
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md mt-4">
          {/* Image + Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 🖼️ Product Image */}
            <div className="flex flex-col items-center">
              <div className="border rounded-md p-4 w-[280px] h-[280px] flex items-center justify-center relative">
                <img
                  src={product?.images?.[currentImage]}
                  alt={product?.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* 🟤 Dots */}
              <div className="flex gap-2 mt-3">
                {productDetail?.product?.images?.map((_, index) => (
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
                  <strong>Product Category :</strong>{" "}
                  {productDetail?.product?.category}
                </p>
                <p>
                  <strong>Product Name :</strong> {productDetail?.product?.name}
                </p>
                <p>
                  <strong>Price :</strong> {productDetail?.product?.price}
                </p>
                <p>
                  <strong>Added On :</strong>{" "}
                  {productDetail?.product?.createdAt}
                </p>
                <p>
                  <strong>Return :</strong>{" "}
                  {product?.returnable
                    ? `Easy Return within ${product?.returnableDays} days`
                    : "No Return Available"}
                </p>

                {/* <p>
                <strong>Description :</strong> {productDetail?.product?.description}
              </p> */}
                {/* 🧾 Product Details */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold border-b pb-2 mb-4">
                    Product Details
                  </h3>

                  {product?.productDetails?.length === 0 ? (
                    <p>No details available</p>
                  ) : (
                    product?.productDetails?.map((block, index) => (
                      <div key={index}>
                        <h4> Title :{block.title}</h4>
                        <div
                          dangerouslySetInnerHTML={{ __html: block.detail }}
                        />
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* 🎥 Product Videos – Separate Block */}
          {product?.videos?.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
              <h3 className="text-xl font-semibold mb-6 border-b pb-3">
                Product Videos
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Main Video */}
                <div className="lg:col-span-3 flex justify-center">
                  <video
                    key={currentVideo}
                    src={product.videos[currentVideo]}
                    controls
                    className="w-full h-[420px] rounded-lg border bg-black object-contain"
                  />
                </div>

                {/* Video List */}
                <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto max-h-[420px] pr-2">
                  {product.videos.map((videoUrl, index) => (
                    <div
                      key={index}
                      onClick={() => setCurrentVideo(index)}
                      className={`cursor-pointer rounded-md border p-1 transition ${
                        currentVideo === index
                          ? "border-orange-500 ring-2 ring-orange-300"
                          : "border-gray-300 hover:border-gray-500"
                      }`}
                    >
                      <video
                        src={videoUrl}
                        muted
                        className="w-[140px] h-[90px] object-cover rounded"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 🟢 Product Visibility */}
          <div className="flex items-center gap-2 mt-8">
            <img
              src="/icons/visibility.svg"
              alt="visibility"
              className="w-6 h-6 text-yellow-600"
            />
            <span className="text-gray-700 font-medium">
              Product Visibility
            </span>
            <label className="relative inline-flex items-center cursor-pointer ml-2">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={visible}
                onChange={async () => {
                  const success = await updateProductStatus(id, !visible);
                  if (success) {
                    setVisible(!visible);
                  }
                }}
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-500 rounded-full peer peer-checked:bg-green-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
            </label>
          </div>
          <div className="flex justify-center mt-6">
            <Button
              variant={1}
              onClick={() => navigate(-1)}
              text="Cancel"
            ></Button>{" "}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewProduct;
