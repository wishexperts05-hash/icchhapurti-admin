import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import JoditEditor from "jodit-pro-react";
import { useRef } from "react";
import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../components/uiComponent/PagePath2";
import { FaTimes, FaPlus } from "react-icons/fa";
import Button from "../../../components/uiComponent/Button";
import returnIcon from "../../../assets/returnProduct.png";
import { useNavigate, useParams } from "react-router-dom";
import Added from "../../../assets/Added.png";
import useProductManagement from "../../../hooks/productList/useProductManagment";
import LoaderSpinner from "../../../components/uiComponent/LoaderSpinner";
import useDropdown from "../../../hooks/dropdown/useDropdown";

const EditProduct = () => {
  const [productImages, setProductImages] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);
  const [productVideos, setProductVideos] = useState([]);
  const [videosToDelete, setVideosToDelete] = useState([]);
  const [descriptionBlocks, setDescriptionBlocks] = useState([]);
  const [easyReturn, setEasyReturn] = useState(true);
  const [visible, setVisible] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const editorRefs = useRef([]);

  const [countryPrices, setCountryPrices] = useState([
    {
      countryId: "",
      countryName: "",
      currencyName: "",
      currencySymbol: "",
      price: "",
    },
  ]);

  const { countries, countryLoading, fetchCountryDropdown } = useDropdown();

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

  const { updateProduct, fetchProductDetailById, productDetail, loading } =
    useProductManagement();

  // Fetch countries on mount
  useEffect(() => {
    fetchCountryDropdown();
  }, []);

  // Fetch product on mount
  useEffect(() => {
    fetchProductDetailById(id);
  }, [id]);

  // Initialize Formik
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      category: productDetail?.product?.category || "",
      name: productDetail?.product?.name || "",
      returnable: productDetail?.product?.returnableDays || "",
      descriptions: productDetail?.product?.productDetails?.length
        ? productDetail.product.productDetails
        : [{ title: "", detail: "" }],
    },

    validationSchema: Yup.object({
      category: Yup.string().required("Category is required"),
      name: Yup.string().required("Product name is required"),
      returnable: Yup.string().required("Return days are required"),
    }),

    onSubmit: async (values) => {
      const formData = new FormData();

      formData.append("category", values.category);
      formData.append("name", values.name);
      formData.append("prices", JSON.stringify(countryPrices));
      formData.append("returnableDays", values.returnable);
      formData.append("productDetails", JSON.stringify(descriptionBlocks));
      formData.append("easyReturn", easyReturn);
      formData.append("visible", visible);

      // NEW images
      productImages.forEach((img) => {
        if (img.isNew) {
          formData.append("images", img.file);
        }
      });

      formData.append("imagesToDelete", JSON.stringify(imagesToDelete));

      // NEW videos
      productVideos.forEach((vid) => {
        if (vid.isNew) {
          formData.append("videos", vid.file);
        }
      });

      formData.append("videosToDelete", JSON.stringify(videosToDelete));

      await updateProduct(id, formData);
    },
  });

  // Update product details when fetched AND countries are loaded
  useEffect(() => {
    if (productDetail?.product && countries && countries.length > 0) {
      const formattedImages = (productDetail.product.images || []).map(
        (url) => ({
          url,
          isNew: false,
        })
      );
      setProductVideos(
        (productDetail.product.videos || []).map((url) => ({
          url,
          isNew: false,
        }))
      );

      setDescriptionBlocks(productDetail.product.productDetails || []);
      setProductImages(formattedImages);
      setEasyReturn(productDetail.product.returnable);
      setVisible(productDetail.product.isActive);

      // Map prices with country information from the dropdown
      if (productDetail.product.prices && productDetail.product.prices.length > 0) {
        const formattedPrices = productDetail.product.prices.map((priceObj) => {
          // Find the matching country from the dropdown to get full details
          const matchingCountry = countries.find(
            (country) => 
              country._id === priceObj.countryId || 
              country.id === priceObj.countryId ||
              country.name === priceObj.countryName
          );

          return {
            countryId: matchingCountry?._id || matchingCountry?.id || priceObj.countryId || "",
            countryName: matchingCountry?.name || priceObj.countryName || "",
            currencyName: matchingCountry?.defaultCurrencyName || priceObj.currencyName || "",
            currencySymbol: matchingCountry?.defaultCurrencySymbol || priceObj.currencySymbol || "",
            price: priceObj.price || "",
          };
        });
        setCountryPrices(formattedPrices);
      }
    }
  }, [productDetail, countries]);

  const countryOptions = Array.isArray(countries)
    ? countries.map((country) => ({
        value: country._id || country.id || country.name,
        label: country.name,
        currencyName: country.defaultCurrencyName || "",
        currencySymbol: country.defaultCurrencySymbol || "",
      }))
    : [];

  const addCountryPrice = () => {
    setCountryPrices((prev) => [
      ...prev,
      {
        countryId: "",
        countryName: "",
        currencyName: "",
        currencySymbol: "",
        price: "",
      },
    ]);
  };

  const removeCountryPrice = (index) => {
    if (countryPrices.length > 1) {
      setCountryPrices((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const getAvailableCountryOptions = (currentIndex) => {
    const selectedCountryIds = countryPrices
      .map((price, idx) => (idx !== currentIndex ? price.countryId : null))
      .filter((id) => id && id !== "");

    return countryOptions.filter(
      (option) => !selectedCountryIds.includes(option.value)
    );
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files).map((file) => ({
      file,
      isNew: true,
    }));

    setProductImages((prev) => [...prev, ...files]);
  };

  const handleVideoUpload = (e) => {
    const files = Array.from(e.target.files).map((file) => ({
      file,
      isNew: true,
    }));

    setProductVideos((prev) => [...prev, ...files]);
  };

  const handleRemoveVideo = (index) => {
    const video = productVideos[index];

    if (!video.isNew) {
      setVideosToDelete((prev) => [...prev, video.url]);
    }

    setProductVideos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveImage = (index) => {
    const image = productImages[index];
    if (!image.isNew) {
      setImagesToDelete((prev) => [...prev, image.url]);
    }
    setProductImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <BreadCrumb
        linkText={[
          { text: "Product Management", href: "/product-management" },
          { text: "Edit Product" },
        ]}
      />

      <PagePath2 title="Edit Product" />

      {loading ? (
        <div className="w-full flex items-center justify-center">
          <LoaderSpinner />
        </div>
      ) : (
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md mt-4"
        >
          {/* PRODUCT CATEGORY & NAME */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Product Category:
              </label>
              <input
                name="category"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.category}
                className="w-full border p-2 rounded-md"
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className="w-full border p-2 rounded-md"
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-sm">{formik.errors.name}</p>
              )}
            </div>
          </div>

          {/*  ADD COUNTRY & PRICE BUTTON */}
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={addCountryPrice}
              className="flex items-center gap-2 text-orange-600 font-medium mt-4 hover:text-orange-700"
            >
              <FaPlus /> Add Country & Price
            </button>
          </div>

          {/* PRICING SECTION */}
          {countryPrices.map((row, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 border p-4 rounded relative"
            >
              {/* Country Select (Dropdown) */}
              <div className="w-full">
                <label className="block text-gray-700 font-medium mb-2">
                  Country:
                </label>
                <div className="relative">
                  <select
                    value={row.countryId}
                    onChange={(e) => {
                      const selected = countryOptions.find(
                        (opt) => opt.value === e.target.value
                      );
                      if (selected) {
                        setCountryPrices((prev) =>
                          prev.map((item, i) =>
                            i === index
                              ? {
                                  ...item,
                                  countryId: selected.value,
                                  countryName: selected.label,
                                  currencyName: selected.currencyName,
                                  currencySymbol: selected.currencySymbol,
                                }
                              : item
                          )
                        );
                      }
                    }}
                    disabled={countryLoading}
                    className="block w-full px-4 py-2.5 pr-10 text-sm border border-gray-300 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent
                     bg-white appearance-none cursor-pointer"
                  >
                    <option value="" disabled>
                      Select Country
                    </option>

                    {getAvailableCountryOptions(index).map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {/* Dropdown Arrow Icon */}
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Price Input */}
              <div className="w-full">
                <label className="block text-gray-700 font-medium mb-2">
                  Price in {row.currencyName || "Currency"}:
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <span className="text-gray-500 font-semibold px-3">
                    {row.currencySymbol || "$"}
                  </span>
                  <input
                    type="number"
                    value={row.price}
                    onChange={(e) => {
                      setCountryPrices((prev) =>
                        prev.map((item, i) =>
                          i === index ? { ...item, price: e.target.value } : item
                        )
                      );
                    }}
                    placeholder="0.00"
                    className="flex-1 px-4 py-2.5 focus:outline-none focus:ring-0 rounded-r-lg"
                  />
                </div>
              </div>

              {/* Remove Button */}
              {countryPrices.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeCountryPrice(index)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  <FaTimes />
                </button>
              )}
            </div>
          ))}

          {/* DESCRIPTION */}
          <div className="mt-4">
            <label className="block text-gray-700 font-medium mb-2">
              Description:
            </label>

            {descriptionBlocks.map((block, index) => (
              <div key={index} className="relative border rounded-lg p-4 mb-3">
                {descriptionBlocks.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      setDescriptionBlocks(
                        descriptionBlocks.filter((_, i) => i !== index)
                      )
                    }
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                  >
                    <FaTimes />
                  </button>
                )}

                <input
                  type="text"
                  placeholder="Title (e.g. Material, Usage, Care)"
                  value={block.title}
                  onChange={(e) => {
                    const updated = [...descriptionBlocks];
                    updated[index].title = e.target.value;
                    setDescriptionBlocks(updated);
                  }}
                  className="w-full border rounded-md p-2 mb-2 mt-6"
                />

                <div className="border rounded-lg overflow-hidden">
                  <JoditEditor
                    ref={(el) => (editorRefs.current[index] = el)}
                    value={block.detail}
                    config={editorConfig}
                    onBlur={(newContent) => {
                      const updated = [...descriptionBlocks];
                      updated[index].detail = newContent;
                      setDescriptionBlocks(updated);
                    }}
                    onChange={() => {}}
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() =>
                setDescriptionBlocks([
                  ...descriptionBlocks,
                  { title: "", detail: "" },
                ])
              }
              className="flex items-center gap-2 text-orange-600 mt-2 font-medium"
            >
              <FaPlus /> Add Details
            </button>
          </div>

          {/* IMAGES */}
          <div className="mt-4">
            <label className="block text-gray-700 font-medium mb-2">
              Product Images:
            </label>

            <div className="flex flex-wrap gap-4">
              {productImages.map((img, index) => (
                <div
                  key={index}
                  className="relative w-24 h-24 border rounded-lg overflow-hidden"
                >
                  <img
                    src={img.isNew ? URL.createObjectURL(img.file) : img.url}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}

              <label
                htmlFor="upload"
                className="w-24 h-24 flex items-center justify-center border border-dashed cursor-pointer"
              >
                <FaPlus className="text-gray-500" />
                <input
                  id="upload"
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          </div>

          {/* VIDEOS */}
          <div className="mt-6">
            <label className="block text-gray-700 font-medium mb-2">
              Product Videos:
            </label>

            <div className="flex flex-wrap gap-4">
              {productVideos.map((vid, index) => (
                <div
                  key={index}
                  className="relative w-64 h-40 border rounded overflow-hidden"
                >
                  <video
                    src={vid.isNew ? URL.createObjectURL(vid.file) : vid.url}
                    controls
                    className="w-full h-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={() => handleRemoveVideo(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}

              <label className="w-64 h-40 border border-dashed flex items-center justify-center cursor-pointer">
                <FaPlus />
                <input
                  type="file"
                  accept="video/*"
                  multiple
                  hidden
                  onChange={handleVideoUpload}
                />
              </label>
            </div>
          </div>

          {/* EASY RETURN */}
          <div className="mt-6 flex items-center gap-2">
            <img src={returnIcon} alt="" className="w-6 h-6" />
            <span className="font-medium">Easy Return</span>

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

          {/* RETURN DAYS */}
          {easyReturn && (
            <div className="mt-4">
              <label className="font-medium mb-2 block">Return Days:</label>
              <input
                name="returnable"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.returnable}
                className="w-full border p-2 rounded-md"
              />
              {formik.touched.returnable && formik.errors.returnable && (
                <p className="text-red-500 text-sm">
                  {formik.errors.returnable}
                </p>
              )}
            </div>
          )}

          {/* VISIBILITY */}
          <div className="mt-6 flex items-center gap-2">
            <span className="font-medium">Visibility</span>

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

          {/* BUTTONS */}
          <div className="flex justify-center gap-4 mt-8">
            <Button variant={2} text="Cancel" onClick={() => navigate(-1)} />
            <Button variant={1} text="Save Changes" type="submit" />
          </div>
        </form>
      )}

      {/* SUCCESS MODAL */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl text-center">
            <img src={Added} alt="" className="mx-auto w-16" />
            <p className="font-semibold text-lg mt-2">
              Product Updated Successfully
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProduct;