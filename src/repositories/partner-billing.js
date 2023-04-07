const { default: axios } = require("axios");

class PartnerBillingRepository {
  async resellerBilling(headers) {
    const { data } = await axios.get(
      `${process.env.PARTNER_BILLING_BASE_URL}/reseller/billing`,
      { headers }
    );
    return data;
  }
}

const partnerBillingInstance = new PartnerBillingRepository();
module.exports = partnerBillingInstance;
