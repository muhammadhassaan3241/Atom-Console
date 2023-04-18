const { default: axios } = require('axios');

class AtomInventoryRepository {
  async getAllServiceTypes(headers) {
    console.log(`${process.env.ATOM_BASE_URL}/inventory/v1/getAllServiceTypes`);
    const { data } = await axios.get(
      `${process.env.ATOM_BASE_URL}/inventory/v1/getAllServiceTypes`,
      { headers }
    );
    return data;
  }
}

class AtomVapRepository {
  async getUsersList(queryString, headers) {
    const { data } = await axios.get(
      `${process.env.ATOM_BASE_URL}/vap/v1/listUsers${queryString}`,
      { headers }
    );
    return data;
  }

  async getActiveUsersList(queryString, headers) {
    const { data } = await axios.get(
      `${process.env.ATOM_BASE_URL}/vap/v1/reseller/active/users${queryString}`,
      { headers }
    );
    return data;
  }

  async getUser(queryString, headers) {
    const { data } = await axios.get(
      `${process.env.ATOM_BASE_URL}/vap/v1/getUser${queryString}`,
      { headers }
    );
    return data;
  }
}

class AtomVamRepository {
  async status(formData, headers) {
    const { data } = await axios.post(
      `${process.env.ATOM_BASE_URL}/vam/v1/status`,
      formData,
      { headers }
    );
    return data;
  }

  async create(formData, headers) {
    const { data } = await axios.post(
      `${process.env.ATOM_BASE_URL}/vam/v1/create`,
      formData,
      { headers }
    );
    return data;
  }

  async renew(formData, headers) {
    const { data } = await axios.post(
      `${process.env.ATOM_BASE_URL}/vam/v1/renew`,
      formData,
      { headers }
    );
    console.log(data);
    return data;
  }

  async delete(formData, headers) {
    const { data } = await axios.post(
      `${process.env.ATOM_BASE_URL}/vam/v1/delete`,
      formData,
      { headers }
    );
    return data;
  }

  async extendExpiry(formData, headers) {
    const { data } = await axios
      .post(`${process.env.ATOM_BASE_URL}/vam/v1/extendExpiry`, formData, {
        headers,
      })
      .catch(() => {
        return data.header;
      });
    return data;
  }

  async updatePreferences(formData, headers) {
    const { data } = await axios.post(
      `${process.env.ATOM_BASE_URL}/vam/v1/updatePreferences`,
      formData,
      { headers }
    );
    return data;
  }

  async changePassword(formData, headers) {
    const { data } = await axios.post(
      `${process.env.ATOM_BASE_URL}/vam/v1/changePassword`,
      formData,
      { headers }
    );
    return data;
  }

  async enable(formData, headers) {
    const { data } = await axios.post(
      `${process.env.ATOM_BASE_URL}/vam/v1/enable`,
      formData,
      { headers }
    );
    return data;
  }

  async disable(formData, headers) {
    const { data } = await axios.post(
      `${process.env.ATOM_BASE_URL}/vam/v1/disable`,
      formData,
      { headers }
    );
    return data;
  }

  async getResellerInventory(queryStrings, headers) {
    const { data } = await axios.get(
      `${process.env.ATOM_BASE_URL}/inventory/v1/getResellerInventory${queryStrings}`,
      { headers }
    );
    return data;
  }

  async listUsers(queryStrings, headers) {
    const { data } = await axios.get(
      `${process.env.ATOM_BASE_URL}/vap/v1/listUsers${queryStrings}`,
      { headers }
    );
    return data;
  }
}

const atomInventoryInstance = new AtomInventoryRepository();
const atomVapInstance = new AtomVapRepository();
const atomVamInstance = new AtomVamRepository();

module.exports = {
  atomInventoryInstance: atomInventoryInstance,
  atomVapInstance: atomVapInstance,
  atomVamInstance: atomVamInstance,
};
