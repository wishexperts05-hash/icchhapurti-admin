import React, { useEffect, useMemo, useState } from 'react'
import BreadCrumb from '../../../../components/uiComponent/BreadCrumb'
import PagePath2 from '../../../../components/uiComponent/PagePath2'
import FormField from '../../../../components/uiComponent/FormField'
import { Formik } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import * as Yup from 'yup'
import Button from '../../../../components/uiComponent/Button'
import LoaderSpinner from '../../../../components/uiComponent/LoaderSpinner'
import useUsersPermission from '../../../../hooks/subAdminAccess/useUsersPermission'
import { AdminOperation } from './AdminOperationData'
import PermissionTable from './PermissionTable'
import {
    FiUser,
    FiSettings
} from 'react-icons/fi'

const AddEditSubAdmin = () => {
    const { loading, fetchUserPermissionDetails, usersPermissionDetail, addUserPermission,
        updateUserPermission, resetUsersPermission, fetchUsersDropList, usersDropList,
    } = useUsersPermission();
    const navigate = useNavigate();
    const { id } = useParams();

    const [accessErrors, setAccessErrors] = useState({});
    const [isEditMode, setIsEditMode] = useState(false);
    const [isFetchingPrivilege, setIsFetchingPrivilege] = useState(false);
    const [expandedModules, setExpandedModules] = useState(new Set());
    const [selectedUser, setSelectedUser] = useState(null);

    const allModules = useMemo(() => {
        const modules = {};
        AdminOperation?.forEach((parentModule) => {
            // Add parent module itself if it has permissions
            if (parentModule.permissionTypes && parentModule.permissionTypes.length > 0) {
                modules[parentModule.label] = {
                    ...parentModule,
                    parentModuleName: parentModule.label,
                    permissionTypes: parentModule.permissionTypes || ['access'],
                    isParent: true
                };
            }

            // Add child modules
            if (parentModule.children) {
                parentModule.children.forEach(child => {
                    modules[child.label] = {
                        ...child,
                        parentModuleName: parentModule.label,
                        permissionTypes: child.permissionTypes || ['create', 'read', 'update', 'delete', 'access'],
                        isParent: false
                    };
                });
            }
        });
        console.log("All modules structure:", modules);
        return modules;
    }, []);

    const parentModules = useMemo(() => {
        const parents = new Set();
        Object.values(allModules).forEach(module => {
            if (module.isParent) {
                parents.add(module.label);
            }
        });
        return Array.from(parents);
    }, [allModules]);

    const initialModulePrivileges = useMemo(() => {
        const privileges = {};
        Object.entries(allModules).forEach(([moduleName, module]) => {
            if (!module.isParent || module.permissionTypes.some(pt => pt !== 'access')) {
                privileges[moduleName] = {
                    access: false,
                    create: module.permissionTypes?.includes('create') || false,
                    read: module.permissionTypes?.includes('read') || false,
                    update: module.permissionTypes?.includes('update') || false,
                    delete: module.permissionTypes?.includes('delete') || false,
                    parentModuleName: module.parentModuleName,
                    permissionTypes: module.permissionTypes,
                    isParent: module.isParent
                };
            }
        });
        return privileges;
    }, [allModules]);

    const [modulePrivileges, setModulePrivileges] = useState(initialModulePrivileges);

    useEffect(() => {
        if (id) {
            setIsEditMode(true);
            setIsFetchingPrivilege(true);
            fetchUserPermissionDetails(id)
                .catch(error => console.error("Error fetching user permission:", error))
                .finally(() => setIsFetchingPrivilege(false));
        } else {
            resetUsersPermission();
        }
        fetchUsersDropList();
    }, [id]);

    useEffect(() => {
        if (usersPermissionDetail && isEditMode) {
            const updatedModulePrivileges = { ...initialModulePrivileges };

            if (usersPermissionDetail.modules) {
                usersPermissionDetail.modules.forEach(module => {
                    if (updatedModulePrivileges[module.moduleName]) {
                        updatedModulePrivileges[module.moduleName] = {
                            ...updatedModulePrivileges[module.moduleName],
                            access: true,
                            create: module.accessTypes?.includes('create') || false,
                            read: module.accessTypes?.includes('read') || false,
                            update: module.accessTypes?.includes('update') || false,
                            delete: module.accessTypes?.includes('delete') || false,
                            parentModuleName: module.parentModuleName || updatedModulePrivileges[module.moduleName]?.parentModuleName
                        };
                    }
                });
            }

            setModulePrivileges(updatedModulePrivileges);

            const parentsToExpand = new Set();
            usersPermissionDetail.modules?.forEach(module => {
                if (module.parentModuleName) {
                    parentsToExpand.add(module.parentModuleName);
                }
            });
            setExpandedModules(parentsToExpand);

            if (usersPermissionDetail.adminUserId) {
                setSelectedUser({
                    value: usersPermissionDetail.adminUserId._id,
                    label: `${usersPermissionDetail.adminUserId.firstName} ${usersPermissionDetail.adminUserId.lastName}`,
                    email: usersPermissionDetail.adminUserId.email
                });
            }
        }
    }, [usersPermissionDetail, isEditMode, initialModulePrivileges]);

    const usersOptions = usersDropList?.map((user) => ({
        value: user.id,
        label: user.fullName,
        email: user.email,
        avatar: user.avatar
    }));

    const initialValues = {
        adminUserId: usersPermissionDetail?.adminUserId?._id || '',
    };

    const toggleModuleExpansion = (moduleLabel) => {
        setExpandedModules(prev => {
            const newSet = new Set(prev);
            if (newSet.has(moduleLabel)) {
                newSet.delete(moduleLabel);
            } else {
                newSet.add(moduleLabel);
            }
            return newSet;
        });
    };

    const toggleAllChildPermissions = (parentModule, grantAccess) => {
        const childModules = Object.values(allModules).filter(module => 
            module.parentModuleName === parentModule && !module.isParent
        );

        setModulePrivileges(prev => {
            const newState = { ...prev };
            childModules.forEach(child => {
                if (newState[child.label]) {
                    newState[child.label] = {
                        ...newState[child.label],
                        access: grantAccess,
                        ...(grantAccess ? {
                            read: true,
                            create: child.permissionTypes.includes('create'),
                            update: child.permissionTypes.includes('update'),
                            delete: child.permissionTypes.includes('delete'),
                        } : {
                            read: false,
                            create: false,
                            update: false,
                            delete: false,
                        })
                    };
                }
            });
            return newState;
        });
    };

    const validateAccessPermissions = () => {
        const errors = {};
        let isValid = true;

        Object.entries(modulePrivileges).forEach(([moduleName, permissions]) => {
            if (permissions.access) {
                const moduleData = allModules[moduleName];
                
                const hasSpecificPermissions = moduleData.permissionTypes.some(
                    perm => ['create', 'read', 'update', 'delete'].includes(perm)
                );

                if (hasSpecificPermissions) {
                    const hasPermissionSelected = ['create', 'read', 'update', 'delete'].some(
                        perm => permissions[perm]
                    );

                    if (!hasPermissionSelected) {
                        errors[moduleName] = 'Select at least one permission';
                        isValid = false;
                    }
                }
            }
        });

        setAccessErrors(errors);
        return isValid;
    };

    //new code added(Harshal)
    const validateAtLeastOnePermissionSelected = () => {
    const hasAnyPermission = Object.values(modulePrivileges).some(
        permissions =>
            permissions.access &&
            ['create', 'read', 'update', 'delete'].some(p => permissions[p])
    );

    if (!hasAnyPermission) {
        setAccessErrors({
            _global: 'Please select at least one permission'
        });
        return false;
    }

    return true;
};


const handleSubmit = async (values, { setSubmitting, resetForm }) => {

    const isModuleValid = validateAccessPermissions();
    const isAnyPermissionSelected = validateAtLeastOnePermissionSelected();

    if (!isModuleValid || !isAnyPermissionSelected) {
        setSubmitting(false);
        return;
    }

    try {
        const modules = Object.entries(modulePrivileges)
            .filter(([_, permissions]) => permissions.access)
            .map(([moduleName, permissions]) => {
                const accessTypes = Object.entries(permissions)
                    .filter(([permName, isAllowed]) =>
                        ['create', 'read', 'update', 'delete'].includes(permName) && isAllowed
                    )
                    .map(([permName]) => permName);

                return {
                    moduleName,
                    parentModuleName: permissions.parentModuleName,
                    accessTypes
                };
            });

        const requestBody = {
            adminUserId: values.adminUserId,
            modules
        };

        if (id) {
            await updateUserPermission(id, requestBody);
        } else {
            await addUserPermission(requestBody);
            resetForm();
            setModulePrivileges(initialModulePrivileges);
        }

        navigate("/sub-admin/user-permissions");
    } catch (error) {
        console.error(error);
    } finally {
        setSubmitting(false);
    }
};


    const handleCancel = () => {
        navigate("/sub-admin/user-permissions");
    }

    const toggleModulePrivilege = (module, privilege) => {
        setModulePrivileges(prev => {
            const newState = { ...prev };
            newState[module] = {
                ...newState[module],
                [privilege]: !newState[module]?.[privilege]
            };

            if (privilege === 'access' && !newState[module].access) {
                const moduleData = allModules[module];
                if (moduleData.permissionTypes.includes('read')) {
                    newState[module].read = true;
                }
            }

            if (privilege !== 'access' && newState[module].access && accessErrors[module]) {
                setAccessErrors(prevErrors => {
                    const newErrors = { ...prevErrors };
                    delete newErrors[module];
                    return newErrors;
                });
            }

            return newState;
        });
    };

    const getModuleIcon = (moduleLabel) => {
        const module = allModules[moduleLabel];
        return module?.icon || FiSettings;
    };

    if (isFetchingPrivilege) {
        return (
            <div className="flex justify-center items-center h-screen bg-white">
                <LoaderSpinner />
            </div>
        );
    }

    //new Grant Permission  code

    const toggleGrantRevokeAll = (grantAccess) => {
    setModulePrivileges(prev => {
        const newState = {};

        Object.entries(prev).forEach(([moduleName, permissions]) => {
            const moduleData = allModules[moduleName];

            newState[moduleName] = {
                ...permissions,
                access: grantAccess,
                create: grantAccess && moduleData.permissionTypes.includes('create'),
                read: grantAccess && moduleData.permissionTypes.includes('read'),
                update: grantAccess && moduleData.permissionTypes.includes('update'),
                delete: grantAccess && moduleData.permissionTypes.includes('delete'),
            };
        });

        return newState;
    });

    // clear errors when bulk action
    setAccessErrors({});
};


    return (
        <div>
            <BreadCrumb
                linkText={[
                    { text: "Sub Admin Access" },
                    {
                        text: "User Permissions",
                        href: "/sub-admin/user-permissions",
                    },
                    { text: id ? "Edit User Access" : "Assign User Access" },
                ]}
            />

            <PagePath2 title={id ? "Update User Access" : "Assign User Access"} />

            <div className="w-full p-6 rounded-2xl bg-white shadow-sm border border-gray-100">
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    enableReinitialize={true}
                >
                    {({ handleSubmit, isSubmitting, isValid, dirty, setFieldValue, values }) => (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative">
                            {(isSubmitting || loading) && (
                                <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center rounded-2xl z-10 backdrop-blur-sm">
                                    <div className="text-center">
                                        <LoaderSpinner />
                                        <p className="text-gray-600 mt-2">
                                            {isEditMode ? "Updating permissions..." : "Assigning access..."}
                                        </p>
                                    </div>
                                </div>
                            )}

                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <FiUser className="text-blue-600" />
                                    User Information
                                </h3>
                                
                                {isEditMode ? (
                                    <div className="space-y-3">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Selected User
                                        </label>
                                        <div className="p-3 bg-white rounded-lg border border-gray-200">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                                                    {selectedUser?.label?.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">{selectedUser?.label}</p>
                                                    <p className="text-sm text-gray-500">{selectedUser?.email}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-xs text-gray-500">
                                            User cannot be changed in edit mode. To assign permissions to a different user, create a new assignment.
                                        </p>
                                    </div>
                                ) : (
                                    <>
                                        <FormField
                                            label="Select User"
                                            name="adminUserId"
                                            type="select"
                                            fieldType="select"
                                            placeholder="Search and select a user..."
                                            options={usersOptions}
                                            onChange={(selectedOption) => {
                                                setFieldValue('adminUserId', selectedOption?.value || '');
                                                setSelectedUser(selectedOption);
                                            }}
                                        />
                                        {selectedUser && (
                                            <div className="mt-3 p-3 bg-white rounded-lg border border-gray-200">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                                                        {selectedUser.label?.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900">{selectedUser.label}</p>
                                                        <p className="text-sm text-gray-500">{selectedUser.email}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>


{accessErrors._global && (
    <div className="p-4 mb-4 bg-red-50 border border-red-200 rounded-lg text-red-600 font-medium">
        {accessErrors._global}
    </div>
)}

                            <PermissionTable
                                allModules={allModules}
                                parentModules={parentModules}
                                modulePrivileges={modulePrivileges}
                                expandedModules={expandedModules}
                                accessErrors={accessErrors}
                                toggleModuleExpansion={toggleModuleExpansion}
                                toggleAllChildPermissions={toggleAllChildPermissions}
                                toggleModulePrivilege={toggleModulePrivilege}
                                getModuleIcon={getModuleIcon}
                                 onGrantRevokeAll={toggleGrantRevokeAll} 
                            />

                            <div className="flex justify-center gap-4 pt-6 border-t border-gray-200">
                                <Button
                                    type="button"
                                    text="Cancel"
                                    variant={2}
                                    onClick={handleCancel}
                                    className="px-8 py-3"
                                />
                                <Button
                                    type="submit"
                                    disabled={isSubmitting || loading || !values.adminUserId}
                                    variant={1}
                                    text={id ? "Update User Access" : "Assign User Access"}
                                    className="px-8 py-3 shadow-lg hover:shadow-xl transition-shadow"
                                />
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default AddEditSubAdmin