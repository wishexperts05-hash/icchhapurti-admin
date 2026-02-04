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
  const [selectedCountry, setSelectedCountry] = useState(0);

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

  useEffect(() => {
    if (productDetail?.product) {
      setVisible(productDetail.product.isActive);
    }
  }, [productDetail]);

  const product = productDetail?.product;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <BreadCrumb
        linkText={[
          { text: "Product Management", href: "/product-management" },
          { text: "View Product" },
        ]}
      />

      <PagePath2 title="View Product Details" />

      {loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <LoaderSpinner />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-2 py-4">
          {/* Main Product Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Product Header with ID and Status */}
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 px-6 py-3 flex justify-between items-center" style={{ background: 'linear-gradient(to right, #FACD34, #F5B800)' }}>
              <div className="text-gray-800">
                <h2 className="text-md font-semibold">{product?.name}</h2>
                <p className="text-gray-700 text-xs mt-1">Product ID: {product?.productId}</p>
              </div>
              <div className="flex items-center gap-3 bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg">
                
                <span className="text-gray-800 font-medium text-sm">Visibility</span>
                <label className="relative inline-flex items-center cursor-pointer">
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
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gray-800 rounded-full peer peer-checked:bg-green-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
                </label>
              </div>
            </div>

            <div className="p-6">
              {/* Images and Basic Info Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Image Gallery */}
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-200">
                    <div className="aspect-square flex items-center justify-center">
                      <img
                        src={product?.images?.[currentImage]}
                        alt={product?.name}
                        className="max-h-full max-w-full object-contain rounded-lg"
                      />
                    </div>
                  </div>

                  {/* Thumbnail Gallery */}
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {product?.images?.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImage(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden transition-all ${currentImage === index
                            ? "border-yellow-500 ring-2 ring-yellow-200 scale-105"
                            : "border-gray-300 hover:border-yellow-300"
                          }`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Product Information */}
                <div className="space-y-6">
                  {/* Price Section with Country Selector */}
                 <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-5 border border-yellow-200">
  <h3 className="text-sm font-semibold text-gray-600 mb-4">PRICING</h3>

  <div className="space-y-3">
    {product?.prices?.map((priceObj, index) => (
      <div
        key={index}
        className="flex items-center justify-between bg-white rounded-lg px-4 py-3 border border-yellow-200"
      >
        <span className="text-sm font-medium text-gray-700">
          {priceObj.countryName}
        </span>

        <span className="text-lg font-bold text-yellow-600">
          {priceObj.currencySymbol}
          {priceObj.price}
          <span className="text-sm text-gray-500 ml-1">
            ({priceObj.currencyCode})
          </span>
        </span>
      </div>
    ))}
  </div>
</div>

                  {/* Basic Details */}
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <span className="text-sm font-semibold text-gray-600 w-32">Category:</span>
                      <span className="text-sm text-gray-800 bg-yellow-100 px-3 py-1 rounded-full">
                        {product?.category}
                      </span>
                    </div>

                     {/* <div className="flex items-start">
                      <span className="text-sm font-semibold text-gray-600 w-32">Added On:</span>
                      <span className="text-sm text-gray-800">{formatDate(product?.createdAt)}</span>
                    </div> */}

                    {/* <div className="flex items-start">
                      <span className="text-sm font-semibold text-gray-600 w-32">Return Policy:</span>
                      <span className={`text-sm px-3 py-1 rounded-full ${product?.returnable
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                        }`}>
                        {product?.returnable
                          ? `Easy Return within ${product?.returnableDays} days`
                          : "No Return Available"}
                      </span>
                    </div>  */}

                    <div className="flex items-start">
                      <span className="text-sm font-semibold text-gray-600 w-32">Status:</span>
                      <span className={`text-sm px-3 py-1 rounded-full font-medium ${product?.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                        }`}>
                        {product?.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Details Sections */}
              {product?.productDetails?.length > 0 && (
                <div className="space-y-6 mb-8">
                  <h3 className="text-xl font-bold text-gray-800 border-b-2 border-yellow-500 pb-2 inline-block">
                    Product Details
                  </h3>

                  {product.productDetails.map((block, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <h4 className="text-lg font-semibold text-yellow-600 mb-4 flex items-center gap-2">
                        <span className="w-1 h-6 bg-yellow-500 rounded"></span>
                        {block.title}
                      </h4>
                      <div
                        className="prose prose-sm max-w-none text-gray-700 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: block.detail }}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Videos Section */}
              {/* Videos Section */}
              {product?.videos?.length > 0 && (
                <div className="space-y-4 mb-8">
                  <h3 className="text-xl font-bold text-gray-800 border-b-2 border-yellow-500 pb-2 inline-block">
                    Product Videos
                  </h3>

                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Main Video Player */}
                    <div className="lg:col-span-3 bg-black rounded-lg overflow-hidden border-2 border-gray-300">
                      <video
                        key={currentVideo}
                        src={product.videos[currentVideo]}
                        controls
                        className="w-full h-[420px] object-contain"
                      />
                    </div>

                    {/* Video Thumbnails */}
                    <div
                      className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto max-h-[420px] pr-2"
                      style={{
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#FACD34 #f1f1f1'
                      }}
                    >
                      <style>
                        {`
            .video-scroll::-webkit-scrollbar {
              width: 6px;
            }
            .video-scroll::-webkit-scrollbar-track {
              background: #f1f1f1;
              border-radius: 10px;
            }
            .video-scroll::-webkit-scrollbar-thumb {
              background: #FACD34;
              border-radius: 10px;
            }
            .video-scroll::-webkit-scrollbar-thumb:hover {
              background: #F5B800;
            }
          `}
                      </style>
                      {product.videos.map((videoUrl, index) => (
                        <div
                          key={index}
                          onClick={() => setCurrentVideo(index)}
                          className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${currentVideo === index
                              ? "border-yellow-500 ring-2 ring-yellow-300"
                              : "border-gray-300 hover:border-yellow-400"
                            }`}
                        >
                          <div className="relative">
                            <video
                              src={videoUrl}
                              muted
                              className="w-[140px] h-[90px] object-cover"
                            />
                            {/* Play icon overlay */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                              <svg className="w-8 h-8 text-white opacity-80" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                          <div className={`text-xs py-1.5 text-center font-medium ${currentVideo === index
                              ? "bg-yellow-500 text-white"
                              : "bg-gray-100 text-gray-700"
                            }`}>
                            Video {index + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-center gap-4 pt-6 border-t">
                <Button
                  variant={1}
                  onClick={() => navigate(-1)}
                  text="Back to Products"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewProduct;