const { default: axios } = require("axios");

class ChargifyRepository {
  async invoices(headers) {
    const { data } = await axios.get(
      `${process.env.CHARGIFY_BASE_URL}/invoices.json`,
      { headers }
    );
    return data;
  }

  async price_points(componentId, headers) {
    const { data } = await axios.get(
      `${process.env.CHARGIFY_BASE_URL}/components/${componentId}/price_points.json`,
      { headers }
    );
    console.log(data);
    return data;
  }
}

const chargifyInstance = new ChargifyRepository();
module.exports = chargifyInstance;
