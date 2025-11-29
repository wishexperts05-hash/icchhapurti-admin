import { Box } from "@mui/material";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import { useNavigate } from "react-router-dom";

const UploadVideo = () => {
    const navigate = useNavigate();
    const handleDelete = () => {
        alert("Deleted successfully")
    };
    const handleEdit = () => {
        navigate("/edit-video")
    };
    return (
        <Box>
            <BreadCrumb linkText={[{ text: "Refer & Earn" }, { text: "Upload Video" }]} />
            <PagePath2
                title="Upload Video"

            />
            <div className="bg-white p-4 mb-4 border-b rounded-xl shadow-md">
                  <div>Space for video</div>
                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="w-full sm:w-64 px-12 py-3 border border-[#de3d34] text-[#e4562b] text-base font-medium rounded-lg
                         hover:bg-yellow-50 focus:outline-none focus:ring-1 focus:ring-[#e47263] transition-all"
                    >
                        Delete
                    </button>
                    <button
                        type="button"
                        onClick={handleEdit}
                        className="w-full sm:w-64 px-12 py-3 bg-[#CCA547] text-white text-base font-medium rounded-lg
                         hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-[#CCA547] transition-all"
                    >
                        Edit
                    </button>
                </div>

            </div>
        </Box>
    )
}

export default UploadVideo;