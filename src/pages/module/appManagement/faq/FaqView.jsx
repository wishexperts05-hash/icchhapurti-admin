import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import Button from "../../../../components/uiComponent/Button";
import DetailsField from "../../../../components/uiComponent/DetailsField";
import LoaderSpinner from "../../../../components/uiComponent/LoaderSpinner";


const FaqView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [faqData, setFaqData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaqData = async () => {
      try {
        setLoading(true);

        const dummyFaq = {
          _id: id,
          category: "General",
          question: "How to redeem my coins?",
          answer:
            "Lorem ipsum dolor sit amet consectetur. Etiam ut arcu arcu mattis praesent vel iaculis id eu. Porttitor nulla feugiat ligula auctor euismod eu eget consequat. Vitae non pretium non molestie. Egestas nisl arcu elit nisl amet nec tortor. Iaculis id eu. Porttitor nulla feugiat ligula auctor euismod eu eget consequat. Vitae non pretium non molestie. Egestas nisl arcu elit nisl amet nec tortor.",
          createdAt: "2025-01-15",
        };

        setFaqData(dummyFaq);
      } catch (error) {
        console.error("Error fetching FAQ:", error);
        navigate("/app-management/faq");
      } finally {
        setLoading(false);
      }
    };

    fetchFaqData();
  }, [id, navigate]);

  if (!faqData) {
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
          {loading ? (
            <LoaderSpinner />
          ) : (
            <>
              <DetailsField label="Category" value={faqData.category} />

              <DetailsField label="Question" value={faqData.question} />

              <DetailsField label="Answer" value={faqData.answer} />

              {faqData.createdAt && (
                <DetailsField
                  label="Creation Date"
                  value={new Date(faqData.createdAt).toLocaleDateString(
                    "en-GB"
                  )}
                />
              )}
            </>
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