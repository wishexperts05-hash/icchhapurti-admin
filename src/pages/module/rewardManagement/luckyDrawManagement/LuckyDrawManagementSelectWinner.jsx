import React, { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Formik, Form, FieldArray } from "formik";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import DataTable from "../../../../components/uiComponent/DataTable";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import Pagination from "../../../../components/uiComponent/Pagination";
import Button from "../../../../components/uiComponent/Button";
import { MdLocalOffer, MdDateRange, MdInfo } from "react-icons/md";
import DetailsField from "../../../../components/uiComponent/DetailsField";
import FormField from "../../../../components/uiComponent/FormField";

export default function LuckyDrawManagementSelectWinner({ activeItem, setActiveItem }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { drawId, eventName, numberOfWinners } = location.state || {};

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const [selectedRankings, setSelectedRankings] = useState({});

  const [participants, setParticipants] = useState([
    {
      srNo: 1,
      ticketNo: "TC45789",
      participantName: "Dheeraj Jadhav",
    },
    {
      srNo: 2,
      ticketNo: "TC457892",
      participantName: "Raeesh Khan",
    },
    {
      srNo: 3,
      ticketNo: "3TC45789",
      participantName: "Dheeraj Jadhav",
    },
    {
      srNo: 4,
      ticketNo: "TC45789",
      participantName: "Raeesh Khan",
    },
    {
      srNo: 5,
      ticketNo: "TC457892",
      participantName: "Raeesh Khan",
    },
    {
      srNo: 6,
      ticketNo: "TC457895",
      participantName: "Raeesh Khan",
    },
    {
      srNo: 7,
      ticketNo: "TC457894",
      participantName: "Raeesh Khan",
    },
    {
      srNo: 8,
      ticketNo: "TC457892",
      participantName: "Raeesh Khan",
    },
    {
      srNo: 9,
      ticketNo: "TC457893",
      participantName: "Raeesh Khan",
    },
    ...Array.from({ length: 21 }, (_, i) => ({
      srNo: i + 10,
      ticketNo: `TC${45789 + i}`,
      participantName: i % 2 === 0 ? "Dheeraj Jadhav" : "Raeesh Khan",
    })),
  ]);

  const filteredData = useMemo(
    () =>
      participants.filter(
        (item) =>
          item.participantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.ticketNo.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [participants, searchTerm]
  );

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

  const handleRankingChange = (ticketNo, rank) => {
    setSelectedRankings((prev) => ({
      ...prev,
      [ticketNo]: rank,
    }));
  };

  const handlePublishWinner = () => {
    const winners = Object.entries(selectedRankings)
      .filter(([_, rank]) => rank !== "")
      .map(([ticketNo, rank]) => {
        const participant = participants.find((p) => p.ticketNo === ticketNo);
        return {
          ticketNo,
          participantName: participant?.participantName,
          rank,
        };
      });

    if (winners.length === 0) {
      alert("Please select at least one winner!");
      return;
    }

    console.log("Publishing winners:", winners);
    alert(`Winners published successfully for ${eventName}!`);
    navigate("/lucky-draw-management/result");
  };

  const generateRankingOptions = () => {
    const rankLabels = ["1st Prize", "2nd Prize", "3rd Prize", "4th Prize", "5th Prize"];
    const options = [{ value: "", label: "Select Rankings" }];

    const winnerCount = numberOfWinners || 5;
    for (let i = 0; i < winnerCount; i++) {
      options.push({
        value: `rank_${i + 1}`,
        label: rankLabels[i] || `${i + 1}th Prize`,
      });
    }

    return options;
  };

  const renderSelectRanking = (row) => {
    return (
      <select
        value={selectedRankings[row.ticketNo] || ""}
        onChange={(e) => handleRankingChange(row.ticketNo, e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
      >
        {generateRankingOptions().map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  };

  const columns = [
    { header: "Ticket No.", field: "ticketNo" },
    { header: "Participant's Name", field: "participantName" },
    {
      header: "Select Winner Rank",
      field: "selectRanking",
      render: (row) => renderSelectRanking(row),
    },
  ];

  const actions = [];

  // Ticket options for dropdown
  const ticketOptions = [
    { value: "", label: "Select winner ticket" },
    { value: "TC12232434", label: "TC12232434" },
    { value: "TC12232435", label: "TC12232435" },
    { value: "TC12232436", label: "TC12232436" },
    { value: "TC12232437", label: "TC12232437" },
    { value: "TC12232438", label: "TC12232438" },
  ];

  // Initial form values - MOVED OUTSIDE to ensure it's always available
  const initialValues = {
    eventName: "",
    startDate: "",
    endDate: "",
    winners: [""], // Start with one empty winner ticket
  };

  // Form submit handler
  const handleSubmit = (values) => {
    console.log("Form values:", values);
    // Filter out empty winner tickets
    const selectedWinners = values.winners.filter(ticket => ticket !== "");
    console.log("Selected winners:", selectedWinners);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <BreadCrumb
        linkText={[
          { text: "Lucky Draw Management", href: "/lucky-draw-management" },
          { text: "Select Winner" },
        ]}
      />

      <PagePath2
        title={`Select Winner of ${eventName || "Lucky Draw"}`}
        showSearch={true}
        searchTerm={searchTerm}
        handleSearchTerm={handleSearchTerm}
        showAddButton={true}
        addButtonText="Publish Winners"
        onClick={handlePublishWinner}
      />

      <div className="bg-white shadow-md rounded-b-xl p-6">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ values }) => (
            <Form className="space-y-6">
              {/* Contest Name */}
              <div className="grid grid-cols-1">
                <FormField
                  label="Contest Name"
                  name="eventName"
                  placeholder="Enter event name"
                />
              </div>

              {/* Contest Period */}
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Contest Period</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Start Date"
                  name="startDate"
                  type="date"
                  placeholder="DD-MM-YYYY"
                />
                <FormField
                  label="End Date"
                  name="endDate"
                  type="date"
                  placeholder="DD-MM-YYYY"
                />
              </div>

              {/* Winner Tickets Section with Dynamic Fields */}
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Select Winners</h3>
              
              <FieldArray name="winners">
                {({ push, remove }) => (
                  <div className="space-y-4">
                    {values.winners && values.winners.length > 0 ? (
                      values.winners.map((winner, index) => (
                        <div key={index} className="flex gap-4 items-end">
                          <div className="flex-1">
                            <FormField
                              label={`Winner Ticket ${index + 1}`}
                              name={`winners.${index}`}
                              fieldType="select"
                              options={ticketOptions}
                            />
                          </div>
                          
                          {/* Remove button (show only if more than 1 winner) */}
                          {values.winners.length > 1 && (
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="mb-4 px-6 py-3 bg-[#CCA547] text-white rounded-xl flex justify-center items-center gap-2 cursor-pointer font-medium shadow-md hover:bg-[#CCA547]/90 hover:shadow-lg transition duration-300"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No winners added yet</p>
                    )}
                    
                    {/* Add More Winner Button */}
                    <button
                      type="button"
                      onClick={() => push("")}
                      className="text-yellow-600 text-sm font-medium hover:text-yellow-700 transition-colors"
                    >
                      + Select More Winner
                    </button>
                  </div>
                )}
              </FieldArray>

              {/* Action Buttons */}
              <div className="flex justify-center gap-4 pt-6">
                <Button
                  text="Cancel"
                  variant={2}
                  type="button"
                />
                <Button
                  text="Save Lucky Draw"
                  type="submit"
                  variant={1}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}