async (data, statusCode, customStatus, customMessage) => {
    if (data === null) {
        return response
            .status(statusCode)
            .send({
                status: customStatus,
                message: customMessage,
                data: partnerBillingData,
            })
    } else {
        return async () => {
            try {

                // VARIABLES
                let paidAccountsPricePoints;
                let trialAccountsPricePoints;
                let activeAccountsPricePoints;

                // BASE URLs
                const CHARGIFY_BASE_URL = process.env.CHARGIFY_BASE_URL;
                const ACTIVE_USERS_BASE_URL = process.env.ACTIVE_USERS_BASE_URL;
                const PARTNER_BILLING_BASE_URL = process.env.PARTNER_BILL_BASE_URL;

                // AUTH TOKENS AND SECRET KEYS
                const CHARGIFY_AUTH_TOKEN = process.env.CHARGIFY_AUTH_TOKEN;
                const ACTIVE_USERS_SECRET_KEY = process.env.ACTIVE_USERS_SECRET_KEY;

                // HEADERS 
                const chargifyHeaders = {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }

                // IMPLEMENTATION
                const Promises = data.map(async (bills) => {
                    if (bills.subscriptionType === "active-account") {
                        activeAccountsPricePoints = await axios
                            .get(`${CHARGIFY_BASE_URL}/components/${bills.subscription_type_component_id}/price_points.json`);
                        // .then(({data})=>{

                        // })
                    }
                })

            } catch (error) {

            }
        }
    }
};



export default {
    findAllBills: async (callback) => {
        try {

            // @VARIABLES
            let paidUserComponentId, trialUserComponentId, paidUserComponentSlug, trialUserComponentSlug, subscriptionTypeComponentId, subscriptionType, resellerId;
            let billsData;
            let dataFields = ["component_id", "component_slug", "reseller_id"];

            // @BASE URLs
            const RESELLER_BILLING_BASE_URL = process.env.PARTNER_BILL_BASE_URL;

            // @HEADERS
            const resellerBillingHeaders = {
                headers: {
                    "Content-Type": "application/json"
                }
            };

            // @AXIOS.get ===>>> /reseller/billing
            await axios
                .get(
                    `${RESELLER_BILLING_BASE_URL}/reseller/billing`,
                    resellerBillingHeaders)

                .then(async ({ data }) => {
                    billsData = data.body.filter(bill => dataFields.every(field => bill[field]));

                    await Promise.all(billsData.map(async bill => {

                        await User.findOne({ where: { reseller_id: bill.reseller_id } })
                            .then((user) => {

                                (user !== null && bill.reseller_id === user.reseller_id)
                                    ? (async () => {
                                        resellerId = user.reseller_id;

                                        if (bill.subscription_slug === "trial-to-paid" || bill.subscription_slug === "active-account-based" || bill.subscription_slug === "connection-based") {
                                            if (bill.component_slug === "paid") {
                                                paidUserComponentId = bill.component_id;
                                                paidUserComponentSlug = bill.component_slug;
                                            }
                                            else if (bill.component_slug === "trial") {
                                                paidUserComponentId = bill.component_id;
                                                paidUserComponentSlug = bill.component_slug
                                            }
                                        }
                                        else {
                                            subscriptionTypeComponentId = bill.subscription_type_component_id;
                                            subscriptionType = bill.subscription_type;
                                        }


                                    })()
                                    : callback([], 404, "0", "User Not Found");
                            })
                    }));
                }).catch(() => {
                    callback([], 500, "0", "Internal Server Error")
                })

            // @BILLS DATA
            const billArray = [
                subscriptionTypeComponentId,
                subscriptionType,
                paidUserComponentId,
                paidUserComponentSlug,
                trialUserComponentId,
                trialUserComponentSlug
            ]

            return (billArray.length > 0)
                ? callback(billArray, 200, "0", "Bills Found Successfully") : callback([], 400, "0", "Bills Not Found");


        } catch (error) {
            console.log(error);
        }
    }
}