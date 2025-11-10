import { IoArrowBackCircleOutline } from "react-icons/io5";
import {  useParams } from "react-router-dom";
import {  useEffect } from "react";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import FormField from "../../../../components/uiComponent/FormField";
import { Form, Formik } from "formik";
import useTiffinRestraunt from "../../../../hooks/userManagement/useTiffinRestraunt";
import LoaderSpinner from "../../../../components/uiComponent/LoaderSpinner";


function EditRestaurantProviders() {

  const { id } = useParams();
  const { fetchTiffinRestrauntDetailById, tiffinRestrauntDetail, loading } =
    useTiffinRestraunt();


  useEffect(() => {
    if (id) {
      fetchTiffinRestrauntDetailById(id);
    }
  }, [id]);

  // find user first
  // const user = restaurantProviders.find((u) => u.id === parseInt(id));

  // define states safely (only if user exists)
  // const [profile, setProfile] = useState(user?.profile || "");
  // const [name, setName] = useState(user?.name || "");
  // const [phone, setPhone] = useState(user?.phone || "");
  // const [email, setEmail] = useState(user?.email || "");
  // const [dob] = useState(user?.dob || ""); // not editable → remove setter
  // const [address, setAddress] = useState(user?.address || "");
  // const [status] = useState(user?.status || "Active"); // not editable → remove setter
  // const [aadhaar] = useState(user?.aadhaar || ""); // not editable → remove setter
  // const [password, setPassword] = useState(user?.password || "");
  // const [accountNumber, setAccountNumber] = useState(user?.accountNumber || "");
  // const [ifscCode, setIfscCode] = useState(user?.ifscCode || "");
  // const [accountType, setAccountType] = useState(user?.accountType || "");
  // const [accountHolderName, setAccountHolderName] = useState(
  //   user?.accountHolderName || ""
  // );





  return (
    <div className="flex flex-col gap-1 font-inter">
      <BreadCrumb
        linkText={[
          { text: "User Management" },
          {
            text: "Tiffin/Restaurant Provider",
            href: "/tiffin-restaurant-provider",
          },
          { text: "Edit Tiffin/Restaurant Provider" },
        ]}
      />

      <PagePath2 title="Edit Tiffin/Restaurant Provider" />

              {loading ? (
          <div className="flex items-center justify-center">
            <LoaderSpinner />
          </div>
        ) : (

      <div className="w-full min-h-[600px] p-6 rounded-[8px] bg-white shadow flex flex-col gap-6 border border-[#A5A5A5]">
        <Formik
          initialValues={{
            name: tiffinRestrauntDetail?.data?.name||"",
            phoneNumber:tiffinRestrauntDetail?.data?.phoneNumber|| "",
            email: tiffinRestrauntDetail?.data?.email|| "",
            dob: "",
            address: tiffinRestrauntDetail?.data?.addressDetails.address|| "",
            street: tiffinRestrauntDetail?.data?.addressDetails.street|| "",
            postalCode: tiffinRestrauntDetail?.data?.addressDetails.postalCode|| "",
            password:tiffinRestrauntDetail?.data?.password|| "",
            accountNumber:tiffinRestrauntDetail?.data?.bankDetails.accountNumber|| "",
            ifscCode: tiffinRestrauntDetail?.data?.bankDetails.ifscCode|| "",
            accountType:  tiffinRestrauntDetail?.data?.bankDetails.accountType|| "",
            accountHolderName: tiffinRestrauntDetail?.data?.bankDetails.accountHolderName|| "",
          }}
          enableReinitialize
          // onSubmit={handleCreate}
        >
          <Form>
            <div className="text-gray-700 text-xl flex items-center gap-3 font-semibold mb-6">
              <svg
                width="19"
                height="18"
                viewBox="0 0 19 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.5 1.5C7.11807 1.5 7.72225 1.68328 8.23616 2.02666C8.75006 2.37004 9.1506 2.8581 9.38712 3.42911C9.62365 4.00013 9.68553 4.62847 9.56495 5.23466C9.44438 5.84085 9.14675 6.39767 8.70971 6.83471C8.27267 7.27175 7.71585 7.56938 7.10966 7.68995C6.50347 7.81053 5.87513 7.74865 5.30411 7.51212C4.7331 7.2756 4.24504 6.87506 3.90166 6.36116C3.55828 5.84725 3.375 5.24307 3.375 4.625C3.375 3.7962 3.70424 3.00134 4.29029 2.41529C4.87634 1.82924 5.6712 1.5 6.5 1.5ZM6.5 0.25C5.63471 0.25 4.78885 0.506589 4.06938 0.98732C3.34992 1.46805 2.78916 2.15133 2.45803 2.95076C2.12689 3.75019 2.04025 4.62985 2.20906 5.47852C2.37787 6.32719 2.79455 7.10674 3.40641 7.71859C4.01826 8.33045 4.79781 8.74712 5.64648 8.91594C6.49515 9.08475 7.37481 8.99811 8.17424 8.66697C8.97367 8.33584 9.65695 7.77508 10.1377 7.05562C10.6184 6.33615 10.875 5.49029 10.875 4.625C10.875 3.46468 10.4141 2.35188 9.59359 1.53141C8.77312 0.710936 7.66032 0.25 6.5 0.25ZM12.75 17.75H11.5V14.625C11.5 13.7962 11.1708 13.0013 10.5847 12.4153C9.99866 11.8292 9.2038 11.5 8.375 11.5H4.625C3.7962 11.5 3.00134 11.8292 2.41529 12.4153C1.82924 13.0013 1.5 13.7962 1.5 14.625V17.75H0.25V14.625C0.25 13.4647 0.710936 12.3519 1.53141 11.5314C2.35188 10.7109 3.46468 10.25 4.625 10.25H8.375C9.53532 10.25 10.6481 10.7109 11.4686 11.5314C12.2891 12.3519 12.75 13.4647 12.75 14.625V17.75ZM12.75 1.5H19V2.75H12.75V1.5ZM12.75 4.625H19V5.875H12.75V4.625ZM12.75 7.75H17.125V9H12.75V7.75Z"
                  fill="#0A051F"
                />
              </svg>
              <span>Basic Information</span>
            </div>
            <div className="flex gap-4">
              <FormField
                label="Name"
                name="name"
                type="text"
                placeholder="Enter your name"
              />
            </div>

            <div className="flex gap-4">
              <FormField
                label="Phone Number"
                name="phoneNumber"
                type="text"
                placeholder="Enter your phone number"
              />
              <FormField
                label="Email id"
                name="email"
                type="email"
                placeholder="Enter your email"
              />
            </div>
            <div className="flex gap-4">
              <FormField
                label="Password"
                name="password"
                type="text"
                placeholder="Enter password"
              />
              <FormField
                label="Address"
                name="address"
                type="number"
                placeholder="Enter your address"
              />
            </div>
            <div className="flex gap-4">
              <FormField
                label="Street"
                name="street"
                type="text"
                placeholder="Enter street"
              />
              <FormField
                label="Postal Code"
                name="postalCode"
                type="number"
                placeholder="Enter postal code"
              />
            </div>

            <div className="text-gray-700 text-xl flex items-center gap-3 font-semibold mb-6">
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
                  stroke-width="1.67"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span>Bank Details</span>
            </div>

            <div className="flex gap-4">
              <FormField
                label="Account Number"
                name="accountNumber"
                type="text"
                placeholder="Enter account number"
              />
              <FormField
                label="IFSC Code"
                name="ifscCode"
                type="number"
                placeholder="Enter IFSC code"
              />
            </div>
            <div className="flex gap-4">
              <FormField
                label="Account Type"
                name="accountType"
                type="text"
                placeholder="Enter account type"
              />
              <FormField
                label="Account Holder Name"
                name="accountHolderName"
                type="number"
                placeholder="Enter account holder name"
              />
            </div>

            <div className="flex gap-4 justify-center items-center mt-6">
              <button
                type="submit"
                className="w-[200px] h-[40px] bg-[#004AAD] rounded-[8px] text-white"
              >
                Create
              </button>
            </div>
          </Form>
        </Formik>
      </div>
        )}
    </div>
  );
}

export default EditRestaurantProviders;
