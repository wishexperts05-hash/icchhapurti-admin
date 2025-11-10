export const useRolesAccess = () => {
    const isAdminLoggedIn = sessionStorage.getItem("isAdminLoggedIn") === 'true';
    const isSubAdminLoggedIn = sessionStorage.getItem("isSubAdminLoggedIn") === 'true';

  return {isAdminLoggedIn, isSubAdminLoggedIn};
}
