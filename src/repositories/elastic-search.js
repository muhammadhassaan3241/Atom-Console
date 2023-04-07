const { default: axios } = require("axios");

class ElasticSeacrchRepository {
  async getResellerConnectedUsers(queryStrings, headers) {
    const { data } = await axios.get(
      `${process.env.ELASTIC_SEARCH_BASE_URL}/networklogs/getResellerConnectedUsers${queryStrings}`,
      { headers }
    );
    return data;
  }

  async getresellerConnectedUsersList(queryStrings, headers) {
    const { data } = await axios.get(
      `${process.env.ELASTIC_SEARCH_BASE_URL}/networklogs/getResellerConnectedUsersList${queryStrings}`,
      { headers }
    );
    return data;
  }
}

const elasticSearchInstance = new ElasticSeacrchRepository();
module.exports = elasticSearchInstance;
