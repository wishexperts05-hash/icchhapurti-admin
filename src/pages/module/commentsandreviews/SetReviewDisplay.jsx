import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import BreadCrumb from "../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../components/uiComponent/PagePath2";
import Button from "../../../components/uiComponent/Button";
import DetailsField from "../../../components/uiComponent/DetailsField";
import FormField from "../../../components/uiComponent/FormField";
import useCommentandReviews from "../../../hooks/CommentandReviews/useCommentandReviews";

const validationSchema = Yup.object({
  stars: Yup.number()
    .required("Rating is required")
    .min(1, "Minimum rating is 1")
    .max(5, "Maximum rating is 5"),
});

export default function SetReviewDisplay() {
  const navigate = useNavigate();
  const { loading, fetchUserRating, userRating, updatingUserRating } =
    useCommentandReviews();

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    fetchUserRating();
  }, []);

  const ratingValue = userRating

  const handleSubmit = async (values) => {
    await updatingUserRating({ stars: values.stars });
    setIsEdit(false);
    await fetchUserRating();
  };

  return (
    <div className="max-w-7xl mx-auto">
      <BreadCrumb
        linkText={[
          { text: "Comment & Review", href: "/manage-comments" },
          { text: "Set Review Display" },
        ]}
      />

      <PagePath2 title="Set Review Display" />
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Set Review to Display For User
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Reviews with rating equal to or above this value
        </p>

        {!isEdit ? (
          <>
            <DetailsField
              label="Current Rating"
              value={`${ratingValue} (out of 5)`}
              valueWeight="600"
            />

            <div className="flex gap-4 mt-6">
              <Button
                text="Back"
                variant={2}
                onClick={() => navigate("/manage-comments")}
                className="w-full"
              />
              <Button
                text="Edit"
                variant={1}
                onClick={() => setIsEdit(true)}
                className="w-full"
                disabled={loading}
              />
            </div>
          </>
        ) : (
          <>
            <Formik
              initialValues={{ stars: ratingValue }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ isSubmitting }) => (
                <Form>
                  <FormField
                    label="Rating (1–5)"
                    name="stars"
                    type="number"
                    placeholder="Enter rating"
                  />

                  <div className="flex gap-4 mt-4">
                    <Button
                      text="Cancel"
                      variant={2}
                      onClick={() => setIsEdit(false)}
                      className="w-full"
                      disabled={isSubmitting}
                    />
                    <Button
                      text={isSubmitting ? "Updating..." : "Update"}
                      variant={1}
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting || loading}
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </>
        )}
      </div>
    </div>
  );
}
