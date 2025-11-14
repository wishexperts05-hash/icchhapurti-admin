import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
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
  const [easyReturn, setEasyReturn] = useState(true);
  const [visible, setVisible] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const { updateProduct, fetchProductDetailById, productDetail ,loading} =
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
      description: productDetail?.product?.description || "",
      returnable: productDetail?.product?.returnable || "N/A",
    },

    validationSchema: Yup.object({
      category: Yup.string().required("Category is required"),
      name: Yup.string().required("Product name is required"),
      price: Yup.number()
        .typeError("Price must be a number")
        .positive("Price must be positive")
        .required("Price is required"),
      description: Yup.string().required("Description is required"),
      returnable: Yup.string()
        .required("Return days are required"),
    }),

    onSubmit: async (values) => {
      const formData = new FormData();

      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

      formData.append("easyReturn", easyReturn);
      formData.append("visible", visible);

      // Append uploaded images (File objects)
      productImages.forEach((file) => {
        formData.append("images", file);
      });

      await updateProduct(id, formData);
      // setShowSuccessModal(true);

      // setTimeout(() => {
      //   setShowSuccessModal(false);
      //   navigate("/product-management");
      // }, 2000);
    },
  });

  // Convert backend URLs into preview + store existing images
 useEffect(() => {
  if (productDetail?.product) {
    const backendImages = productDetail.product.images?.map(img => img.url) || [];
    setProductImages(backendImages);

    setEasyReturn(productDetail.product.returnable);
    setVisible(productDetail.product.isActive);
  }
}, [productDetail]);


  // Image Upload Handler
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setProductImages((prev) => [...prev, ...files]);
  };

  // Remove Image
  const handleRemoveImage = (index) => {
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
          <label className="block text-gray-700 font-medium mb-2">Price:</label>
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
        <div className="mt-4">
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
            <p className="text-red-500 text-sm">{formik.errors.description}</p>
          )}
        </div>

        {/* IMAGES */}
        <div className="mt-4">
          <label className="block text-gray-700 font-medium mb-2">
            Product Images:
          </label>

          <div className="flex flex-wrap gap-4">
  {productImages.map((img, index) => (
    <div key={index} className="relative w-24 h-24 border rounded-lg overflow-hidden">
      <img
        src={img instanceof File ? URL.createObjectURL(img) : img}
        alt="product"
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

        {/* EASY RETURN */}
        <div className="mt-6 flex items-center gap-2">
          <img src={returnIcon} alt="" className="w-6" />
          <span className="font-medium">Easy Return</span>
          <input
            type="checkbox"
            checked={easyReturn}
            onChange={() => setEasyReturn(!easyReturn)}
          />
        </div>

        {/* RETURN DAYS */}
        <div className="mt-4">
          <label className="font-medium mb-2 block">Return Days:</label>
          <input
            name="returnable"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.returnable}
            className="w-full border p-2 rounded-md"
          />
        </div>

        {/* VISIBILITY */}
        <div className="mt-6 flex items-center gap-2">
          <span className="font-medium">Visible</span>
          <input
            type="checkbox"
            checked={visible}
            onChange={() => setVisible(!visible)}
          />
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
