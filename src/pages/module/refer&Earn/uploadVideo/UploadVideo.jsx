import { Box } from "@mui/material";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import { useState } from "react";
import Swal from "sweetalert2";
import Button from "../../../../components/uiComponent/Button";

const UploadVideo = () => {
    const [videoUrl, setVideoUrl] = useState(null);
    const handleSave = () => {
        Swal.fire("Saved!", "", "success");
    };
    // handle cancel
    const handleCancel=()=>{

    }
    const handleVideoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file); // Create preview URL
            setVideoUrl(url);
        }
    };

    return (
        <Box>
            <BreadCrumb linkText={[{ text: "Refer & Earn" }, { text: "Upload Video" }]} />
            <PagePath2 title="Upload Video" />
            <div className="bg-white p-6 mb-6 rounded-2xl shadow-lg">
                <div className="flex flex-col items-center">
                    {/* Label + File Input */}
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">
                        Upload & Preview Video
                    </h2>
                    <label className="cursor-pointer font-bold text-blue-700">
                        Choose Video
                        <input
                            type="file"
                            accept="video/*"
                            onChange={handleVideoUpload}
                            className="hidden"
                        />
                    </label>
                    {/* Preview Box */}
                    <div className="mt-5 border-2 border-dashed border-gray-300 rounded-xl 
                      w-[500px] h-[300px] bg-gray-50 flex justify-center items-center overflow-hidden">
                        {videoUrl ? (
                            <video
                                className="w-full h-full object-cover rounded-lg"
                                src={videoUrl}
                                controls
                            />
                        ) : (
                            <span className="text-gray-400 text-lg">No video selected</span>
                        )}
                    </div >
                    {/* Buttons */}
                    <div className="flex justify-center gap-8">

                    <div className="flex justify-center gap-8 mt-6">
                        <Button text="Cancel" variant={2} onClick={handleCancel} />
                    </div>
                    <div className="flex justify-center gap-8 mt-6">
                        <Button text="Save" variant={1} onClick={handleSave} />
                    </div>

                    </div>
                </div>
            </div>
        </Box>
    )
}

export default UploadVideo;