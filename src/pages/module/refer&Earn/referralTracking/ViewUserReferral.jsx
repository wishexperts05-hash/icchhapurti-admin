
import { Box } from "@mui/material";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import { href, useNavigate } from "react-router-dom";
import { useState } from "react";
import useDebounce from "../../../../hooks/debounce/useDebounce";
import DataTable from "../../../../components/uiComponent/DataTable";
import Pagination from "../../../../components/uiComponent/Pagination";

const ViewUserReferral = () => {

    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 500);
    // static dummy data

    const dummyData = [
        { referTo: "Aman Sharma", coinEarned: 50 },
        { referTo: "Priya Singh", coinEarned: 30 },
        { referTo: "Rohit Verma", coinEarned: 70 },
        { referTo: "Neha Patil", coinEarned: 20 }
    ];


    const onPageChange = (newPage) => {
        setPage(newPage);
    };

    const onItemsPerPageChange = (newLimit) => {
        setLimit(newLimit);
        setPage(1);
    };

    const columns = [

        { header: "Refer To", field: "referTo" },
        { header: "Coins Earned", field: "coinEarned" },

    ];
    // Handle Back Button

    const handleBack = () => {
        navigate("/refer-and-earn");
    };
    return (
        <Box>

            <BreadCrumb linkText={[{ text: "Refer & Earn" }, { text: "Referral Tracking", href: "/refer-and-earn" }, { text: "View User Referral" }]} />
            <PagePath2
                title="Referral Tracking"
            />
            {(
                <>
                    <Box>
                        <DataTable
                            columns={columns}
                            data={dummyData}


                        />
                    </Box>
                </>
            )}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
                <button
                    type="button"
                    onClick={handleBack}
                    className="w-full sm:w-64 px-12 py-3 bg-[#CCA547] text-white text-base font-medium rounded-lg
                         hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-[#CCA547] transition-all"
                >
                    Back
                </button>
            </div>

        </Box>

    )
}

export default ViewUserReferral;