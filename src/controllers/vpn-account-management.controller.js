// module
import vpnAccountManagementServices from '../services/vpn-account-management.services.js';

// VPN_MANAGEMENT_CONTROLLER
export const getVpnUserStatus = async (request, response) => {
  try {
    const username = request.body;
    const reseller_id = request.user.reseller_id;
    await vpnAccountManagementServices.getVpnUserStatus(username, reseller_id, (data, statusCode, customStatus, customMessage) => {
      return response
        .status(statusCode)
        .send({
          status: customStatus,
          message: customMessage,
          data: data
        })
    })
  } catch (error) {
    return response
      .status(statusCode)
      .send({
        message: customMessage,
      })
  }
}

export const deleteVpnUser = async (request, response) => {
  try {
    const username = request.body;
    const reseller_id = request.user.reseller_id;
    await vpnAccountManagementServices.deleteVpnUser(username, reseller_id, (data, statusCode, customStatus, customMessage) => {
      return response
        .status(statusCode)
        .send({
          status: customStatus,
          message: customMessage,
          data: data
        })
    })
  } catch (error) {
    return response
      .status(statusCode)
      .send({
        message: customMessage,
      })
  }
}

export const renewVpnUser = async (request, response) => {
  try {
    const body = request.body;
    const reseller_id = request.user.reseller_id;
    await vpnAccountManagementServices.renewVpnUser(body, reseller_id, (data, statusCode, customStatus, customMessage) => {
      return response
        .status(statusCode)
        .send({
          status: customStatus,
          message: customMessage,
          data: data
        })
    })
  } catch (error) {
    return response
      .status(statusCode)
      .send({
        message: customMessage,
      })
  }
}

export const extendExpiryOfVpnUser = async (request, response) => {
  try {
    const body = request.body;
    const reseller_id = request.user.reseller_id;
    await vpnAccountManagementServices.extendExpiryOfVpnUser(body, reseller_id, (data, statusCode, customStatus, customMessage) => {
      return response
        .status(statusCode)
        .send({
          status: customStatus,
          message: customMessage,
          data: data
        })
    })
  } catch (error) {
    return response
      .status(statusCode)
      .send({
        message: customMessage,
      })
  }
}

export const changePasswordOfVpnUser = async (request, response) => {
  try {
    const body = request.body;
    const reseller_id = request.user.reseller_id;
    await vpnAccountManagementServices.changePasswordOfVpnUser(body, reseller_id, (data, statusCode, customStatus, customMessage) => {
      return response
        .status(statusCode)
        .send({
          status: customStatus,
          message: customMessage,
          data: data
        })
    })
  } catch (error) {
    return response
      .status(statusCode)
      .send({
        message: customMessage,
      })
  }
}

export const enable_disableVpnUser = async (request, response) => {
  try {
    const body = request.body;
    const action = request.body.action;
    const reseller_id = request.user.reseller_id;
    await vpnAccountManagementServices.enable_disableVpnUser(body, action, reseller_id, (data, statusCode, customStatus, customMessage) => {
      return response
        .status(statusCode)
        .send({
          status: customStatus,
          message: customMessage,
          data: data
        })
    })
  } catch (error) {
    return response
      .status(statusCode)
      .send({
        message: customMessage,
      })
  }
}

export const createVpnUser = async (request, response) => {
  try {
    const body = request.body;
    const reseller_id = request.user.reseller_id;
    await vpnAccountManagementServices.createVpnUser(body, reseller_id, (data, statusCode, customStatus, customMessage) => {
      return response
        .status(statusCode)
        .send({
          status: customStatus,
          message: customMessage,
          data: data
        })
    })
  } catch (error) {
    return response
      .status(statusCode)
      .send({
        message: customMessage,
      })
  }
}

export const updatePreferencesofVpnUser = async (request, response) => {
  try {
    const body = request.body;
    const reseller_id = request.user.reseller_id;
    await vpnAccountManagementServices.updatePreferencesVpnUser(body, reseller_id, (data, statusCode, customStatus, customMessage) => {
      return response
        .status(statusCode)
        .send({
          status: customStatus,
          message: customMessage,
          data: data
        })
    })
  } catch (error) {
    return response
      .status(statusCode)
      .send({
        message: customMessage,
      })
  }
}

export const getVpnUserInventory = async (request, response) => {
  try {
    const resellerId = request.user.reseller_id;

    await vpnAccountManagementServices.getVpnUserInventory(resellerId, (data, statusCode, customStatus, customMessage) => {
      return response
        .status(statusCode)
        .send({
          status: customStatus,
          message: customMessage,
          data: data
        })
    })
  } catch (error) {
    return response
      .status(statusCode)
      .send({
        message: customMessage,
      })
  }
};

export const getVpnUsers = async (request, response) => {
  try {
    const resellerId = request.user.reseller_id;
    vpnAccountManagementServices.getVpnUsers(resellerId, (data, statusCode, customStatus, customMessage) => {
      return response
        .status(statusCode)
        .send({
          status: customStatus,
          message: customMessage,
          data,
        })
    })
  } catch (error) {
    return
  }
}
