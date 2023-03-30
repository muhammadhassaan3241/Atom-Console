// module
import vpnAccountManagementServices from '../services/vpn-account-management.services.js';

// VPN_MANAGEMENT_CONTROLLER
export const getVpnUserStatus = (request, response) => {
  try {
    const username = request.body;
    vpnAccountManagementServices.getVpnUserStatus(
      username,
      (data, statusCode, customStatus, customMessage) => {
        return response.status(statusCode).send({
          status: customStatus,
          message: customMessage,
          data: data,
        });
      }
    );
  } catch (error) {
    return response.status(statusCode).send({
      message: customMessage,
    });
  }
};

export const deleteVpnUser = (request, response) => {
  try {
    const username = request.body;
    vpnAccountManagementServices.deleteVpnUserStatus(
      username,
      (data, statusCode, customStatus, customMessage) => {
        return response.status(statusCode).send({
          status: customStatus,
          message: customMessage,
          data: data,
        });
      }
    );
  } catch (error) {
    return response.status(statusCode).send({
      message: customMessage,
    });
  }
};

export const renewVpnUser = (request, response) => {
  try {
    const body = request.body;
    vpnAccountManagementServices.renewVpnUserStatus(
      body,
      (data, statusCode, customStatus, customMessage) => {
        return response.status(statusCode).send({
          status: customStatus,
          message: customMessage,
          data: data,
        });
      }
    );
  } catch (error) {
    return response.status(statusCode).send({
      message: customMessage,
    });
  }
};

export const extendExpiryOfVpnUser = (request, response) => {
  try {
    const body = request.body;
    vpnAccountManagementServices.extendExpiryOfVpnUserStatus(
      body,
      (data, statusCode, customStatus, customMessage) => {
        return response.status(statusCode).send({
          status: customStatus,
          message: customMessage,
          data: data,
        });
      }
    );
  } catch (error) {
    return response.status(statusCode).send({
      message: customMessage,
    });
  }
};

export const changePasswordOfVpnUser = (request, response) => {
  try {
    const body = request.body;
    vpnAccountManagementServices.changePasswordOfVpnUserStatus(
      body,
      (data, statusCode, customStatus, customMessage) => {
        return response.status(statusCode).send({
          status: customStatus,
          message: customMessage,
          data: data,
        });
      }
    );
  } catch (error) {
    return response.status(statusCode).send({
      message: customMessage,
    });
  }
};

export const enableVpnUser = (request, response) => {
  try {
    const body = request.body;
    vpnAccountManagementServices.enableVpnUserStatus(
      body,
      (data, statusCode, customStatus, customMessage) => {
        return response.status(statusCode).send({
          status: customStatus,
          message: customMessage,
          data: data,
        });
      }
    );
  } catch (error) {
    return response.status(statusCode).send({
      message: customMessage,
    });
  }
};

export const disableVpnUser = (request, response) => {
  try {
    const body = request.body;
    vpnAccountManagementServices.disableVpnUserStatus(
      body,
      (data, statusCode, customStatus, customMessage) => {
        return response.status(statusCode).send({
          status: customStatus,
          message: customMessage,
          data: data,
        });
      }
    );
  } catch (error) {
    return response.status(statusCode).send({
      message: customMessage,
    });
  }
};

export const createVpnUser = (request, response) => {
  try {
    const body = {
      packageType: request.body.packageType,
      period: request.body.period,
      uuid: request.body.uuid,
      // preferences: request.body.preferences,
      // isDedicated: request.body.isDedicated,
      // dedicatedCountry: request.body.dedicatedCountry,
      vpnUsername: request.body.vpnUsername,
      vpnPassword: request.body.vpnPassword,
    };
    vpnAccountManagementServices.createVpnUserStatus(
      body,
      (data, statusCode, customStatus, customMessage) => {
        return response.status(statusCode).send({
          status: customStatus,
          message: customMessage,
          data: data,
        });
      }
    );
  } catch (error) {
    return response.status(statusCode).send({
      message: customMessage,
    });
  }
};

export const updatePreferencesofVpnUser = (request, response) => {
  try {
    const body = request.body;
    vpnAccountManagementServices.updatePreferencesVpnUserStatus(
      body,
      (data, statusCode, customStatus, customMessage) => {
        return response.status(statusCode).send({
          status: customStatus,
          message: customMessage,
          data: data,
        });
      }
    );
  } catch (error) {
    return response.status(statusCode).send({
      message: customMessage,
    });
  }
};
