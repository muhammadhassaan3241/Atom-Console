module.exports = {

    adminURL: {
        adminLogin: "/login"
    },

    userURL: {
        getUsers: "/users",
        getUserByResellerId: "/user/:reseller",
        createUser: "/create",
        updateUser: "/update/:id",
        deleteUser: "/delete/:id",
    },

    roleURL: {
        getRoles: "/roles",
        createRole: "/create",
        updateRole: "/update",
        deleteRole: "/delete",
    },

    permissionURL: {
        getPermissions: "/permissions",
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
        getVpnProtocolList: "/protocol-users",
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
        updatePreferenceOfVpnAccount: "/update-preference",
        updatePreferenceOfVpnAccount: "/update-preference",
        getUserInventory: "/inventory",
        getUsers: "/users",
    },

    chargifyURL: {
        getInvoices: "/invoices.json",
        getPricePoints: "/components"

    },

    partnerBillingURL: {
        getResellerBillings: "/reseller/billing",
    },

    elasticSearchURL: {
        getResellerConnectedUsers: "/networklogs/getResellerConnectedUsers",
    },

    atomVapURL: {
        getVpnActiveUsers: "/vap/v1//listUsers",
    },

    atomVamURL: {
        getVpnAccountStatus: "/vam/v1/status",
        createVpnAccount: "/vam/v1/create",
        renewVpnAccount: "/vam/v1/renew",
        deleteVpnAccount: "/vam/v1/delete",
        extendExpiryOfVpnAccount: "/vam/v1/extendExpiry",
        updatePreferencesOfVpnAccount: "/vam/v1/updatePreferences",
        changePasswordOfVpnAccount: "/vam/v1/changePassword",
        enableVpnAccount: "/vam/v1/enable",
        disableVpnAccount: "/vam/v1/disable",
        getUserInventory: "/vam/v1/getResellerInventory",
        getUsers: "/vam/v1/listUsers",
    },
}