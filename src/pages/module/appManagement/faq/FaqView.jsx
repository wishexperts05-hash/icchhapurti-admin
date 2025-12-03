import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import Button from "../../../../components/uiComponent/Button";
import DetailsField from "../../../../components/uiComponent/DetailsField";
import LoaderSpinner from "../../../../components/uiComponent/LoaderSpinner";
import useFAQ from "../../../../hooks/appManagement/useFAQ";

const FaqView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, faqDetail, fetchFaqById, resetFaqDetail } = useFAQ();

  useEffect(() => {
    if (id) {
      fetchFaqById(id);
    }

    
    return () => {
      resetFaqDetail();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) {
    return (
      <div className="bg-[#F9F9F9] min-h-screen">
        <BreadCrumb
          linkText={[
            { text: "App Management" },
            { text: "FAQ", href: "/app-management/faq" },
            { text: "FAQ Details" },
          ]}
        />
        <PagePath2 title="FAQ Details" />
        <div className="flex items-center justify-center h-64">
          <LoaderSpinner />
        </div>
      </div>
    );
  }

  if (!faqDetail) {
    return (
      <div className="bg-[#F9F9F9] min-h-screen">
        <BreadCrumb
          linkText={[
            { text: "App Management" },
            { text: "FAQ", href: "/app-management/faq" },
            { text: "FAQ Details" },
          ]}
        />
        <PagePath2 title="FAQ Details" />
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">FAQ not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F9F9F9] min-h-screen">
      <BreadCrumb
        linkText={[
          { text: "App Management" },
          { text: "FAQ", href: "/app-management/faq" },
          { text: "FAQ Details" },
        ]}
      />

      <PagePath2 title="FAQ Details" />

      <div className="bg-white border border-gray-200 shadow-xl rounded-2xl p-6 mt-4">
        <div className="grid grid-cols-1 gap-6 py-4">
          <DetailsField label="Category" value={faqDetail.category} />

          <DetailsField label="Question" value={faqDetail.question} />

          <DetailsField label="Answer" value={faqDetail.answer} />

          {faqDetail.createdAt && (
            <DetailsField
              label="Creation Date"
              value={new Date(faqDetail.createdAt).toLocaleDateString("en-GB")}
            />
          )}
        </div>

        <div className="my-6 border-t border-gray-200"></div>

        <div className="py-4 flex items-center justify-center gap-5 w-full">
          <Button variant={2} text="Back" onClick={() => navigate(-1)} />
          <Button
            variant={1}
            text="Edit FAQ"
            onClick={() => navigate(`/app-management/faq/edit/${id}`)}
          />
        </div>
      </div>
    </div>
  );
};

export default FaqView;