import React, { useEffect, useMemo } from "react";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";

import FormField from "../../../../components/uiComponent/FormField";
import Button from "../../../../components/uiComponent/Button";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import LoaderSpinner from "../../../../components/uiComponent/LoaderSpinner";
import useLuckyDrawManagement from "../../../../hooks/rewardManagement/useLuckyDrawManagement";

const validationSchema = Yup.object().shape({
  winners: Yup.array()
    .of(
      Yup.object().shape({
        ticketNumber: Yup.string().required("Ticket number is required"),
      })
    )
    .min(1, "At least one winner is required"),
});

const AddWinner = () => {
  const navigate = useNavigate();
  const { id: luckyDrawId } = useParams();

  const {
    loading,
    distributedTickets,
    fetchDistributedTicketsByLuckyDrawId,
    addLuckyDrawWinners,
    luckyDrawDetail,
    fetchLuckyDrawDetailById,
  } = useLuckyDrawManagement();

  useEffect(() => {
    if (luckyDrawId) {
      fetchDistributedTicketsByLuckyDrawId(luckyDrawId);
      fetchLuckyDrawDetailById(luckyDrawId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [luckyDrawId]);

  const noOfWinners = luckyDrawDetail?.numberOfWinners || 0;

  const ticketOptions = Array.isArray(distributedTickets)
    ? distributedTickets.map((t) => ({
        value: t.ticketNumber,
        label: `${t.ticketNumber} - ${t.name} (${t.userType})`,
      }))
    : [];

  const initialValues = useMemo(() => {
    const existingWinners = Array.isArray(luckyDrawDetail?.winners)
      ? luckyDrawDetail.winners
      : [];

    if (existingWinners.length > 0) {
      return {
        winners: existingWinners.map((w) => ({
          ticketNumber: w.ticketNumber || "",
        })),
      };
    }

    return {
      winners: [
        {
          ticketNumber: "",
        },
      ],
    };
  }, [luckyDrawDetail]);

  const handleSubmit = async (values, { resetForm }) => {
    const winnersPayload = values.winners
      .map((w) => {
        const ticket = distributedTickets.find(
          (t) => t.ticketNumber === w.ticketNumber
        );
        if (!ticket) return null;

        return {
          ticketNumber: ticket.ticketNumber,
          userId: ticket.userId,
          userType: ticket.userType,
        };
      })
      .filter(Boolean);

    const payload = { winners: winnersPayload };

    const res = await addLuckyDrawWinners(luckyDrawId, payload);

    if (res?.success) {
      resetForm();
      navigate("/lucky-draw-management");
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const isLoadingScreen =
    loading && ticketOptions.length === 0 && !luckyDrawDetail;

  return (
    <div className="bg-gray-50 min-h-screen">
      <BreadCrumb
        linkText={[
          { text: "Lucky Draw Management", href: "/lucky-draw-management" },
          { text: "Add Winner" },
        ]}
      />

      <PagePath2 title="Add Winner" description="" />

      <div className="bg-white shadow-md rounded-b-xl p-6">
        {isLoadingScreen ? (
          <div className="flex w-full items-center justify-center py-10">
            <LoaderSpinner />
          </div>
        ) : (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ values }) => (
              <Form className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Winner Details
                </h3>

                <FieldArray name="winners">
                  {({ push, remove }) => (
                    <>
                      {values.winners.map((winner, index) => {
                        const selectedTicket = distributedTickets.find(
                          (t) => t.ticketNumber === winner.ticketNumber
                        );

                        return (
                          <div key={index} className="mb-4">
                            <div className="flex items-start gap-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                                <FormField
                                  label="Ticket Number"
                                  name={`winners.${index}.ticketNumber`}
                                  fieldType="select"
                                  options={[
                                    {
                                      value: "",
                                      label:
                                        ticketOptions.length === 0
                                          ? "No tickets available"
                                          : "Select Ticket Number",
                                    },
                                    ...ticketOptions,
                                  ]}
                                />

                                <div className="flex flex-col mb-4">
                                  <label className="text-sm font-medium text-gray-700 mb-1">
                                    Name
                                  </label>
                                  <input
                                    type="text"
                                    value={selectedTicket?.name || ""}
                                    readOnly
                                    placeholder="Winner name"
                                    className="w-full border border-[#CCA547]/80 rounded-lg px-3 py-2 bg-gray-100 cursor-not-allowed"
                                  />
                                </div>
                              </div>

                              {values.winners.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => remove(index)}
                                  className="mt-8 text-red-500 hover:text-red-700 text-2xl transition-colors"
                                  title="Remove winner"
                                >
                                  ✕
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}

                      {noOfWinners > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            push({
                              ticketNumber: "",
                            })
                          }
                          className="text-yellow-600 hover:text-yellow-700 font-medium mt-4 flex items-center gap-1"
                        >
                          + Add More
                        </button>
                      )}
                    </>
                  )}
                </FieldArray>

                <div className="flex justify-center gap-4 pt-6">
                  <Button
                    text="Cancel"
                    variant={2}
                    type="button"
                    onClick={handleCancel}
                  />
                  <Button text="Save Winners" type="submit" variant={1} />
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default AddWinner;
