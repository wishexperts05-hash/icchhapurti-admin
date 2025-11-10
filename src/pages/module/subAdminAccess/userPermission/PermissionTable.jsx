import React from 'react'
import {
    FiChevronDown,
    FiChevronRight,
    FiCheck,
    FiX,
    FiShield,
    FiSettings,
    FiPlus
} from 'react-icons/fi'

const PermissionTable = ({
    allModules,
    parentModules,
    modulePrivileges,
    expandedModules,
    accessErrors,
    toggleModuleExpansion,
    toggleAllChildPermissions,
    toggleModulePrivilege,
    getModuleIcon
}) => {

    const PermissionCheckbox = ({ checked, onChange, disabled = false, type = 'default' }) => {
        const baseClasses = "w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-200";
        const types = {
            default: {
                unchecked: "border-gray-300 bg-white hover:border-blue-400",
                checked: "border-blue-500 bg-blue-500 text-white"
            },
            access: {
                unchecked: "border-purple-300 bg-white hover:border-purple-400",
                checked: "border-purple-500 bg-purple-500 text-white"
            }
        };

        const style = types[type] || types.default;

        return (
            <button
                type="button"
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onChange();
                }}
                disabled={disabled}
                className={`
                    ${baseClasses}
                    ${checked ? style.checked : style.unchecked}
                    ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:scale-110'}
                    focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-300
                `}
            >
                {checked && <FiCheck size={14} />}
            </button>
        );
    };

    const handleParentToggle = (e, parentName) => {
        e.preventDefault();
        e.stopPropagation();
        toggleModuleExpansion(parentName);
    };

    const handleBulkAction = (e, action) => {
        e.preventDefault();
        e.stopPropagation();
        if (action === 'grant') {
            parentModules.forEach(parent => {
                toggleAllChildPermissions(parent, true);
            });
        } else {
            parentModules.forEach(parent => {
                toggleAllChildPermissions(parent, false);
            });
        }
    };

    // const handleChildToggle = (e, moduleName, privilege) => {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     toggleModulePrivilege(moduleName, privilege);
    // };

    const renderIcon = (IconComponent, props = {}) => {
        if (!IconComponent) return <FiSettings className="w-4 h-4" {...props} />;
        
        if (typeof IconComponent === 'function' || IconComponent.$$typeof) {
            return <IconComponent className="w-4 h-4" {...props} />;
        }
        
        return <FiSettings className="w-4 h-4" {...props} />;
    };

    return (
        <div className="mt-8">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <FiShield className="text-blue-600" />
                    Module Permissions
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded"></div>
                        <span>Selected</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-gray-200 rounded"></div>
                        <span>Not selected</span>
                    </div>
                </div>
            </div>

            <div className="flex gap-3 mb-6">
                <button
                    type="button"
                    onClick={(e) => handleBulkAction(e, 'grant')}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                    <FiPlus size={16} />
                    Grant All Access
                </button>
                <button
                    type="button"
                    onClick={(e) => handleBulkAction(e, 'revoke')}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                    <FiX size={16} />
                    Revoke All Access
                </button>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200 font-semibold text-gray-700">
                    <div className="col-span-4">Module</div>
                    <div className="col-span-2 text-center">Access</div>
                    <div className="col-span-6 grid grid-cols-4 gap-4 text-center">
                        <span>Create</span>
                        <span>Read</span>
                        <span>Update</span>
                        <span>Delete</span>
                    </div>
                </div>

                <div className="divide-y divide-gray-100">
                    {parentModules.map((parentName) => {
                        const childModules = Object.values(allModules).filter(
                            module => module.parentModuleName === parentName && !module.isParent
                        );
                        const isExpanded = expandedModules.has(parentName);
                        const allChildrenAccess = childModules.length > 0 && childModules.every(
                            child => modulePrivileges[child.label]?.access
                        );
                        const parentModule = allModules[parentName];
                        const ParentIcon = parentModule?.icon;

                        const parentHasOwnPermissions = parentModule.permissionTypes && 
                            parentModule.permissionTypes.some(pt => 
                                ['create', 'read', 'update', 'delete'].includes(pt)
                            );

                        return (
                            <div key={parentName} className="bg-blue-50/30">
                                <div className="px-6 py-4 hover:bg-blue-50/50 transition-colors">
                                    <div className="grid grid-cols-12 gap-4 items-center">
                                        <div className="col-span-4 flex items-center gap-3">
                                            {childModules.length > 0 && (
                                                <button
                                                    onClick={(e) => handleParentToggle(e, parentName)}
                                                    className="p-1 hover:bg-white rounded transition-colors"
                                                >
                                                    {isExpanded ?
                                                        <FiChevronDown className="text-gray-600" /> :
                                                        <FiChevronRight className="text-gray-600" />
                                                    }
                                                </button>
                                            )}
                                            <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                                                {renderIcon(ParentIcon)}
                                            </div>
                                            <span className="font-medium text-blue-900">
                                                {parentName}
                                            </span>
                                            {childModules.length > 0 && (
                                                <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full border">
                                                    {childModules.length} modules
                                                </span>
                                            )}
                                        </div>

                                        <div className="col-span-2 flex justify-center">
                                            {childModules.length > 0 ? (
                                                <div className="flex items-center gap-2">
                                                    <PermissionCheckbox
                                                        checked={allChildrenAccess}
                                                        onChange={() => toggleAllChildPermissions(parentName, !allChildrenAccess)}
                                                        type="access"
                                                    />
                                                </div>
                                            ) : (
                                                <PermissionCheckbox
                                                    checked={modulePrivileges[parentName]?.access || false}
                                                    onChange={() => toggleModulePrivilege(parentName, 'access')}
                                                    type="access"
                                                />
                                            )}
                                        </div>

                                        {childModules.length === 0 && parentHasOwnPermissions && (
                                            <div className="col-span-6 grid grid-cols-4 gap-4">
                                                {['create', 'read', 'update', 'delete'].map((permission) => (
                                                    <div key={permission} className="flex justify-center">
                                                        {parentModule.permissionTypes.includes(permission) && (
                                                            <PermissionCheckbox
                                                                checked={modulePrivileges[parentName]?.[permission] || false}
                                                                onChange={() => toggleModulePrivilege(parentName, permission)}
                                                                disabled={!modulePrivileges[parentName]?.access}
                                                            />
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {childModules.length > 0 && (
                                            <div className="col-span-6 flex items-center justify-center">
                                                <div className="text-xs text-gray-500 text-center">
                                                    Manage permissions in individual modules
                                                </div>
                                            </div>
                                        )}

                                        {childModules.length === 0 && !parentHasOwnPermissions && (
                                            <div className="col-span-6 flex items-center justify-center">
                                                <div className="text-xs text-gray-500 text-center">
                                                    This module doesn't have individual permissions
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {isExpanded && childModules.length > 0 && (
                                    <div className="ml-8 mr-4 space-y-2 pb-4">
                                        {childModules.map((child) => {
                                            const ChildIcon = child.icon;
                                            const permissions = modulePrivileges[child.label] || {};

                                            return (
                                                <div key={child.label} className="grid grid-cols-12 gap-4 items-center py-3 px-4 bg-white rounded-lg border border-gray-100 hover:border-blue-200 transition-colors mx-4">
                                                    <div className="col-span-4 flex items-center gap-3">
                                                        <div className="p-1.5 rounded-md bg-gray-50 text-gray-600">
                                                            {renderIcon(ChildIcon)}
                                                        </div>
                                                        <span className="text-gray-700">{child.label}</span>
                                                    </div>

                                                    <div className="col-span-2 flex justify-center">
                                                        <PermissionCheckbox
                                                            checked={permissions.access || false}
                                                            onChange={() => toggleModulePrivilege(child.label, 'access')}
                                                            type="access"
                                                        />
                                                    </div>

                                                    <div className="col-span-6 grid grid-cols-4 gap-4">
                                                        {['create', 'read', 'update', 'delete'].map((permission) => (
                                                            <div key={permission} className="flex justify-center">
                                                                {child.permissionTypes.includes(permission) && (
                                                                    <PermissionCheckbox
                                                                        checked={permissions[permission] || false}
                                                                        onChange={() => toggleModulePrivilege(child.label, permission)}
                                                                        disabled={!permissions.access}
                                                                    />
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <div className="flex items-center justify-between">
                        <span className="text-blue-700 font-medium">Total Modules</span>
                        <span className="text-blue-900 font-bold text-xl">
                            {Object.values(allModules).filter(module => !module.isParent).length}
                        </span>
                    </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <div className="flex items-center justify-between">
                        <span className="text-green-700 font-medium">Access Granted</span>
                        <span className="text-green-900 font-bold text-xl">
                            {Object.values(modulePrivileges).filter(p => p.access).length}
                        </span>
                    </div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                    <div className="flex items-center justify-between">
                        <span className="text-purple-700 font-medium">Permissions</span>
                        <span className="text-purple-900 font-bold text-xl">
                            {Object.values(modulePrivileges).reduce((total, module) =>
                                total + ['create', 'read', 'update', 'delete'].filter(p => module[p]).length, 0
                            )}
                        </span>
                    </div>
                </div>
            </div>

            {Object.keys(accessErrors).length > 0 && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-2 text-red-700 mb-2">
                        <FiX className="w-5 h-5" />
                        <span className="font-semibold">Action Required</span>
                    </div>
                    <p className="text-red-600 text-sm mb-2">The following modules have access enabled but no permissions selected:</p>
                    <ul className="list-disc list-inside text-red-500 text-sm">
                        {Object.entries(accessErrors).map(([moduleName, error]) => (
                            <li key={moduleName}>
                                <strong>{moduleName}</strong> - {error}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default PermissionTable;