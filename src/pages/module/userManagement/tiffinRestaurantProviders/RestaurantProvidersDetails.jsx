import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import useTiffinRestraunt from "../../../../hooks/userManagement/useTiffinRestraunt";
import LoaderSpinner from "../../../../components/uiComponent/LoaderSpinner";
import { FaRegUser } from "react-icons/fa6";
import { ImSpoonKnife } from "react-icons/im";
import Button from "../../../../components/uiComponent/Button";
import noImage from "../../../../assets/noImage.jpg";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Star, StarFill } from "react-bootstrap-icons";
import DetailsField from "../../../../components/uiComponent/DetailsField";

function RestaurantProvidersDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    fetchTiffinRestrauntDetailById,
    tiffinRestrauntDetail,
    loading,
    updateStatus,
  } = useTiffinRestraunt();

  useEffect(() => {
    if (id) {
      fetchTiffinRestrauntDetailById(id);
    }
  }, [id]);

  const handleStatusUpdate = (status) => {
    if (status === "Blocked") {
      updateStatus(id, "Active");
    } else {
      updateStatus(id, "Blocked");
    }
  };
  const data = tiffinRestrauntDetail?.data || {};
  const [isOpen, setIsOpen] = useState(false);
  const [currentImages, setCurrentImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openImage = (images, index) => {
    setCurrentImages(images);
    setCurrentImageIndex(index);
    setIsOpen(true);
  };
  const [imgError, setImgError] = useState(false);
  const closeImage = () => setIsOpen(false);
  const prevImage = () =>
    setCurrentImageIndex((i) => (i === 0 ? currentImages.length - 1 : i - 1));
  const nextImage = () =>
    setCurrentImageIndex((i) => (i === currentImages.length - 1 ? 0 : i + 1));

  return (
    <div className="flex flex-col gap-1 font-inter">
      <BreadCrumb
        linkText={[
          { text: "User Management" },
          {
            text: "Tiffin/Restaurant Provider",
            href: "/tiffin-restaurant-provider",
          },
          { text: "Tiffin/Restaurant Provider Details" },
        ]}
      />

      <PagePath2 title="Tiffin/Restaurant Provider Details" showAddButton />

      <div className="w-full p-6 rounded-[8px] bg-white shadow flex flex-col gap-6 ">
        {loading ? (
          <div className="flex items-center justify-center">
            <LoaderSpinner />
          </div>
        ) : (
          <>
            {/* Centered Profile Image */}
            <div className="flex justify-center mb-6">
              <div
                className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-primary-200 bg-gray-50 shadow-md hover:shadow-lg transition cursor-pointer"
                onClick={() =>
                  data.profileImage && openImage([data.profileImage])
                }
              >
                <img
                  src={data.profileImage || noImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* ---------- Basic Information ---------- */}
            <div className="text-gray-700 text-xl flex items-center gap-3 font-semibold mb-2">
              <FaRegUser />
              <span>Basic Information</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col ">
                <DetailsField label="Name:" value={data.name || ""} />
              </div>

              <div className="flex flex-col">
                <DetailsField
                  label="Phone Number:"
                  value={data.phoneNumber || "-"}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm text-gray-600"></label>
                <DetailsField label="Email:" value={data.email || "-"} />
              </div>

              <div className="flex flex-col">
                <label className="text-sm text-gray-600"></label>
                <DetailsField
                  label="Password:"
                  value={data?.password ? "*".repeat(10) : "-"}
                />
              </div>

              <div className="flex flex-col">
                <DetailsField
                  label="Street:"
                  value={data.addressDetails?.street || "-"}
                />
              </div>

              <div className="flex flex-col">
                <DetailsField
                  label="Postal Code:"
                  value={data.addressDetails?.postCode || "-"}
                />
              </div>

              <div className="flex flex-col md:col-span-2">
                <DetailsField
                  label="Address:"
                  value={data.addressDetails?.address || "-"}
                />
              </div>
            </div>

            {/* --- Identification Documents --- */}
            <div className="text-gray-700 text-xl flex items-center gap-3 font-semibold mb-4 mt-2">
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 16H16M1 6.83333H16M2.66667 3.5L8.5 1L14.3333 3.5M1.83333 6.83333V16M15.1667 6.83333V16M5.16667 10.1667V12.6667M8.5 10.1667V12.6667M11.8333 10.1667V12.6667"
                  stroke="#0A051F"
                  strokeWidth="1.67"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Identification Documents</span>
            </div>

            <div className="flex flex-wrap justify-center gap-8 mb-8">
              {/* Aadhaar Card (Front & Back) */}
              {data?.aadhaarCardFront && data?.aadhaarCardBack ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <img
                        src={data?.aadhaarCardFront}
                        alt="Aadhaar Card Front"
                        className="w-64 h-40 object-cover border rounded-lg shadow-md"
                      />
                      <span className="text-sm mt-2 text-gray-600 font-medium">
                        Aadhaar Front
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <img
                        src={data?.aadhaarCardBack}
                        alt="Aadhaar Card Back"
                        className="w-64 h-40 object-cover border rounded-lg shadow-md"
                      />
                      <span className="text-sm mt-2 text-gray-600 font-medium">
                        Aadhaar Back
                      </span>
                    </div>
                  </div>
                </div>
              ) : data?.aadhaarCardFront ? (
                // In case only one side available
                <div className="flex flex-col items-center">
                  <img
                    src={data?.aadhaarCardFront}
                    alt="Aadhaar Card"
                    className="w-64 h-40 object-cover border rounded-lg shadow-md"
                  />
                  <span className="text-sm mt-2 text-gray-600 font-medium">
                    Aadhaar Card
                  </span>
                </div>
              ) : null}

              {/* PAN Card */}
              {data?.panCard && (
                <div className="flex flex-col items-center">
                  <img
                    src={data?.panCard}
                    alt="PAN Card"
                    className="w-64 h-40 object-cover border rounded-lg shadow-md"
                  />
                  <span className="text-sm mt-2 text-gray-600 font-medium">
                    PAN Card
                  </span>
                </div>
              )}
            </div>

            <div className="text-gray-700 text-xl flex items-center gap-3 font-semibold mb-4">
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 16H16M1 6.83333H16M2.66667 3.5L8.5 1L14.3333 3.5M1.83333 6.83333V16M15.1667 6.83333V16M5.16667 10.1667V12.6667M8.5 10.1667V12.6667M11.8333 10.1667V12.6667"
                  stroke="#0A051F"
                  strokeWidth="1.67"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Bank Details (Optional)</span>
            </div>

            <div className="flex gap-4">
              <DetailsField
                label="Account Number"
                value={data?.bankDetails?.accountNumber || "-"}
              />
              <DetailsField
                label="IFSC Code:"
                value={data?.bankDetails?.ifscCode || "-"}
              />
            </div>

            <div className="flex gap-4">
              <DetailsField
                label="Account Type"
                value={data?.bankDetails?.accountType || "-"}
              />
              <DetailsField
                label="Account Holder Name"
                value={data?.bankDetails?.accountHolderName || "-"}
              />
            </div>
            {/* Bank Proof (Passbook / Cheque) */}
            <div className="flex flex-col items-center">
              <img
                src={data?.bankDetails?.passbookOrChequeImage}
                alt="Passbook or Cheque"
                className="w-64 h-40 object-cover border rounded-lg shadow-md"
              />
              <span className="text-sm mt-2 text-gray-600 font-medium">
                Bank Proof
              </span>
            </div>
            {/* --- Supporting Documents --- */}
            {data?.supportingDocuments?.length > 0 && (
              <>
                <div className="text-gray-700 text-xl flex items-center gap-3 font-semibold mb-4 mt-4">
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 17 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 16H16M1 6.83333H16M2.66667 3.5L8.5 1L14.3333 3.5M1.83333 6.83333V16M15.1667 6.83333V16M5.16667 10.1667V12.6667M8.5 10.1667V12.6667M11.8333 10.1667V12.6667"
                      stroke="#0A051F"
                      strokeWidth="1.67"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Supporting Documents</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8 justify-items-center">
                  {data.supportingDocuments.slice(0, 10).map((doc) => {
                    const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(
                      doc.documentFile
                    );

                    // Handle broken images by using onError to fallback to a placeholder

                    return (
                      <div
                        key={doc._id}
                        className="flex flex-col items-center w-full max-w-[250px]"
                      >
                        {isImage && !imgError ? (
                          <img
                            src={doc.documentFile}
                            alt={doc.documentName}
                            className="w-full h-40 object-cover border rounded-lg shadow-md hover:scale-105 transition-transform cursor-pointer"
                            onClick={() =>
                              window.open(doc.documentFile, "_blank")
                            }
                            onError={() => setImgError(true)}
                          />
                        ) : (
                          <a
                            href={doc.documentFile}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline font-medium text-center w-full"
                          >
                            View {doc.documentName}
                          </a>
                        )}
                        <span className="text-sm mt-2 text-gray-600 font-medium text-center break-words w-full">
                          {doc.documentName}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {/* ---------- Tiffin/Restaurant Section ---------- */}
            <div className="text-gray-700 text-xl flex items-center gap-3 font-semibold mb-2 mt-6">
              <ImSpoonKnife />
              <span>Tiffin/Restaurant</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tiffinRestrauntDetail?.tiffinServices?.length > 0 ? (
                tiffinRestrauntDetail?.tiffinServices?.map((service) => {
                  const images = service?.photo?.length
                    ? service.photo
                    : [noImage]; // Ensure array

                  return (
                    <div
                      key={service.id}
                      className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                    >
                      <div className="relative h-56 bg-gray-50 border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition flex">
                        <img
                          src={images[0]}
                          onClick={() => openImage(images, 0)}
                          alt="Main"
                          className={`cursor-pointer object-cover ${
                            images.length === 1 ? "w-full" : "w-2/3"
                          }`}
                        />
                        {images.length > 1 && (
                          <div className="flex flex-col gap-2 w-1/3 p-2 bg-gray-50">
                            {images.slice(1, 4).map((img, i) => (
                              <img
                                key={i}
                                src={img}
                                onClick={() => openImage(images, i + 1)}
                                className="h-16 object-cover rounded border cursor-pointer hover:scale-105 transition"
                                alt={`Thumbnail ${i + 1}`}
                              />
                            ))}
                          </div>
                        )}

                        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 to-transparent"></div>

                        <span className="absolute top-3 left-3 bg-white/90 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                          {service?.foodType || "N/A"}
                        </span>
                      </div>

                      {/* Content Section */}
                      <div className="p-4 flex flex-col gap-2">
                        <h3 className="font-semibold text-lg text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                          {service?.serviceName}
                        </h3>
                        <p className="text-gray-500 text-sm flex items-center gap-1">
                          <i className="ri-map-pin-2-line text-indigo-400"></i>{" "}
                          {service?.area}
                        </p>
                        <p className="font-medium text-indigo-600 text-sm">
                          ₹{service?.pricePerMeal || 0}{" "}
                          <span className="text-gray-500">/meal</span>
                        </p>

                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center gap-1 text-sm">
                            {Array.from({ length: 5 }, (_, i) => {
                              const starNumber = i + 1;
                              if (
                                starNumber <= Math.floor(service?.averageRating)
                              ) {
                                return (
                                  <StarFill
                                    key={i}
                                    className="w-4 h-4 text-yellow-400"
                                  />
                                );
                              } else if (
                                starNumber - service?.averageRating <
                                1
                              ) {
                                return (
                                  <div key={i} className="relative w-4 h-4">
                                    <StarFill
                                      className="absolute top-0 left-0 w-4 h-4 text-yellow-400"
                                      style={{
                                        clipPath: `inset(0 ${
                                          100 -
                                          (service.averageRating % 1) * 100
                                        }% 0 0)`,
                                      }}
                                    />
                                    <Star className="w-4 h-4 text-gray-300" />
                                  </div>
                                );
                              } else {
                                return (
                                  <Star
                                    key={i}
                                    className="w-4 h-4 text-gray-300"
                                  />
                                );
                              }
                            })}
                            <span className="ml-1 text-gray-700">
                              {service?.averageRating?.toFixed(1) || "0.0"}
                            </span>
                          </div>

                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              service?.visibilityStatus === "Active"
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {service?.visibilityStatus || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-10 border border-dashed border-gray-300 rounded-xl bg-gray-50 text-gray-500 font-medium text-lg">
                  No Services Available
                </div>
              )}
            </div>

            <div className="my-4 border-t border-gray-300" />

            <div className="flex gap-4 justify-center items-center mt-6">
              <button
                className={`px-6 py-3 rounded-xl text-white ${
                  data.status === "Blocked" ? "bg-green-500" : "bg-red-500"
                }`}
                onClick={() => {
                  handleStatusUpdate(data.status);
                }}
              >
                {data.status === "Blocked" ? "Unblock" : "Block"}
              </button>

              <Button
                variant={2}
                text="Cancel"
                onClick={() => navigate(`/tiffin-restaurant-provider`)}
              />
              <Button
                variant={1}
                text="Edit"
                onClick={() =>
                  navigate(
                    `/tiffin-restaurant-provider/edit-restaurant-provider/${id}`
                  )
                }
              />
            </div>
          </>
        )}
      </div>

      {/* Image Viewer Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <button
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={closeImage}
            aria-label="Close"
          >
            <X size={28} />
          </button>
          <button
            className="absolute left-6 text-white p-2 rounded-full hover:bg-black/40"
            onClick={prevImage}
            aria-label="Previous Image"
          >
            <ChevronLeft size={36} />
          </button>
          <img
            src={currentImages[currentImageIndex]}
            alt="preview"
            className="min-h-[80vh] max-w-[90vw] rounded-lg shadow-lg object-contain"
          />
          <button
            className="absolute right-6 text-white p-2 rounded-full hover:bg-black/40"
            onClick={nextImage}
            aria-label="Next Image"
          >
            <ChevronRight size={36} />
          </button>
        </div>
      )}
    </div>
  );
}

export default RestaurantProvidersDetails;
