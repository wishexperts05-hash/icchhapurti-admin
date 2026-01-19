import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../components/uiComponent/PagePath2";
import useOrderManagement from "../../../hooks/orderManagement/useOrderManagement";
import { useParams } from "react-router-dom";
import LoaderSpinner from "../../../components/uiComponent/LoaderSpinner";
import DetailsField from "../../../components/uiComponent/DetailsField";
import {
  LocalShipping,
  Receipt,
  Discount,
  Inventory2,
  Close,
  NavigateBefore,
  NavigateNext,
} from "@mui/icons-material";

const OrderDetails = () => {
  const { userType, orderId } = useParams();
  const { loading, orderDetails, fetchOrderDetails } = useOrderManagement();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  useEffect(() => {
    fetchOrderDetails(userType, orderId);
  }, [userType, orderId]);

  const getTimelineSteps = () => {
    if (!orderDetails?.timeline) return [];

    return orderDetails.timeline.map((item, index) => ({
      label: item.status,
      description: item.note,
      date: item.at,
      active: index === orderDetails.timeline.length - 1,
    }));
  };

  const timelineSteps = getTimelineSteps();

  const InfoCard = ({ icon, title, value, color = "#CCA547" }) => (
    <div className={`p-4 rounded-2xl border transition-all duration-300 hover:translate-y-[-4px] hover:shadow-lg`}
      style={{
        background: `linear-gradient(135deg, ${color}15 0%, ${color}08 100%)`,
        borderColor: `${color}30`
      }}>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full flex items-center justify-center text-white"
          style={{ background: `linear-gradient(135deg, ${color} 0%, ${color}AA 100%)` }}>
          {icon}
        </div>
        <div>
          <div className="text-gray-600 font-medium text-sm">{title}</div>
          <div className="text-lg font-bold" style={{ color }}>{value}</div>
        </div>
      </div>
    </div>
  );

  // Open image modal with specific product and image index
  const openImageModal = (productIndex, imageIndex = 0) => {
    setCurrentProductIndex(productIndex);
    setSelectedImageIndex(imageIndex);
    setIsModalOpen(true);
  };

  // Close image modal
  const closeImageModal = () => {
    setIsModalOpen(false);
  };

  // Navigate to next image
  const nextImage = () => {
    const product = orderDetails?.products?.[currentProductIndex];
    if (product?.productImages) {
      setSelectedImageIndex((prev) =>
        prev === product.productImages.length - 1 ? 0 : prev + 1
      );
    }
  };

  // Navigate to previous image
  const prevImage = () => {
    const product = orderDetails?.products?.[currentProductIndex];
    if (product?.productImages) {
      setSelectedImageIndex((prev) =>
        prev === 0 ? product.productImages.length - 1 : prev - 1
      );
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isModalOpen) return;

      if (e.key === 'Escape') closeImageModal();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  console.log("orderDetails", orderDetails);

  return (
    <div>
      <BreadCrumb
        linkText={[
          { text: "Order Management", href: "/order-management" },
          { text: "View Order" },
        ]}
      />
      <PagePath2 title="Order Details" />

      {/* Image Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full w-full">
            {/* Close Button */}
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full p-2"
            >
              <Close className="text-2xl" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full p-2"
            >
              <NavigateBefore className="text-2xl" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full p-2"
            >
              <NavigateNext className="text-2xl" />
            </button>

            {/* Main Image */}
            <div className="flex justify-center items-center h-full">
              <img
                src={orderDetails?.products?.[currentProductIndex]?.productImages?.[selectedImageIndex]}
                alt={`Product image ${selectedImageIndex + 1}`}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
            </div>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 px-3 py-1 rounded-full text-sm">
              {selectedImageIndex + 1} / {orderDetails?.products?.[currentProductIndex]?.productImages?.length || 0}
            </div>

            {/* Thumbnail Strip */}
            {orderDetails?.products?.[currentProductIndex]?.productImages?.length > 1 && (
              <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-2">
                {orderDetails.products[currentProductIndex].productImages.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className={`w-12 h-12 object-cover rounded cursor-pointer border-2 ${selectedImageIndex === index ? 'border-[#CCA547]' : 'border-transparent'
                      }`}
                    onClick={() => setSelectedImageIndex(index)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Remove gap by using negative margin */}
      <div className="bg-white rounded-lg shadow-md pt-4 mt-4">
        {loading ? (
          <div className="flex w-full items-center justify-center py-10">
            <LoaderSpinner />
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            {/* Header Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <InfoCard
                icon={<Receipt className="text-2xl" />}
                title="Order Total"
                value={`₹ ${orderDetails?.grandTotal?.toLocaleString()}`}
                color="#CCA547"
              />
              <InfoCard
                icon={<Inventory2 className="text-2xl" />}
                title="Total Products"
                value={orderDetails?.totalProducts}
                color="#2196F3"
              />
              <InfoCard
                icon={<Discount className="text-2xl" />}
                title="Discount"
                value={`-₹ ${orderDetails?.discountAmount?.toLocaleString()}`}
                color="#4CAF50"
              />
              <InfoCard
                icon={<LocalShipping className="text-2xl" />}
                title="Shipping"
                value={`₹ ${orderDetails?.shippingAmount?.toLocaleString()}`}
                color="#FF9800"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Main Content (2/3 width) */}
              <div className="lg:col-span-2 space-y-6">
                {/* Order Information Card */}
                <div className="bg-white rounded-3xl border border-gray-200 p-6 lg:p-8 shadow-sm">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#CCA547] to-[#EEC1BB] flex items-center justify-center text-white">
                      <Receipt className="text-2xl" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Order Information</h2>
                      <p className="text-gray-600">Complete order details and tracking information</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <DetailsField
                      label="Order ID"
                      value={orderDetails?.orderId || "-"}
                      valueColor="#CCA547"
                      valueWeight="bold"
                    />
                    <DetailsField
                      label="Order Date & Time"
                      value={`${orderDetails?.orderDate || "-"} ${orderDetails?.orderTime || ""}`.trim()}
                    />
                    <DetailsField
                      label="Payment Method"
                      value={orderDetails?.paymentMethod || "-"}
                    />
                    <DetailsField
                      label="Payment Status"
                      value={orderDetails?.paymentStatus || "-"}
                    />
                    <DetailsField
                      label="Order Status"
                      value={orderDetails?.status || "-"}
                    />
                    <DetailsField
                      label="Referral Code"
                      value={orderDetails?.referralCode || "-"}
                    />
                  </div>

                  <hr className="my-6 border-gray-200" />

                  <h3 className="text-xl font-bold text-gray-900 mb-4">Customer Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <DetailsField
                      label="User Name"
                      value={orderDetails?.userName || "-"}
                    />
                    <DetailsField
                      label="User Phone"
                      value={orderDetails?.userPhone || "-"}
                    />
                    <DetailsField
                      label="User Email"
                      value={orderDetails?.userEmail || "-"}
                    />
                    <div className="sm:col-span-2 lg:col-span-3">
                      <DetailsField
                        label="Shipping Address"
                        value={orderDetails?.shippingAddress ?
                          `${orderDetails.shippingAddress.street || ""}${orderDetails.shippingAddress.label ? ` (${orderDetails.shippingAddress.label})` : ""}, ${orderDetails.shippingAddress.city || ""} - ${orderDetails.shippingAddress.pinCode || ""}`
                          : "-"
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Products Section */}
                <div className="bg-white rounded-3xl border border-gray-200 p-6 lg:p-8 shadow-sm">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white">
                      <Inventory2 className="text-2xl" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Products Ordered</h2>
                      <p className="text-gray-600">{orderDetails?.products?.length} item(s) in this order</p>
                    </div>
                  </div>

                  {orderDetails?.products?.map((product, productIndex) => (
                    <div key={productIndex}
                      className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-100 rounded-2xl p-6 mb-4 transition-all duration-400 hover:border-[#CCA547] hover:shadow-xl hover:translate-y-[-4px]">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="md:col-span-1">
                          <div className="relative">
                            {/* Main Product Image - Click to open modal */}
                            <div
                              className="w-full h-48 rounded-xl border-2 border-gray-100 bg-gray-50 overflow-hidden cursor-pointer"
                              onClick={() => openImageModal(productIndex, 0)}
                            >
                              <img
                                src={product?.productImages?.[0]}
                                alt={product?.productName}
                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                              />
                            </div>

                            {/* Thumbnail Gallery */}
                            {product?.productImages?.length > 1 && (
                              <div className="flex justify-center gap-2 mt-3">
                                {product.productImages.slice(0, 4).map((img, imgIdx) => (
                                  <div
                                    key={imgIdx}
                                    className={`relative w-10 h-10 rounded-lg border-2 cursor-pointer overflow-hidden ${imgIdx === 0
                                      ? 'border-[#CCA547] opacity-100'
                                      : 'border-white opacity-70'
                                      }`}
                                    onClick={() => openImageModal(productIndex, imgIdx)}
                                  >
                                    <img
                                      src={img}
                                      alt={`Thumbnail ${imgIdx + 1}`}
                                      className="w-full h-full object-cover"
                                    />
                                    {imgIdx === 3 && product.productImages.length > 4 && (
                                      <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                                        <span className="text-white text-xs font-bold">
                                          +{product.productImages.length - 4}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* View All Photos Button */}
                            {product?.productImages?.length > 1 && (
                              <button
                                onClick={() => openImageModal(productIndex, 0)}
                                className="w-full mt-2 bg-[#CCA547] text-white py-1 px-3 rounded-lg text-sm font-medium hover:bg-[#b8943f] transition-colors duration-200"
                              >
                                View All Photos ({product.productImages.length})
                              </button>
                            )}
                          </div>
                        </div>

                        <div className="md:col-span-3">
                          <div className="flex flex-col h-full">
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-gray-900 mb-2">{product.productName}</h3>
                              <span className="inline-block bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-sm font-medium px-3 py-1 rounded-full mb-3">
                                {product.productCategory}
                              </span>
                              <p className="text-gray-600 leading-relaxed line-clamp-2">
                                {product.description}
                              </p>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                              <DetailsField
                                label="Unit Price"
                                value={`₹ ${product.price?.toLocaleString()}`}
                                valueColor="#CCA547"
                                valueWeight="bold"
                              />
                              <DetailsField
                                label="Quantity"
                                value={
                                  <span className="bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                                    {String(product.quantity)}
                                  </span>
                                }
                              />
                              <div className="col-span-2 sm:col-span-1">
                                <DetailsField
                                  label="Total Amount"
                                  value={`₹ ${(product.price * product.quantity)?.toLocaleString()}`}
                                  valueColor="#262626"
                                  valueWeight="bold"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Sidebar (1/3 width) */}
              <div className="space-y-6">
                {/* Order Timeline */}
                <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-300 flex items-center justify-center text-white">
                      <LocalShipping className="text-xl" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Order Timeline</h3>
                  </div>

                  <div className="space-y-4">
                    {timelineSteps.map((step, index) => (
                      <div key={step.label} className="flex">
                        <div className="flex flex-col items-center mr-4">
                          <div className={`w-3 h-3 rounded-full ${index < timelineSteps.length - 1 ? 'bg-green-500' : 'bg-[#CCA547]'}`}></div>
                          {index < timelineSteps.length - 1 && (
                            <div className="w-0.5 h-12 bg-gray-300 mt-1"></div>
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <h4 className={`font-semibold ${step.active ? 'text-[#CCA547]' : 'text-gray-900'}`}>
                            {step.label}
                          </h4>
                          <p className="text-gray-600 text-sm mt-1">{step.description}</p>
                          <p className="text-gray-500 text-xs italic mt-1">{step.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Details */}
                <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-green-400 flex items-center justify-center text-white">
                      <Receipt className="text-xl" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Price Breakdown</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">Subtotal</span>
                      <span className="font-medium">₹ {(orderDetails?.subtotalAmount || 0)?.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">Discount</span>
                      <span className="text-green-600 font-medium">- ₹ {(orderDetails?.discountAmount || 0)?.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">Shipping Charges</span>
                      <span className="text-gray-600">₹ {(orderDetails?.shippingAmount || 0)?.toLocaleString()}</span>
                    </div>

                    <hr className="border-dashed border-gray-300 my-2" />

                    <div className="flex justify-between items-center p-4 rounded-xl bg-gradient-to-r from-[#CCA547] to-[#CCA547] bg-opacity-10 border border-[#CCA547] border-opacity-30">
                      <span className="text-lg font-bold text-gray-900">Grand Total</span>
                      <span className="text-lg font-bold text-gray-900">₹ {(orderDetails?.grandTotal || 0)?.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between items-center p-4 rounded-xl bg-gradient-to-r from-green-100 to-green-50 border border-green-200">
                      <span className="text-sm font-bold text-green-800">Total Saved</span>
                      <span className="text-sm font-bold text-green-800">
                        ₹ {Math.max(0, ((orderDetails?.subtotalAmount ?? 0) + (orderDetails?.shippingAmount ?? 0)) - (orderDetails?.grandTotal ?? 0))?.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <span className="text-gray-600 text-sm font-medium">Payment Method</span>
                      <span className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-sm font-bold px-3 py-1 rounded-full">
                        {orderDetails?.paymentMethod || '-'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;