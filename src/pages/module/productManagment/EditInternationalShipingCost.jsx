import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../components/uiComponent/PagePath2";
import useProductManagement from "../../../hooks/productList/useProductManagment";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
  cost: Yup.string().required("Required"),
});

const EditInternationalShippingCost = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    fetchInternationalShippingRateById,
    updateInternationalShippingRate,
  } = useProductManagement();

  const formik = useFormik({
    initialValues: {
      type: "International",
      country: "",
      category: "",
      currency: "",
      cost: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log("Submitting:", values);

      const payload = { shippingCost: values.cost }; // string
      const res = await updateInternationalShippingRate(id, payload);

      console.log("API response:", res);

      if (res && res.item) {
        // <-- change from res.success
        toast.success("International shipping rate updated successfully");
        navigate("/product-management/shipping-cost");
      } else {
        toast.error(res?.message || "Update failed");
      }
    },
  });

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchInternationalShippingRateById(id);

      if (data) {
        formik.setValues({
          type: "International",
          country: data.country,
          category: data.category,
          currency: data.currency,
          cost: data.shippingCost?.toString() || "",
        });
      }
    };

    loadData();
  }, [id]);

  return (
    <div>
      <BreadCrumb
        linkText={[
          { text: "Product Management", href: "/product-management" },
          {
            text: "Manage Shipping Cost",
            href: "/product-management/shipping-cost",
          },
          { text: "Edit International Shipping Cost" },
        ]}
      />

      <PagePath2 title="Edit International Shipping Cost" />

      <form
        onSubmit={formik.handleSubmit}
        className="mt-6 bg-white p-6 rounded shadow"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-2">Type :</label>
            <input
              value="International"
              readOnly
              className="w-full border rounded-md px-3 py-2 bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Country :</label>
            <input
              name="country"
              value={formik.values.country}
              readOnly
              className="w-full border rounded-md px-3 py-2 bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Currency :</label>
            <input
              name="currency"
              value={formik.values.currency}
              readOnly
              className="w-full border rounded-md px-3 py-2 bg-gray-100 cursor-not-allowed"
            />
          </div>

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
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-12">
          <button
            type="button"
            onClick={() => navigate("/product-management/shipping-cost")}
            className="border border-yellow-600 text-yellow-600 px-10 py-2 rounded-md hover:bg-yellow-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-yellow-600 text-white px-10 py-2 rounded-md hover:bg-yellow-700"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditInternationalShippingCost;
