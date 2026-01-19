import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import DetailsField from "../../../../components/uiComponent/DetailsField";
import { Calendar, Trophy } from "lucide-react";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import Button from "../../../../components/uiComponent/Button";
import LoaderSpinner from "../../../../components/uiComponent/LoaderSpinner";

import useLuckyDrawManagement from "../../../../hooks/rewardManagement/useLuckyDrawManagement";

export default function LuckyDrawManagementView() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { loading, luckyDrawDetail, fetchLuckyDrawDetailById } =
    useLuckyDrawManagement();

  useEffect(() => {
    if (id) {
      fetchLuckyDrawDetailById(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const formatDate = (iso) => {
    if (!iso) return "-";
    const d = new Date(iso);

    return d.toLocaleDateString("en-GB");
  };

  const formatDateVerbose = (iso) => {
    if (!iso) return "-";
    const d = new Date(iso);

    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const luckyDrawData = useMemo(() => {
    if (!luckyDrawDetail) return null;

    const {
      eventName,
      eventId,
      status,
      startDate,
      endDate,
      announcementDate,
      ticketsPerQuantity,
      numberOfWinners,
      winners,
    } = luckyDrawDetail;

    const rulesArray = Array.isArray(ticketsPerQuantity)
      ? ticketsPerQuantity
      : [];

    const normalizedWinners = Array.isArray(winners)
      ? winners.map((w) => ({
          name: w.name || w.fullName || w.userName || w.winnerName || "Winner",
        }))
      : [];

    return {
      eventName: eventName || "-",
      luckyDrawId: eventId || "-",
      status: status || "-",
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      rules: rulesArray,
      noOfWinners: numberOfWinners ?? "-",
      resultAnnouncementDate: formatDateVerbose(announcementDate),
      winners: normalizedWinners,
    };
  }, [luckyDrawDetail]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleAddWinner = () => {
    navigate(`/lucky-draw-management/add-winner/${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <BreadCrumb
        linkText={[
          { text: "Reward Management" },
          { text: "Lucky Draw Management", href: "/lucky-draw-management" },
          { text: "View Lucky Draw Event" },
        ]}
      />

      {/* Page Title */}
      <PagePath2 title="View Lucky Draw Event" />

      {loading && !luckyDrawData ? (
        <div className="flex w-full items-center justify-center py-10">
          <LoaderSpinner />
        </div>
      ) : !luckyDrawData ? (
        <div className="bg-white rounded-2xl overflow-hidden p-8 mb-8 border border-gray-200">
          <p className="text-center text-gray-600">
            Lucky Draw details not found.
          </p>
        </div>
      ) : (
        <>
          {/* Basic Information Card */}
          <div className="bg-white rounded-2xl p-8 mb-4 shadow-sm border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <DetailsField label="Draw Name" value={luckyDrawData.eventName} />

              <DetailsField
                label="Lucky Draw ID"
                value={luckyDrawData.luckyDrawId}
              />

              <DetailsField label="Status" value={luckyDrawData.status} />
            </div>
          </div>

          {/* Lucky Draw Information Card */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200">
            <div className="bg-white px-6 py-4 border-b border-gray-300">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-800" />
                <h3 className="text-lg font-bold text-gray-900">
                  Lucky Draw Information
                </h3>
              </div>
            </div>

            <div className="p-8 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DetailsField
                  label="Start Date"
                  value={luckyDrawData.startDate}
                />

                <DetailsField label="End Date" value={luckyDrawData.endDate} />

                <h1 className="font-bold">Rules Of Lucky Draw :</h1>
                {luckyDrawData.rules.length === 0 ? (
                  <DetailsField
                    label="Products & Tickets"
                    value="-"
                    className="md:col-span-2"
                  />
                ) : (
                  luckyDrawData.rules.map((rule, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 md:grid-cols-2 gap-6 md:col-span-2 bg-gray-100 p-4 rounded"
                    >
                      <DetailsField
                        label={`Product ${index + 1} Name`}
                        value={rule.productName || "-"}
                      />
                      <DetailsField
                        label={`Product ${index + 1} Tickets Per Quantity`}
                        value={
                          rule.ticketsPerQuantity !== undefined &&
                          rule.ticketsPerQuantity !== null
                            ? rule.ticketsPerQuantity
                            : "-"
                        }
                      />
                    </div>
                  ))
                )}

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
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200 mt-4">
            <div className="bg-white px-6 py-4 border-b border-gray-300">
              <div className="flex items-center gap-3">
                <Trophy className="w-5 h-5 text-gray-800" />
                <h3 className="text-lg font-bold text-gray-900">
                  Winners Information
                </h3>
              </div>
            </div>

            <div className="p-8 bg-white">
              {luckyDrawData.winners.length === 0 ? (
                <p className="text-gray-500">No winners declared yet.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {luckyDrawData.winners.map((winner, index) => (
                    <DetailsField
                      key={index}
                      label={`Winner ${index + 1} Name`}
                      value={winner.name}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-center gap-8 mt-8 mb-8">
              <Button text="Back" variant={2} onClick={handleBack} />
              <Button text="Add Winner" variant={1} onClick={handleAddWinner} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
