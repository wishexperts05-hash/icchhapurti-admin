import { Box } from "@mui/material";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DataTable from "../../../../components/uiComponent/DataTable";
import Button from "../../../../components/uiComponent/Button";
import useReferAndEarn from "../../../../hooks/referAndEarn/useReferAndEarn";
import Pagination from "../../../../components/uiComponent/Pagination";
import LoaderSpinner from "../../../../components/uiComponent/LoaderSpinner";

const ViewUserReferral = () => {
    const { referralTrackingById, loading, fetchReferralTrackingById } = useReferAndEarn();
    const { id } = useParams();
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    useEffect(() => {
        fetchReferralTrackingById(id, page, limit);
    }, [id, page, limit]);

    console.log("referralTrackingById:", referralTrackingById)

    // Parse value from string like "2067 Coins" or "1382 Cash"
    const parseValue = (str) => {
        if (!str) return 0;
        const match = String(str).match(/(\d+(?:\.\d+)?)/);
        return match ? Number(match[1]) : 0;
    };

    // Extract unit from string like "Coins" or "Cash"
    const getUnit = (str) => {
        if (!str) return "Coins";
        const match = String(str).match(/(Coins|Cash)/);
        return match ? match[1] : "Coins";
    };

    // Calculate total from users array
    const calculateTotal = (users) => {
        if (!users || users.length === 0) return { value: 0, unit: "Coins" };
        const total = users.reduce((sum, user) => sum + parseValue(user.earning), 0);
        const unit = users.length > 0 ? getUnit(users[0].earning) : "Coins";
        return { value: total, unit };
    };

    // Format display value
    const formatDisplay = (value, unit) => {
        return `${value} ${unit}`;
    };

    // Get data based on user type
    const getUserData = () => {
        const data = referralTrackingById?.data;
        if (!data) return null;
        
        const users = data.users || [];
        const calculatedTotal = calculateTotal(users);
        
        // Use API's totalEarnings if available, otherwise use calculated total
        const totalEarnings = data.totalEarnings || formatDisplay(calculatedTotal.value, calculatedTotal.unit);
        const unit = getUnit(totalEarnings);
        
        return {
            name: data.name || 'User',
            userType: data.userType || 'User',
            totalEarnings,
            unit,
            users,
            calculatedTotal
        };
    };

    const userData = getUserData();

    const topEarners = (users) => {
        if (!users) return [];
        return [...users].sort((a, b) => parseValue(b.earning) - parseValue(a.earning)).slice(0, 3);
    };

    const onPageChange = (newPage) => {
        setPage(newPage);
    };
    
    const onItemsPerPageChange = (newLimit) => {
        setLimit(newLimit);
        setPage(1);
    };

    // Dynamic columns based on user type
    const getColumns = () => {
        const unit = userData?.unit || "Coins";
        return [
            { header: "Sr. No.", field: "srNo" },
            { header: "Refer To", field: "referTo" },
            { header: `Earned ${unit}`, field: "earning" },
        ];
    };

    const handleBack = () => {
        navigate("/refer-and-earn-user");
    };

    return (
        <Box>
            <BreadCrumb linkText={[{ text: "Refer & Earn" }, { text: "Referral Tracking", href: "/refer-and-earn-user" }, { text:  `View ${userData?.userType} Referral` }]} />
            <PagePath2 title={`View ${userData?.userType} Referral`} />

            {loading ? (
                <Box className="min-h-[300px] flex items-center justify-center">
                    <LoaderSpinner />
                </Box>
            ) : (
                <>
                    <Box className="bg-white shadow-md p-6 mb-4 border-b rounded-2xl">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="flex items-start gap-4">
                                <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 text-2xl font-bold">
                                    {userData?.name?.[0]?.toUpperCase() || "U"}
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">{userData?.name || 'User'}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                            userData?.userType === 'Staff' 
                                                ? 'bg-purple-100 text-purple-800' 
                                                : 'bg-blue-100 text-blue-800'
                                        }`}>
                                            {userData?.userType || 'User'}
                                        </span>
                                        <p className="text-sm text-gray-500">
                                            Total Earnings: <span className="font-medium text-indigo-700">
                                                {userData?.totalEarnings || '0 Coins'}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Box>

                    {/* Quick Stats */}
                    <Box className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 rounded-2xl">
                        <div className="bg-white p-4 rounded-md shadow-sm">
                            <p className="text-sm text-gray-500">Total Referrals</p>
                            <p className="text-2xl font-bold text-gray-900">{userData?.users?.length || 0}</p>
                        </div>
                        <div className="bg-white p-4 rounded-md shadow-sm">
                            <p className="text-sm text-gray-500">Total {userData?.unit || "Coins"}</p>
                            <p className="text-2xl font-bold text-indigo-700">
                                {userData?.calculatedTotal ? 
                                    formatDisplay(userData.calculatedTotal.value, userData.calculatedTotal.unit) 
                                    : '0 Coins'
                                }
                            </p>
                        </div>
                        <div className="bg-white p-4 rounded-md shadow-sm">
                            <p className="text-sm text-gray-500">Top Earner</p>
                            <p className="text-lg font-semibold">{topEarners(userData?.users)[0]?.referTo || 'N/A'}</p>
                            <p className="text-sm text-gray-500">{topEarners(userData?.users)[0]?.earning || ''}</p>
                        </div>
                    </Box>
                    
                    {userData?.users && userData.users.length > 0 && (
                        <>
                            <Box>
                                <DataTable
                                    columns={getColumns()}
                                    data={userData.users}
                                    currentPage={page}
                                    usersPerPage={limit}
                                />
                            </Box>
                            <Pagination
                                currentPage={referralTrackingById?.pagination?.currentPage}
                                totalPages={referralTrackingById?.pagination?.totalPages}
                                totalItems={referralTrackingById?.pagination?.totalRecords}
                                itemsPerPage={referralTrackingById?.pagination?.limit}
                                onPageChange={onPageChange}
                                onItemsPerPageChange={onItemsPerPageChange}
                            />
                        </>
                    )}
                </>
            )}

            {/* Buttons */}
            <div className="bg-white flex flex-col sm:flex-row justify-center gap-4 mt-4 rounded-2xl">
                <div className="flex justify-center gap-8 mt-8 mb-8 ">
                    <Button text="Back" variant={2} onClick={handleBack} />
                </div>
            </div>
        </Box>
    )
}

export default ViewUserReferral;