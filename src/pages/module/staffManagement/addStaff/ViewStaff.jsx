import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import DetailsField from "../../../../components/uiComponent/DetailsField";
import { LuWallet } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa6";
import { MdAccountBalance } from "react-icons/md";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import Button from '../../../../components/uiComponent/Button';
import useStaffManagement from '../../../../hooks/staffManagement/useStaffManagement';
import DataTable from '../../../../components/uiComponent/DataTable';
import Pagination from '../../../../components/uiComponent/Pagination';

const ViewStaff = () => {
    const { loading, staffDetail, fetchStaffDetails, } = useStaffManagement();
    const navigate = useNavigate();
    const [status, setStatus] = useState("");
    const { id } = useParams();

    console.log("staffDetail:", staffDetail);

    const handleBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        if (id) {
            fetchStaffDetails(id);
        }
    }, [id]);

    const columns = [
        { header: "Sr.No.", field: "srNo" },
        { header: "User Name", field: "name" },
        { header: "Phone No.", field: "phoneNumber" },
        { header: "Email", field: "email" },
        { header: "Referrer", field: "referrer" },
        { header: "Status", field: "isActive" },
        { header: "Action", field: "action" },
    ];

    const onChangeSelectFunc = (option) => {
        setStatus(option ? option.value : "");
        setPage(1);
    };
    return (
        <div className="">
            <div className="max-w-6xl mx-auto">
                {/* Breadcrumb */}
                <BreadCrumb
                    linkText={[
                        { text: "Staff Management", href: "/staff-management" },
                        { text: "View Staff" },
                    ]}
                />

                {/* Page Title */}
                <PagePath2
                    title="Staff Details"
                />

                {/* Staff Profile Card */}
                <div className="bg-white rounded-lg p-8 mb-8">
                    <div className="flex items-center gap-6">
                        <img
                            src={staffDetail?.staff?.profileImage}
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
                        />
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-1">{staffDetail?.staff?.name}</h2>
                            <p className="text-gray-600 text-base">{staffDetail?.staff?.address || "-"}</p>
                        </div>
                        <div>
                            <p className={`px-3 py-1 rounded-full text-white font-semibold ${staffDetail?.staff?.isActive ? 'bg-green-500' : 'bg-red-500'}`}>
                                {staffDetail?.staff?.isActive ? 'Active' : 'Inactive'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* User Information Card */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                    <div className="bg-white px-6 py-4 border-b border-gray-300">
                        <div className="flex items-center gap-3">
                            <FaRegUser className="w-5 h-5 text-gray-800" />
                            <h3 className="text-lg font-bold text-gray-900">User Information</h3>
                        </div>
                    </div>

                    <div className="p-8 bg-white">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <DetailsField
                                label="Name"
                                value={staffDetail?.staff?.name}
                            />

                            <DetailsField
                                label="E-Mail Id"
                                value={staffDetail?.staff?.email}
                                type="email"
                            />

                            <DetailsField
                                label="Phone Number"
                                value={staffDetail?.staff?.phoneNumber}
                                type="tel"
                            />

                            <DetailsField
                                label="DOB"
                                value={staffDetail?.staff?.dob}
                            />

                            <DetailsField
                                label="Address"
                                value={staffDetail?.staff?.address || "-"}
                                className="md:col-span-2"
                            />

                            <DetailsField
                                label="Referral Name"
                                value={staffDetail?.staff?.referralCodeUsed || "-"}
                            />
                        </div>
                    </div>
                </div>

                {/* Account Information Card */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-300 mt-8">
                    <div className="bg-white px-6 py-4 border-b border-gray-300">
                        <div className="flex items-center gap-3">
                            <MdAccountBalance className="w-5 h-5 text-gray-800" />
                            <h3 className="text-lg font-bold text-gray-900">Account Information</h3>
                        </div>
                    </div>

                    <div className="p-8 bg-white">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <DetailsField
                                label="Bank Name"
                                value={staffDetail?.staff?.bankDetails?.bankName || "-"}
                            />

                            <DetailsField
                                label="Bank Account Number"
                                value={staffDetail?.staff?.bankDetails?.accountNumber || "-"}
                            />

                            <DetailsField
                                label="IFSC Code"
                                value={staffDetail?.staff?.bankDetails?.ifscCode || "-"}
                            />

                            <DetailsField
                                label="Account Holder Name"
                                value={staffDetail?.staff?.bankDetails?.accountHolderName || "-"}
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 mt-8">
                    <div className="bg-white px-6 py-4 border-b border-gray-300">
                        <div className="flex items-center gap-3">
                            <LuWallet className="w-5 h-5 text-gray-800" />
                            <h3 className="text-lg font-bold text-gray-900">Wallet</h3>
                        </div>
                    </div>

                    <div className="p-8 bg-white">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <DetailsField
                                label="Current Wallet Balance"
                                value={staffDetail?.wallet?.balance}
                                type="number"
                            />

                            <DetailsField
                                label="Coins"
                                value={staffDetail?.wallet?.coins}
                            // type="number"
                            />
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center gap-8 mt-8 mb-8 ">
                    <Button
                        text="Back"
                        variant={1}
                        onClick={handleBack}
                    />

                </div>

                <PagePath2
                    title="Direct Sales"
                    showSelect
                    searchTerm={searchTerm}
                    options={"guestsStatusTypes"}
                    // optionsLoading={dropdownLoading}
                    onChangeSelectFunc={onChangeSelectFunc}
                />
                <div class="mt-6 bg-white p-4 rounded shadow">
                    <DataTable
                        columns={columns}
                        data={[]}
                        currentPage={userList?.currentPage}
                        usersPerPage={limit}
                        actions={actions.map((action) => ({
                            ...action,
                            label:
                                typeof action.label === "function"
                                    ? undefined
                                    : action.label,
                            onClick: action.onClick,
                        }))}
                    />
                </div>

                {/* Pagination */}
                <Pagination
                    currentPage={userList?.currentPage}
                    totalPages={userList?.totalPages}
                    totalItems={userList?.totalUser}
                    itemsPerPage={limit}
                    onPageChange={onPageChange}
                    onItemsPerPageChange={onItemsPerPageChange}
                />
                <PagePath2
                    title="Indirect Sales"
                    showSelect
                    searchTerm={searchTerm}
                    options={"guestsStatusTypes"}
                    // optionsLoading={dropdownLoading}
                    onChangeSelectFunc={onChangeSelectFunc}
                />

                <div class="mt-6 bg-white p-4 rounded shadow">
                    <DataTable
                        columns={columns}
                        data={userList?.userList || []}
                        currentPage={userList?.currentPage}
                        usersPerPage={limit}
                        actions={actions.map((action) => ({
                            ...action,
                            label:
                                typeof action.label === "function"
                                    ? undefined
                                    : action.label,
                            onClick: action.onClick,
                        }))}
                    />
                </div>

                {/* Pagination */}
                <Pagination
                    currentPage={userList?.currentPage}
                    totalPages={userList?.totalPages}
                    totalItems={userList?.totalUser}
                    itemsPerPage={limit}
                    onPageChange={onPageChange}
                    onItemsPerPageChange={onItemsPerPageChange}
                />

            </div>
        </div>
    )
}

export default ViewStaff