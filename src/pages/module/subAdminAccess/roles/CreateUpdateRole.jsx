import React, { useEffect } from 'react'
import LoaderSpinner from '../../../../components/uiComponent/LoaderSpinner';
import BreadCrumb from '../../../../components/uiComponent/BreadCrumb';
import PagePath2 from '../../../../components/uiComponent/PagePath2';
import { Formik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../../../components/uiComponent/Button';
import FormField from '../../../../components/uiComponent/FormField';
import * as Yup from 'yup';
import useRoles from '../../../../hooks/subAdminAccess/useRoles';

const roleValidationSchema = Yup.object({
  roleName: Yup.string()
    .required('Role name is required')
    .min(2, 'Role name must be at least 2 characters')
    .max(50, 'Role name must not exceed 50 characters'),
  roleDescription: Yup.string()
    .required('Role description is required')
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must not exceed 500 characters')
});

const CreateUpdateRole = () => {
  const { loading, roleDetails, updateRole, addRole, fetchRoleDetails, resetDetails } = useRoles();
  const navigate = useNavigate();
  const { id } = useParams()

  const initialValues = {
    roleName: roleDetails?.roleName || '',
    roleDescription: roleDetails?.roleDescription || '',
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log('Form submitted:', values);
    // setTimeout(() => {
      if (id) {
        updateRole(id, values);
      } else {
        addRole(values);
        resetForm();
      }
      setSubmitting(false);
      navigate("/sub-admin/roles");
    // }, 1000);
  };

  useEffect(() => {
    if (id) {
      fetchRoleDetails(id);
    }
    return () => resetDetails();
  }, [id]);

  const handleCancel = () => {
    navigate("/sub-admin/roles");
  }

  return (
    <div>
      <BreadCrumb
        linkText={[
          { text: "Sub Admin Access" },
          {
            text: "Roles",
            href: "/sub-admin/roles",
          },
          { text: id ? "Edit Role" : "Create Role" },
        ]}
      />
      <PagePath2 title={id ? "Edit Role" : "Create Role"} />

      <div className="w-full min-h-[300px] p-6 rounded-[8px] bg-white shadow flex flex-col gap-6 ">
        <Formik
          initialValues={initialValues}
          validationSchema={roleValidationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ handleSubmit, isSubmitting, isValid, dirty }) => (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {(isSubmitting || loading) && (
                <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center rounded-[8px] z-10">
                  <LoaderSpinner />
                </div>
              )}

              <FormField
                label="Role Name"
                name="roleName"
                type="text"
                fieldType="input"
                placeholder="Enter role name"
                readOnly={!!id} // Make read-only when editing
                className={id ? "bg-gray-100 cursor-not-allowed" : ""} // Visual feedback
              />

              <FormField
                label="Role Description"
                name="roleDescription"
                type="textarea"
                fieldType="input"
                placeholder="Describe the role responsibilities and permissions"
              />

              <div className="col-span-2 mt-8 flex justify-center gap-6">
                <Button
                  type="button"
                  text="Cancel"
                  variant={2}
                  onClick={handleCancel}
                />
                <Button
                  type="submit"
                  disabled={isSubmitting || loading}
                  variant={1}
                  text={id ? "Update Role" : "Create Role"}
                />
              </div>

              {/* Helper text for readonly field */}
              {id && (
                <div className="text-sm text-gray-500 mt-2">
                  <p>Note: Role name cannot be changed once created. You can only update the description.</p>
                </div>
              )}
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default CreateUpdateRole