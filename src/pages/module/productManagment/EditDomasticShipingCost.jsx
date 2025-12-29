import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../components/uiComponent/PagePath2";
import useProductManagement from "../../../hooks/productList/useProductManagment";
import { toast } from "react-toastify";

// Validation Schema
const validationSchema = Yup.object({
  cost: Yup.string().required("Required"),
});

const EditDomesticShippingCost = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { fetchDomesticShippingRateById, updateDomesticShippingRate } =
    useProductManagement();

  // -----------------------------
  // Formik Setup
  // -----------------------------
  const formik = useFormik({
    initialValues: {
      type: "Domestic",
      country: "",
      category: "",
      currency: "",
      cost: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const payload = {
        shippingCost: values.cost.toString(), // keep string as API expects
      };

      const res = await updateDomesticShippingRate(id, payload);

      if (res?.success) {
        toast.success("Domestic shipping rate updated successfully");
        navigate("/product-management/shipping-cost");
      } else {
        toast.error(res?.message || "Failed to update shipping rate");
      }
    },
  });

  // -----------------------------
  // Load Shipping Data
  // -----------------------------
  useEffect(() => {
    const loadShippingData = async () => {
      const data = await fetchDomesticShippingRateById(id);
      

      if (data) {
        formik.setValues({
          type:"Domestic",
          country: data.region || "",
          category: data.category || "",
          currency: data.currency || "",
          cost: data.shippingCost?.toString() || "",
        });
      }
    };

    loadShippingData();
  }, [id]);

  return (
    <div>
      <BreadCrumb
        linkText={[
          { text: "Product Management", href: "/product-management" },
          { text: "Manage Shipping Cost", href: "/product-management/shipping-cost" },
          { text: "Edit Domestic Shipping Cost" },
        ]}
      />

      <PagePath2 title="Edit Domestic Shipping Cost" />

      <form
        onSubmit={formik.handleSubmit}
        className="mt-6 bg-white p-6 rounded shadow"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Type */}
          <div>
            <label className="block font-medium mb-2">Type :</label>
            <input
              value="Domestic"
              readOnly
              className="w-full border rounded-md px-3 py-2 bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Country */}
          <div>
            <label className="block font-medium mb-2">Region :</label>
            <input
              name="country"
              value={formik.values.country}
              readOnly
              className="w-full border rounded-md px-3 py-2 bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Currency */}
          <div>
            <label className="block font-medium mb-2">Currency :</label>
            <input
              name="currency"
              value={formik.values.currency}
              readOnly
              className="w-full border rounded-md px-3 py-2 bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Shipping Cost */}
          <div>
            <label className="block font-medium mb-2">Shipping Cost :</label>
            <input
              type="text"
              name="cost"
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
        <div className="flex justify-center gap-4 mt-12">
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
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditDomesticShippingCost;
