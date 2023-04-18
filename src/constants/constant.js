module.exports = {
  adminURL: {
    adminLogin: "/login",
  },

  userURL: {
    getUsers: "/users",
    getUserByResellerId: "/user/:parentId",
    createUser: "/create",
    updateUser: "/update/:id",
    deleteUser: "/delete/:id",
  },

  roleURL: {
    getRoles: "/roles",
    getRoleByRoleId: "/roles/:id",
    createRole: "/create",
    updateRole: "/update",
    deleteRole: "/delete",
  },

  permissionURL: {
    getPermissions: "/permissions",
    getPermissionByPermissionId: "/permissions/:id",
    createPermission: "/create",
    updatePermission: "/update",
    deletePermission: "/delete",
  },

  billingURL: {
    getVpnInvoicesUrl: "/invoices",
    getVpnBillingEstimation: "/get-billing-estimation",
    getVpnActiveUsers: "/active-users",
    getConnectedUsers: "/connected-users",
  },

  dashboardURL: {
    getVpnMonthlyUsers: "/monthly-users",
    getVpnProtocolList: "/protocol-list",
    getVpnUserSourceCountry: "/source-country",
    getVpnUsersDestinationCountry: "/destination-country",
  },

  vpnAccountManagementURL: {
    getVpnAccount: "/users",
    getVpnAccount: "/inventory",
    getVpnAccountStatus: "/status",
    deleteVpnAccount: "/delete",
    createVpnAccount: "/create",
    renewVpnAccount: "/renew",
    extendExpiryOfVpnAccount: "/extend-expiry",
    changePasswordOfVpnAccount: "/change-password",
    enable_disableVpnAccount: "/enable-disable",
    updatePreferenceOfVpnAccount: "/update-preferences",
    getUserInventory: "/inventory",
    getUsers: "/users",
    getUser:"/user",
    getServiceTypes: "/getServices",
  },
};
