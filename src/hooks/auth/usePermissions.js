// hooks/auth/usePermissions.js
import { useEffect, useState } from "react";
import { useRolesAccess } from "./useRolesAccess";

const usePermissions = (subAdminAccess, moduleName) => {
  const { isAdminLoggedIn } = useRolesAccess();

  const getDefaultPermissions = () => ({
    canCreate: isAdminLoggedIn,
    canRead: isAdminLoggedIn,
    canUpdate: isAdminLoggedIn,
    canDelete: isAdminLoggedIn,
  });

  const [permissions, setPermissions] = useState(getDefaultPermissions());

  useEffect(() => {
    if (isAdminLoggedIn) {
      setPermissions({
        canCreate: true,
        canRead: true,
        canUpdate: true,
        canDelete: true,
      });
      return;
    }

    if (subAdminAccess && Array.isArray(subAdminAccess)) {
      console.log("SubAdmin Access:", subAdminAccess);
      const module = subAdminAccess.find(
        (m) => m.moduleName === moduleName || m.parentModuleName === moduleName
      );

      if (module) {
        setPermissions({
          canCreate: module.accessTypes?.includes("create") ?? false,
          canRead: module.accessTypes?.includes("read") ?? false,
          canUpdate: module.accessTypes?.includes("update") ?? false,
          canDelete: module.accessTypes?.includes("delete") ?? false,
        });
      } else {
        // If module not found in subAdminAccess, set all permissions to false
        setPermissions({
          canCreate: false,
          canRead: false,
          canUpdate: false,
          canDelete: false,
        });
      }
    }
  }, [subAdminAccess, moduleName, isAdminLoggedIn]);

  return permissions;
};
export default usePermissions;
