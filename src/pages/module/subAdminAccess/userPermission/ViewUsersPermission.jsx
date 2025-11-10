import React, { useEffect, useState } from 'react'
import useUsersPermission from '../../../../hooks/subAdminAccess/useUsersPermission';
import { useParams } from 'react-router-dom';
import BreadCrumb from '../../../../components/uiComponent/BreadCrumb';
import PagePath2 from '../../../../components/uiComponent/PagePath2';
import LoaderSpinner from '../../../../components/uiComponent/LoaderSpinner';
import { 
  FiCheck, 
  FiX, 
  FiUser, 
  FiCalendar, 
  FiChevronDown, 
  FiChevronRight,
  FiFolder,
  FiShield,
  FiSettings,
  FiCreditCard,
  FiShoppingBag,
  FiFileText,
  FiBell,
  FiPercent,
  FiDollarSign
} from 'react-icons/fi';

const ViewUsersPermission = () => {
  const { loading, fetchUserPermissionDetails, usersPermissionDetail } = useUsersPermission();
  const { id } = useParams();
  const [expandedParents, setExpandedParents] = useState(new Set());
  const [expandedModules, setExpandedModules] = useState(new Set());

  useEffect(() => {
    if (id) {
      fetchUserPermissionDetails(id);
    }
  }, [id]);

  const toggleParent = (parentName) => {
    setExpandedParents(prev => {
      const newSet = new Set(prev);
      if (newSet.has(parentName)) {
        newSet.delete(parentName);
      } else {
        newSet.add(parentName);
      }
      return newSet;
    });
  };

  const toggleModule = (moduleId) => {
    setExpandedModules(prev => {
      const newSet = new Set(prev);
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId);
      } else {
        newSet.add(moduleId);
      }
      return newSet;
    });
  };

  // Group modules by parentModuleName
  const groupedModules = usersPermissionDetail?.modules?.reduce((acc, module) => {
    const parentName = module.parentModuleName || 'Other Modules';
    if (!acc[parentName]) {
      acc[parentName] = [];
    }
    acc[parentName].push(module);
    return acc;
  }, {}) || {};

  const getAccessTypeColor = (accessType) => {
    const colors = {
      create: 'bg-green-100 text-green-800 border-green-200',
      read: 'bg-blue-100 text-blue-800 border-blue-200',
      update: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      delete: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[accessType] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getAccessTypeIcon = (accessType) => {
    const icons = {
      create: '➕',
      read: '👁️',
      update: '✏️',
      delete: '🗑️'
    };
    return icons[accessType] || '📋';
  };

  const getParentIcon = (parentName) => {
    const iconMap = {
      'User Management': FiUser,
      'Listing Management': FiFolder,
      'Booking & Order': FiShoppingBag,
      'Payment & Wallet': FiCreditCard,
      'Coupon': FiPercent,
      'CMS': FiFileText,
      'Settings': FiSettings,
      'Other Modules': FiShield
    };
    return iconMap[parentName] || FiFolder;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getParentStats = (modules) => {
    const totalModules = modules.length;
    const activeModules = modules.filter(m => m.accessTypes.length > 0).length;
    const totalPermissions = modules.reduce((acc, module) => acc + module.accessTypes.length, 0);
    const fullAccessModules = modules.filter(m => m.accessTypes.length === 4).length;

    return { totalModules, activeModules, totalPermissions, fullAccessModules };
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoaderSpinner />
      </div>
    );
  }

  if (!usersPermissionDetail) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <FiUser className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No permission data found</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <BreadCrumb
        linkText={[
          { text: "Sub Admin Access" },
          {
            text: "User Permissions",
            href: "/sub-admin/user-permissions",
          },
          { text: "View User Permissions" },
        ]}
      />

      <PagePath2 title="View User Permissions" />
      
      {/* Header Card */}
      <div className="w-full p-6 rounded-2xl bg-white shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
              <FiUser className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {usersPermissionDetail.adminUserId?.firstName} {usersPermissionDetail.adminUserId?.lastName}
              </h2>
              <p className="text-gray-600 text-sm">
                {usersPermissionDetail.adminUserId?.email} • {usersPermissionDetail.adminUserId?.role}
              </p>
              {/* <p className="text-gray-500 text-xs mt-1">
                Permission ID: {usersPermissionDetail._id}
              </p> */}
            </div>
          </div>
          {/* <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <FiCalendar className="w-4 h-4" />
              <span>Created: {formatDate(usersPermissionDetail.createdAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiCalendar className="w-4 h-4" />
              <span>Updated: {formatDate(usersPermissionDetail.updatedAt)}</span>
            </div>
          </div> */}
        </div>
      </div>

      {/* Overall Summary Card */}
      <div className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FiShield className="text-blue-600" />
          Permission Overview
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {usersPermissionDetail.modules?.length || 0}
            </div>
            <div className="text-sm text-gray-600">Total Modules</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {usersPermissionDetail.modules?.filter(m => m.accessTypes.length > 0).length || 0}
            </div>
            <div className="text-sm text-gray-600">Active Modules</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {usersPermissionDetail.modules?.reduce((acc, module) => acc + module.accessTypes.length, 0) || 0}
            </div>
            <div className="text-sm text-gray-600">Total Permissions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {usersPermissionDetail.modules?.filter(m => m.accessTypes.length === 4).length || 0}
            </div>
            <div className="text-sm text-gray-600">Full Access</div>
          </div>
        </div>
      </div>

      {/* Parent Modules Section */}
      <div className="space-y-6">
        {Object.entries(groupedModules).map(([parentName, modules]) => {
          const ParentIcon = getParentIcon(parentName);
          const stats = getParentStats(modules);
          const isExpanded = expandedParents.has(parentName);

          return (
            <div key={parentName} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Parent Header */}
              <div 
                className="p-6 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100"
                onClick={() => toggleParent(parentName)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <ParentIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{parentName}</h3>
                      <p className="text-gray-600 text-sm">
                        {modules.length} modules • {stats.activeModules} active • {stats.totalPermissions} permissions
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {/* Parent Stats */}
                    <div className="hidden md:flex items-center gap-4 text-sm">
                      <div className="text-center">
                        <div className="font-semibold text-green-600">{stats.activeModules}</div>
                        <div className="text-gray-500">Active</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-blue-600">{stats.totalPermissions}</div>
                        <div className="text-gray-500">Permissions</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-purple-600">{stats.fullAccessModules}</div>
                        <div className="text-gray-500">Full Access</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-500">
                      <span className="text-sm">{isExpanded ? 'Collapse' : 'Expand'}</span>
                      {isExpanded ? <FiChevronDown className="w-5 h-5" /> : <FiChevronRight className="w-5 h-5" />}
                    </div>
                  </div>
                </div>
              </div>

              {/* Child Modules */}
              {isExpanded && (
                <div className="p-6 bg-gray-50/50">
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                    {modules.map((module) => {
                      const isModuleExpanded = expandedModules.has(module._id);
                      
                      return (
                        <div
                          key={module._id}
                          className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300"
                        >
                          {/* Module Header */}
                          <div 
                            className="p-4 border-b border-gray-100 cursor-pointer"
                            onClick={() => toggleModule(module._id)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                  module.accessTypes.length > 0 
                                    ? 'bg-green-100 text-green-600' 
                                    : 'bg-gray-100 text-gray-400'
                                }`}>
                                  <div className={`w-2 h-2 rounded-full ${
                                    module.accessTypes.length > 0 ? 'bg-green-500' : 'bg-gray-300'
                                  }`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium text-gray-900 truncate">
                                    {module.moduleName}
                                  </h4>
                                  <p className="text-gray-500 text-sm">
                                    {module.accessTypes.length} permissions
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                                  module.accessTypes.length > 0 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-gray-100 text-gray-600'
                                }`}>
                                  {module.accessTypes.length > 0 ? 'Active' : 'No Access'}
                                </span>
                                <FiChevronDown 
                                  className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
                                    isModuleExpanded ? 'rotate-180' : ''
                                  }`} 
                                />
                              </div>
                            </div>
                          </div>

                          {/* Module Permissions */}
                          {isModuleExpanded && (
                            <div className="p-4 bg-gray-50 border-t border-gray-100">
                              {module.accessTypes.length > 0 ? (
                                <>
                                  <div className="mb-3">
                                    <h5 className="text-sm font-medium text-gray-700 mb-2">
                                      Permissions:
                                    </h5>
                                    <div className="flex flex-wrap gap-2">
                                      {module.accessTypes.map((accessType, idx) => (
                                        <span
                                          key={idx}
                                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${getAccessTypeColor(accessType)}`}
                                        >
                                          <span className="text-xs">{getAccessTypeIcon(accessType)}</span>
                                          {accessType.charAt(0).toUpperCase() + accessType.slice(1)}
                                          <FiCheck className="w-3 h-3" />
                                        </span>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Permission Details */}
                                  <div className="grid grid-cols-2 gap-3 text-xs">
                                    <div className={`flex items-center gap-2 p-2 rounded-lg ${
                                      module.accessTypes.includes('create') 
                                        ? 'bg-green-50 text-green-700' 
                                        : 'bg-gray-50 text-gray-500'
                                    }`}>
                                      <FiCheck className={`w-3 h-3 ${
                                        module.accessTypes.includes('create') ? 'text-green-600' : 'text-gray-400'
                                      }`} />
                                      <span>Create</span>
                                    </div>
                                    <div className={`flex items-center gap-2 p-2 rounded-lg ${
                                      module.accessTypes.includes('read') 
                                        ? 'bg-blue-50 text-blue-700' 
                                        : 'bg-gray-50 text-gray-500'
                                    }`}>
                                      <FiCheck className={`w-3 h-3 ${
                                        module.accessTypes.includes('read') ? 'text-blue-600' : 'text-gray-400'
                                      }`} />
                                      <span>Read</span>
                                    </div>
                                    <div className={`flex items-center gap-2 p-2 rounded-lg ${
                                      module.accessTypes.includes('update') 
                                        ? 'bg-yellow-50 text-yellow-700' 
                                        : 'bg-gray-50 text-gray-500'
                                    }`}>
                                      <FiCheck className={`w-3 h-3 ${
                                        module.accessTypes.includes('update') ? 'text-yellow-600' : 'text-gray-400'
                                      }`} />
                                      <span>Update</span>
                                    </div>
                                    <div className={`flex items-center gap-2 p-2 rounded-lg ${
                                      module.accessTypes.includes('delete') 
                                        ? 'bg-red-50 text-red-700' 
                                        : 'bg-gray-50 text-gray-500'
                                    }`}>
                                      <FiCheck className={`w-3 h-3 ${
                                        module.accessTypes.includes('delete') ? 'text-red-600' : 'text-gray-400'
                                      }`} />
                                      <span>Delete</span>
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <div className="text-center py-4">
                                  <FiX className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                  <p className="text-gray-500 text-sm">No permissions granted</p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ViewUsersPermission;