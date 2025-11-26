import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../components/uiComponent/PagePath2";
import useProductManagement from "../../../hooks/productList/useProductManagment";

const validationSchema = Yup.object({
  type: Yup.string().required("Required"),
  country: Yup.string().required("Required"),
  currency: Yup.string().required("Required"),
  cost: Yup.string().required("Required"),
});

const AddShippingCostInternational = () => {
  const navigate = useNavigate();

  const { fetchCountries, countries,addInternationalShippingRate  } = useProductManagement();

  
const formik = useFormik({
  initialValues: {
    type: "International",
    country: "",
    currency: "",
    cost: "",
  },
  validationSchema,
  onSubmit: async (values) => {

    const payload = {
      country: values.country,
      shippingCost: values.cost,
      currency: values.currency,
    };

    const res = await addInternationalShippingRate(payload);

    if (res?.success) {
      toast.success("International Shipping Cost Added Successfully!");
      navigate("/product-management/shipping-cost");
    } else {
      toast.error(res?.message || "Failed to add shipping cost");
    }
  },
});

  useEffect(() => {
    fetchCountries();
  }, []);
  console.log(countries);

  // Auto-fill currency when country changes
  const handleCountryChange = (e) => {
    const selected = e.target.value;
    formik.setFieldValue("country", selected);

    const countryObj = countries.find((c) => c.name === selected);
    if (countryObj) {
      formik.setFieldValue("currency", countryObj.defaultCurrency);
    }
  };

  return (
    <div>
      <BreadCrumb
        linkText={[
          { text: "Product Management", href: "/product-management" },
          { text: "Manage Shipping Cost", href: "/product-management/shipping-cost" },
          { text: "Add Shipping Cost" },
        ]}
      />

      <PagePath2 title="Add Shipping Cost" />

      <form onSubmit={formik.handleSubmit} className="mt-6 bg-white p-6 rounded shadow">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Type */}
          <div>
            <label className="block font-medium mb-2">Domestic/International :</label>
            <input
              type="text"
              value="International"
              readOnly
              className="w-full border rounded-md px-3 py-2 bg-gray-100"
            />
          </div>

          {/* Country */}
          <div>
            <label className="block font-medium mb-2">Select Country :</label>
            <select
              name="country"
              value={formik.values.country}
              onChange={handleCountryChange}
              className="w-full border rounded-md px-3 py-2"
            >
              <option value="">Select Country</option>
              {countries?.map((item) => (
                <option key={item._id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* Currency */}
          <div>
            <label className="block font-medium mb-2">Currency :</label>
            <input
              type="text"
              name="currency"
              value={formik.values.currency}
              readOnly
              className="w-full border rounded-md px-3 py-2 bg-gray-100"
            />
          </div>

          {/* Shipping Cost */}
          <div>
            <label className="block font-medium mb-2">Shipping Cost :</label>
            <input
              type="text"
              name="cost"
              placeholder="Enter cost"
              value={formik.values.cost}
              onChange={formik.handleChange}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

        </div>

        <div className="flex justify-center gap-4 mt-12">
          <button
            type="button"
            onClick={() => navigate("/product-management/shipping-cost")}
            className="border border-yellow-600 text-yellow-600 px-10 py-2 rounded-md"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-yellow-600 text-white px-10 py-2 rounded-md"
          >
            Add
          </button>
        </div>

      </form>
    </div>
  );
};

export default AddShippingCostInternational;
