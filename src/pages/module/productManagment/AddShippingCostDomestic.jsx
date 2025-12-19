import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../components/uiComponent/PagePath2";
import { Select } from "@mui/material";
import useProductManagement from "../../../hooks/productList/useProductManagment";
import { toast } from "react-toastify";
import useDropdown from "../../../hooks/dropdown/useDropdown";

// 🔹 Validation Schema
const validationSchema = Yup.object({
  type: Yup.string().required("Required"),
  zone: Yup.string().required("Required"),
  cost: Yup.number().required("Required"),
});

const AddShippingCost = () => {
  const navigate = useNavigate();
  const { addDomesticShippingRate } = useProductManagement();
  const { fetchAllRegion, region, loadingRrgion } = useDropdown();

  useEffect(() => {
    fetchAllRegion();
  }, []);

  console.log("region", region);
  // 🔹 Formik Setup
  const formik = useFormik({
    initialValues: {
      type: "Domestic",
      zone: "",
      cost: "",
    },

    validationSchema,
    onSubmit: async (values) => {
      const payload = {
        region: values.zone,
        shippingCost: Number(values.cost.replace("₹", "").trim()),
      };

      const res = await addDomesticShippingRate(payload);

      if (res?.success) {
        toast.success("Domestic Shipping Cost Added Successfully!");
        navigate("/product-management/shipping-cost");
      } else {
        toast.error(res?.message || "Failed to add shipping cost");
      }
    },
  });

  return (
    <div>
      {/* Breadcrumb */}
      <BreadCrumb
        linkText={[
          { text: "Product Management", href: "/product-management" },
          {
            text: "Manage Shipping Cost",
            href: "/product-management/shipping-cost",
          },

          {
            text: "Add Shipping Cost",
            href: "/product-management/shipping-cost/add-shipping-cost",
          },
        ]}
      />

      {/* Page Title */}
      <PagePath2 title="Add Shipping Cost" />

      <form
        onSubmit={formik.handleSubmit}
        className="mt-6 bg-white p-6 rounded shadow"
      >
        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Domestic/International */}
          <div>
            <label className="block font-medium mb-2">International :</label>
            <input
              type="text"
              value="International"
              readOnly
              className="w-full border rounded-md px-3 py-2 bg-gray-100"
            />
          </div>

          {/* Select Zone */}
          <div>
            <label className="block font-medium mb-2">Select Region :</label>
            <select
              name="zone"
              value={formik.values.zone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full border rounded-md px-3 py-2"
            >

              {region?.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>

            {formik.touched.zone && formik.errors.zone && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.zone}</p>
            )}
          </div>

          {/* Product Category */}
          {/* <div>
            <label className="block font-medium mb-2">Product Category :</label>
            <select
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full border rounded-md px-3 py-2"
            >
              <option value="Pen">Pen</option>
              <option value="Pencil">Pencil</option>
              <option value="Notebook">Notebook</option>
              <option value="Marker">Marker</option>
            </select>
            {formik.touched.category && formik.errors.category && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.category}</p>
            )}
          </div> */}

          {/* Shipping Cost */}
          <div>
            <label className="block font-medium mb-2">Shipping Cost :</label>
            <input
              type="text"
              name="cost"
              placeholder="₹ 10"
              value={formik.values.cost}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full border rounded-md px-3 py-2"
            />
            {formik.touched.cost && formik.errors.cost && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.cost}</p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center  gap-4 mt-12">
          <button
            type="button"
            onClick={() => navigate("/product-management/shipping-cost")}
            className="border border-yellow-600 text-yellow-600 px-10 py-2 rounded-md hover:bg-yellow-50 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-yellow-600 text-white px-10 py-2 rounded-md hover:bg-yellow-700 transition"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddShippingCost;
