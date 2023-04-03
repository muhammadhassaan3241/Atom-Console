import axios from "axios"
import fs from "fs";

export default {
    getMonthlyConnectedUsers: async (resellerId, callback) => {
        try {
            const reseller_id = resellerId;

            const today = new Date();

            const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

            const formattedFirstDay = `${firstDayOfMonth.getFullYear()}-${(firstDayOfMonth.getMonth() + 1).toString().padStart(2, '0')}-${firstDayOfMonth.getDate().toString().padStart(2, '0')}`;

            const formattedCurrentDay = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

            await axios.get(`${process.env.ELASTIC_SEARCH_BASE_URL}/networklogs/getResellerConnectedUsers?IResellerId=${reseller_id}&sFromDate=${formattedFirstDay}&sToDate=${formattedCurrentDay}`)
                .then(({ data }) => {
                    callback(data.body, 200, "1", "Monthly Users Found Successfully")
                })
            return
        } catch (error) {
            return callback([], 404, "0", "Monthly Users Not Found")
        }
    },

    getProtocolList: async (resellerId, callback) => {
        try {
            fs.readFile("connectedProtocolWise.json", (error, data) => {
                if (error) {
                    callback(body, 404, "0", "Protocol List Not Found")
                } else {
                    const body = [];
                    const jsonData = JSON.parse(data);
                    jsonData.body.filter((list) => {
                        body.push({
                            tunnel_name: list.TunnelTypeName,
                            total_unique_users: list.TotalUniqueUsers,
                            total_users: list.TotalUsers,
                        })
                    })
                    callback(body, 200, "1", "Protocol List Found Successfully")
                }
            })
            return
        } catch (error) {
            return callback([], 500, "0", "Internal Server Error")
        }
    },

    getUserSourceContry: async (resellerId, callback) => {
        try {
            fs.readFile("getCurrentLoadwrtSources.json", (error, data) => {
                if (error) {
                    return callback(body, 404, "0", "User Source Country List Not Found")
                } else {
                    const jsonData = JSON.parse(data);
                    return callback(jsonData.body.slice(0, 12), 200, "1", "User Source Country List Found Successfully")
                }
            })

        } catch (error) {
            return callback([], 500, "0", "Internal Server Error")
        }
    },

    getUserDestinationCountry: async (resellerId, callback) => {
        try {
            fs.readFile("getCurrentLoadwrtDestination.json", (error, data) => {
                if (error) {
                    callback(body, 404, "0", "User Destination Country List Not Found")
                } else {
                    const jsonData = JSON.parse(data);
                    callback(jsonData.body.slice(0, 12), 200, "1", "User Destination Country List Found Successfully")
                }
            })
            return
        } catch (error) {
            return callback([], 500, "0", "Internal Server Error")
        }
    },
}