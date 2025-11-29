import { Box } from "@mui/material";
import { useState } from "react";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import { href, useNavigate } from "react-router-dom";

const EditVideo = () => {
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = () => {
        console.log("Selected File:", file);
    };

    const handleCancel=()=>{
        navigate("/upload-video")
    }

    const handleSave=()=>{
        alert("Saved");
    }
    return (
        <>
            <Box>
                <BreadCrumb linkText={[{ text: "Refer & Earn" },{ text: "Edit Video" }]} />
                <PagePath2
                    title="Upload Video"

                />

                <div className="bg-white p-4 mb-4 border-b rounded-xl shadow-md">
                    <div>
                        <input type="file" onChange={handleFileChange} />
                    </div>
                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="w-full sm:w-64 px-12 py-3 border border-[#de3d34] text-[#e4562b] text-base font-medium rounded-lg
                         hover:bg-yellow-50 focus:outline-none focus:ring-1 focus:ring-[#e47263] transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSave}
                            className="w-full sm:w-64 px-12 py-3 bg-[#CCA547] text-white text-base font-medium rounded-lg
                         hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-[#CCA547] transition-all"
                        >
                            Save
                        </button>
                    </div>

                </div>
            </Box>

        </>
    )
}
export default EditVideo;