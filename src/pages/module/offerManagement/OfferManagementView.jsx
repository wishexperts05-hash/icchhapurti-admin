import { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import DetailsField from "../../../components/uiComponent/DetailsField";
import { MdLocalOffer, MdDateRange, MdInfo } from "react-icons/md";

import PagePath2 from "../../../components/uiComponent/PagePath2";
import Button from '../../../components/uiComponent/Button';

export default function OfferManagementView() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const handleBack = () => {
        navigate(-1); 
    };

    return (
        <div className="">
            <div className="max-w-6xl mx-auto">
                {/* Breadcrumb */}
                <BreadCrumb
                    linkText={[
                        { text: "Offer Management", href: "/offer-management" },
                        { text: "View Offer" },
                    ]}
                />

                {/* Page Title */}
                <PagePath2
                    title="View Offer"
                />



                {/* Offer Information Card */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                    <div className="bg-white px-6 py-4 border-b border-gray-300">
                        <div className="flex items-center gap-3">
                            <MdLocalOffer className="w-5 h-5 text-gray-800" />
                            <h3 className="text-lg font-bold text-gray-900">Offer Information</h3>
                        </div>
                    </div>

                    <div className="p-8 bg-white">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <DetailsField
                                label="Offer Title"
                                value="Diwali Special Offer"
                            />

                            <DetailsField
                                label="Target Auidence"
                                value="User"
                            />

                            <DetailsField
                                label="start Date"
                                value="01-11-2024"
                            />

                            <DetailsField
                                label="End Date"
                                value="05-11-2024"
                            />

                            <DetailsField
                                label="Get & buy"
                                value="₹500"
                            />

                            <DetailsField
                                label="pen"
                                value="₹1000"
                            />
                            <DetailsField
                                label="Product"
                                value="parker pen"
                            />

                            <DetailsField
                                label="Buy quantity"
                                value="2"
                            />


                            <DetailsField
                                label="Get quantity"
                                value="1"
                                
                            />
                        </div>
                    </div>
                     <div className="flex justify-center gap-8 mt-8 mb-8">
                    <Button
                        text="Back"
                        variant={2}
                        onClick={handleBack}
                    />
                </div>
                </div>

               
               
            </div>
        </div>
    );
}