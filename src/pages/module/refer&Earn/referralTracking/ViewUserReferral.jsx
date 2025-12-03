import { Box } from "@mui/material";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import { href, useNavigate } from "react-router-dom";
import { useState } from "react";
import useDebounce from "../../../../hooks/debounce/useDebounce";
import DataTable from "../../../../components/uiComponent/DataTable";
import Button from "../../../../components/uiComponent/Button";

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
        navigate("/refer-and-earn-user");
    };
    
    return (
        <Box>
            <BreadCrumb linkText={[{ text: "Refer & Earn" }, { text: "Referral Tracking", href: "/refer-and-earn-user" }, { text: "View User Referral" }]} />
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
                <div className="flex justify-center gap-8 mt-8 mb-8 ">
                    <Button text="Back" variant={1} onClick={handleBack} />
                </div>
            </div>
        </Box>
    )
}

export default ViewUserReferral;