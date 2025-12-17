import { Box } from "@mui/material";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import { useEffect, useState } from "react";
import Button from "../../../../components/uiComponent/Button";
import useReferAndEarn from "../../../../hooks/referAndEarn/useReferAndEarn";
import { motion } from "framer-motion";
import { CheckCircle, UploadCloud, Video } from "lucide-react";
import useLogin from "../../../../hooks/auth/useLogin";
import usePermissions from "../../../../hooks/auth/usePermissions";
import { href } from "react-router-dom";

const UploadVideo = () => {
    const { updateRefferalVideo, referralVideo, loading, fetchReferralVideo } = useReferAndEarn();
    const [videoUrl, setVideoUrl] = useState(null);
    const [videoFile, setVideoFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [dragOver, setDragOver] = useState(false);
    const [error, setError] = useState(null);
    const { subAdminAccess } = useLogin();
    const { canRead, canUpdate } = usePermissions(
        subAdminAccess,
        "Upload Video"
    );

    useEffect(() => {
        fetchReferralVideo();
    }, []);

    useEffect(() => {
        if (referralVideo) {
            setVideoUrl(referralVideo);
        }
    }, [referralVideo]);

    const simulateUploadProgress = () => {
        setUploadProgress(0);
        const interval = setInterval(() => {
            setUploadProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 10;
            });
        }, 100);
        return interval;
    };

    const handleSave = async () => {
        if (!videoFile) {
            setError("Please select a video to upload");
            return;
        }

        setError(null);
        const progressInterval = simulateUploadProgress();

        const formData = new FormData();
        formData.append("video", videoFile);

        try {
            const result = await updateRefferalVideo(formData);
            if (result) {
                clearInterval(progressInterval);
                setUploadProgress(100);
                await fetchReferralVideo();

                // Auto-hide success message
                setTimeout(() => {
                    setUploadProgress(0);
                }, 3000);
            }
        } catch (error) {
            clearInterval(progressInterval);
            setUploadProgress(0);
        }
    };

    const handleVideoUpload = (e) => {
        setError(null);
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('video/')) {
                setError("Please select a valid video file");
                return;
            }

            // Validate file size (max 50MB)
            if (file.size > 50 * 1024 * 1024) {
                setError("File size must be less than 50MB");
                return;
            }

            setVideoFile(file);
            const url = URL.createObjectURL(file);
            setVideoUrl(url);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        setError(null);

        const file = e.dataTransfer.files[0];
        if (file) {
            if (!file.type.startsWith('video/')) {
                setError("Please drop a valid video file");
                return;
            }

            if (file.size > 50 * 1024 * 1024) {
                setError("File size must be less than 50MB");
                return;
            }

            setVideoFile(file);
            const url = URL.createObjectURL(file);
            setVideoUrl(url);
        }
    };

    return (
        <Box>
            <BreadCrumb linkText={[{ text: "Refer & Earn", href:"/refer-and-earn-user" }, { text: "Upload Video" }]} />
            <PagePath2 title="Upload Video" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 mb-6 rounded-2xl shadow-lg"
            >
                <div className="flex flex-col items-center">

                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            Upload Referral Video
                        </h2>
                    </div>

                    {/* Drag & Drop Area */}
                    <div className="w-full max-w-2xl">
                        <motion.label
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`cursor-pointer block p-8 border-3 border-dashed rounded-2xl transition-all duration-200 ${dragOver
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                                }`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <input
                                type="file"
                                accept="video/*"
                                onChange={handleVideoUpload}
                                className="hidden"
                            />
                            <div className="flex flex-col items-center gap-4">
                                <motion.div
                                    animate={{ y: dragOver ? [0, -5, 0] : 0 }}
                                    transition={{ repeat: dragOver ? Infinity : 0, duration: 1 }}
                                >
                                    <UploadCloud size={48} className={`${dragOver ? 'text-blue-500' : 'text-gray-400'}`} />
                                </motion.div>
                                <div className="text-center">
                                    <p className="font-semibold text-gray-700 mb-1">
                                        {dragOver ? 'Drop your video here' : 'Drag & drop your video here'}
                                    </p>
                                    <p className="text-sm text-gray-500 mb-3">or click to browse files</p>
                                    <p className="text-xs text-gray-400">MP4, MOV, AVI up to 50MB</p>
                                </div>
                            </div>
                        </motion.label>

                        {/* Progress Bar */}
                        {uploadProgress > 0 && uploadProgress < 100 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-4"
                            >
                                <div className="flex justify-between text-sm text-gray-600 mb-1">
                                    <span>Uploading...</span>
                                    <span>{uploadProgress}%</span>
                                </div>
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${uploadProgress}%` }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </div>
                            </motion.div>
                        )}

                        {/* Video Preview Section */}
                        <div className="mt-8">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                                    <Video size={20} />
                                    Video Preview
                                </h3>
                            </div>

                            {/* Preview Box */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="relative group"
                            >
                                <div className={`rounded-xl overflow-hidden ${loading ? 'bg-gray-100' : 'bg-gray-900'
                                    }`}>
                                    {loading ? (
                                        <div className="w-full h-[400px] flex flex-col items-center justify-center">
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mb-4"
                                            />
                                            <p className="text-gray-600">Loading video...</p>
                                        </div>
                                    ) : videoUrl ? (
                                        <>
                                            <video
                                                className="w-full h-[400px] object-contain"
                                                src={videoUrl}
                                                controls
                                                poster={videoFile ? null : "/api/placeholder/800/400"}
                                            />
                                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span className="px-3 py-1 bg-black/70 text-white text-sm rounded-full">
                                                    {videoFile ? 'New Upload' : 'Current Video'}
                                                </span>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="w-full h-[400px] flex flex-col items-center justify-center">
                                            <Video size={64} className="text-gray-300 mb-4" />
                                            <p className="text-gray-500 text-lg">No video available</p>
                                            <p className="text-gray-400 text-sm mt-1">Upload a video to preview</p>
                                        </div>
                                    )}
                                </div>
                            </motion.div>

                            {/* Video Info */}
                            {videoFile && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-4 p-4 bg-blue-50 rounded-lg"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-gray-800">
                                                {videoFile.name}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                {(videoFile.size / (1024 * 1024)).toFixed(2)} MB • Ready to upload
                                            </p>
                                        </div>
                                        <CheckCircle className="text-green-500" size={20} />
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-center gap-4 mt-8">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button
                                    text={
                                        <div className="flex items-center gap-2">
                                            {loading ? (
                                                <>
                                                    <motion.div
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                                                    />
                                                    Uploading...
                                                </>
                                            ) : (
                                                <>
                                                    <UploadCloud size={18} />
                                                    Save Video
                                                </>
                                            )}
                                        </div>
                                    }
                                    variant={1}
                                    onClick={handleSave}
                                    disabled={loading || !videoFile}
                                    className="min-w-[160px]"
                                />
                            </motion.div>
                        </div>

                    </div>
                </div>
            </motion.div>
        </Box>
    )
}

export default UploadVideo;