import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import DetailsField from "../../../../components/uiComponent/DetailsField";
import { Calendar, Trophy, Award } from "lucide-react";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import Button from '../../../../components/uiComponent/Button';

export default function LuckyDrawManagementView() {
    const navigate = useNavigate();
    const location = useLocation();

    // Mock data - replace with actual data from location.state or API
    const luckyDrawData = {
        eventName: "Event 1",
        luckyDrawId: "G458",
        status: "Completed",
        startDate: "05/02/2025",
        endDate: "05/03/2025",
        rulesOfLuckyDraw: "1 Ticket Per Parker Pen\n1 Ticket Per Ball Pen",
        ticketsPerQuantity: "1 Ticket Per Parker Pen, 1 Ticket Per Ball Pen",
        noOfWinners: "4",
        resultAnnouncementDate: "2nd Nov, 2025",
        winners: [
            { name: "Amit Jadhav" },
            { name: "Tony Stark" },
            { name: "John Deo" },
            { name: "Jane Cooper" },
        ]
    };

    const handleBack = () => {
        navigate(-1);
    };
    const handleAddWinner = () => {
        navigate("/lucky-draw-management/add-winner");
    }

    return (
        <div className="">
            <div className="max-w-6xl mx-auto">
                {/* Breadcrumb */}
                <BreadCrumb
                    linkText={[

                        { text: "Lucky Draw Management", href: "/lucky-draw-management" },
                        { text: "View Lucky Draw Event" },
                    ]}
                />

                {/* Page Title */}
                <PagePath2
                    title="View Lucky Draw Event"
                />

                {/* Basic Information Card */}
                <div className="bg-white rounded-lg p-8 mb-8 shadow-sm border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <DetailsField
                            label="Draw Name"
                            value={luckyDrawData.eventName}
                        />

                        <DetailsField
                            label="Lucky Draw ID"
                            value={luckyDrawData.luckyDrawId}
                        />

                        <DetailsField
                            label="Status"
                            value={luckyDrawData.status}
                        />
                    </div>
                </div>

                {/* Lucky Draw Information Card */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                    <div className="bg-white px-6 py-4 border-b border-gray-300">
                        <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-gray-800" />
                            <h3 className="text-lg font-bold text-gray-900">Lucky Draw Information</h3>
                        </div>
                    </div>

                    <div className="p-8 bg-white">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <DetailsField
                                label="Start Date"
                                value={luckyDrawData.startDate}
                            />

                            <DetailsField
                                label="End Date"
                                value={luckyDrawData.endDate}
                            />

                            <DetailsField
                                label="Rules Of Lucky Draw"
                                value={luckyDrawData.rulesOfLuckyDraw}
                                className="md:col-span-2"
                            />

                            <DetailsField
                                label="Tickets Per Quantity"
                                value={luckyDrawData.ticketsPerQuantity}
                            />

                            <DetailsField
                                label="No Of Winners"
                                value={luckyDrawData.noOfWinners}
                            />

                            <DetailsField
                                label="Result Announcement Date"
                                value={luckyDrawData.resultAnnouncementDate}
                                className="md:col-span-2"
                            />
                        </div>
                    </div>
                </div>

                {/* Winners Information Card */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 mt-8">
                    <div className="bg-white px-6 py-4 border-b border-gray-300">
                        <div className="flex items-center gap-3">
                            <Trophy className="w-5 h-5 text-gray-800" />
                            <h3 className="text-lg font-bold text-gray-900">Winners Information</h3>
                        </div>
                    </div>

                    <div className="p-8 bg-white">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {luckyDrawData.winners.map((winner) => (
                                <DetailsField

                                    label={`Winner Name `}
                                    value={winner.name}
                                />
                            ))}
                        </div>
                    </div>


                    <div className="flex justify-center gap-8 mt-8 mb-8">
                        <Button
                            text="Back"
                            variant={1}
                            onClick={handleBack}
                        />
                        <Button
                            text="Add Winner"
                            variant={2}
                            onClick={handleAddWinner}
                        />
                    </div>
                </div>

                {/* Action Buttons */}

            </div>
        </div>
    );
}