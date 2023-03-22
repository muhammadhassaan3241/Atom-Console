import axios from "axios"


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
                }).catch(() => {
                    callback([], 404, "0", "Monthly Users Not Found")
                })
            return
        } catch (error) {
            return callback([], 500, "0", "Internal Server Error")
        }
    }
}