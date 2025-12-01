import { Box } from "@mui/material";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import Button from "../../../../components/uiComponent/Button";


const UploadVideo = () => {
    const navigate = useNavigate();
    const [videoUrl, setVideoUrl] = useState(null);
    const fileInputRef = useRef(null);



    const handleSave = () => {
         Swal.fire("Saved!", "Your video has been Saved", "success");
    };

   
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
            <PagePath2
                title="Upload Video"

            />
            <div className="bg-white p-4 mb-4  shadow-md">

                <div className="p-4">
                    <div className="flex justify-center">

                    <h2 className="text-lg font-semibold mb-3 mx-5">Upload & Preview Video : </h2>

                    {/* File Input */}
                    <input type="file" accept="video/*" onChange={handleVideoUpload} ref={fileInputRef} />

                    </div>

                    {/* Preview Box */}
                    <div className="border  w-[500px] h-[300px] mx-auto flex justify-center items-center">

                        {videoUrl ? (
                            <div className="flex justify-center">
                                <video width="100%" controls src={videoUrl} />

                            </div>
                        ) : (
                            <div className="text-gray-500 ">No video selected</div>
                        )}
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 ">
                   
                    {/* Action Buttons */}
                    <div className="flex justify-center gap-8 mt-2 mb-8 ">
                        <Button text="Save" variant={1} onClick={handleSave} />
                    </div>
                </div>
            </div>
        </Box>
    )
}

export default UploadVideo;