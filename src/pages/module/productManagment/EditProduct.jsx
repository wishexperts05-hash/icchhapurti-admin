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
      price: productDetail?.product?.price || "",
      returnable: productDetail?.product?.returnableDays || "",
      // description: productDetail?.product?.description || "",
      descriptions: productDetail?.product?.productDetails?.length
        ? productDetail.product.productDetails
        : [{ title: "", detail: "" }],
    },

    validationSchema: Yup.object({
      category: Yup.string().required("Category is required"),
      name: Yup.string().required("Product name is required"),
      price: Yup.number()
        .typeError("Price must be a number")
        .positive("Price must be positive")
        .required("Price is required"),
      // description: Yup.string().required("Description is required"),
      returnable: Yup.string().required("Return days are required"),
    }),

    onSubmit: async (values) => {
      const formData = new FormData();

      formData.append("category", values.category);
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("returnableDays", values.returnable);

      // ✅ FIXED DESCRIPTION
      formData.append("productDetails", JSON.stringify(descriptionBlocks));

      formData.append("easyReturn", easyReturn);
      formData.append("visible", visible);

      // NEW images
      productImages.forEach((img) => {
        if (img.isNew) {
          formData.append("images", img.file);
        }
      });

      // Deleted images
      formData.append("imagesToDelete", JSON.stringify(imagesToDelete));

      // NEW videos
      productVideos.forEach((vid) => {
        if (vid.isNew) {
          formData.append("videos", vid.file);
        }
      });

      // Deleted videos
      formData.append("videosToDelete", JSON.stringify(videosToDelete));

      await updateProduct(id, formData);
    },
  });

  // Convert backend URLs into preview + store existing images
  // useEffect(() => {
  //   if (productDetail?.product) {
  //     setProductImages(productDetail.product.images || []);
  //     setEasyReturn(productDetail.product.returnable);
  //     setVisible(productDetail.product.isActive);
  //   }
  // }, [productDetail]);

  useEffect(() => {
    if (productDetail?.product) {
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
    }
  }, [productDetail]);

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
            {/* Category */}
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

            {/* Name */}
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

          {/* PRICE */}
          <div className="mt-4">
            <label className="block text-gray-700 font-medium mb-2">
              Price:
            </label>
            <input
              name="price"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.price}
              className="w-full border p-2 rounded-md"
            />
            {formik.touched.price && formik.errors.price && (
              <p className="text-red-500 text-sm">{formik.errors.price}</p>
            )}
          </div>

          {/* DESCRIPTION */}
          {/* <div className="mt-4">
            <label className="block text-gray-700 font-medium mb-2">
              Description:
            </label>
            <textarea
              name="description"
              rows="3"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              className="w-full border p-2 rounded-md"
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-red-500 text-sm">
                {formik.errors.description}
              </p>
            )}
          </div> */}
          {/* DESCRIPTION PREVIEW */}
          {/* {parsedDescription.length > 0 && (
  <div className="mt-4 border rounded p-3 bg-gray-50">
    <p className="font-semibold mb-2">Description Preview:</p>

    {parsedDescription.map((item, idx) => (
      <div key={idx} className="mb-3">
        <h4 className="font-medium">{item.title}</h4>
        <div
          className="text-sm"
          dangerouslySetInnerHTML={{ __html: item.content }}
        />
      </div>
    ))}
  </div>
)} */}

          <div className="mt-4">
            <label className="block text-gray-700 font-medium mb-2">
              Description:
            </label>

            {descriptionBlocks.map((block, index) => (
              <div key={index} className="relative border rounded-lg p-4 mb-3">
                {/* ❌ Remove Button (TOP LEFT) */}
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

                {/* Title */}
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

                {/* JODIT EDITOR */}
                <div className="border rounded-lg overflow-hidden">
                  <JoditEditor
                    ref={(el) => (editorRefs.current[index] = el)}
                    value={block.detail}
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

            {/* Add new block */}
            <button
              type="button"
              onClick={() =>
                setDescriptionBlocks([
                  ...descriptionBlocks,
                  { title: "", content: "" },
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

              {/* Upload */}
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
              <div
                className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-500 rounded-full peer peer-checked:bg-green-500 
      after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border 
      after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"
              />
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
              <div
                className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-500 rounded-full peer peer-checked:bg-green-500 
      after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border 
      after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"
              />
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
