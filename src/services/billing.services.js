// modules
import axios from "axios";
import { getCurrencySymbol, getformatedInvoiceMonth, getFormattedPaymentDate, getMonthStartEndDates, getMonthYear } from "../middlewares/formatMonth.middleware.js";
import { User } from "../models/user.model.js";

// SUBSCRIPTION_SERVICES

// findAll
export default {
    getInvoices: async (callback) => {
        try {
            const headers = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': process.env.CHARGIFY_AUTH_TOKEN
                }
            };

            const invoicePath = process.env.CHARGIFY_BASE_URL + `/invoices.json`

            await axios.get(invoicePath, headers)
                .then((billing) => {

                    const filteredData = [];

                    billing.data.invoices.map((invoice) => {

                        filteredData.push({
                            invoice_uid: invoice.uid,
                            amount: `${getCurrencySymbol(invoice.currency)}${invoice.total_amount}`,
                            invoice_month: getformatedInvoiceMonth(invoice.created_at),
                            payment_date: getFormattedPaymentDate(invoice.created_at),
                            status: invoice.status,
                            action: invoice.public_url,
                            details: invoice.public_url,
                        })
                    });
                    (filteredData !== null)
                        ? callback(filteredData, 200, "1", "Invoices Found Successfully")
                        : callback(filteredData, 404, "0", "Invoices Not Found");
                })

        } catch (error) {

        }
    },

    getVpnActiveUsers: async (queryStrings, resellerId, callback) => {

        const reseller_id = resellerId;
        const page = queryStrings.page;
        const limit = queryStrings.limit;

        try {
            const active_user_vpn_headers = {
                headers: {
                    "Content-Type": "application/json",
                    " X-AccessToken": process.env.WEB_ACCESS_TOKEN,
                }
            };

            await axios.get(`${process.env.ACIVE_USERS_BASE_URL}/vap/v1/listUsers?iResellerId=${reseller_id}&iPage=${page || 1}&iLimit=${limit || 10000}`, active_user_vpn_headers)
                .then(({ data }) => {
                    console.log(data);
                    const body = data.body.data
                    const usernames = [];
                    body.forEach(element => {
                        usernames.push({ username: element.username })
                    });
                    return callback(usernames, 200, "1", "Active Vpn Users Found Successfully")

                }).catch((e) => {
                    return callback([], 404, "0", "Active Vpn Users Not Found")
                })

        } catch (error) {
            return response
                .status(500)
                .send({
                    status: "0",
                    message: "Internal Server Error"
                })
        }
    },

    getVpnConnectedUsers: async (queryStrings, resellerId, callback) => {

        const reseller_id = resellerId;
        const fromDate = queryStrings.FromDate;
        const toDate = queryStrings.ToDate;

        try {
            const connected_user_vpn_headers = {
                headers: {
                    "Content-Type": "application/json",
                }
            };

            await axios.get(`${process.env.CONNECTED_USERS_BASE_URL}/networklogs/getResellerConnectedUsersList?IResellerId=${reseller_id}&sFromDate=${fromDate}&sToDate=${toDate}`, connected_user_vpn_headers)
                .then(({ data }) => {
                    const body = data.body;
                    const usernames = [];
                    body.forEach(element => {
                        usernames.push({ username: element })
                    });
                    return callback(usernames, 200, "1", "Connected Vpn Users Found Successfully")
                }).catch((e) => {
                    return callback([], 404, "0", "Connected Vpn Users Not Found")
                })

        } catch (error) {
            return response
                .status(500)
                .send({
                    status: "0",
                    message: "Internal Server Error"
                })
        }
    },

    getGraphData: async (resellerId, subscriptionType, queryStrings, callback) => {
        try {

            let paidUserComponentId, paidUserComponentSlug;
            let trialUserComponentId, trialUserComponentSlug;
            let connectedUserComponentId, connectedUserComponentSlug;
            let activeAccountComponentId, activeAccountComponentSlug;
            let paidUserUnitPrice, trialUserUnitPrice, connectedUserUnitPrice, activeUserUnitPrice;
            let userAccountsTotalCost = [];

            let startDateMonth = queryStrings.from_date;
            let endDateMonth = queryStrings.to_date;

            const resellerBillingHeaders = {
                headers: {
                    "Content-Type": "application/json"
                }
            };

            await axios.get(`${process.env.PARTNER_BILL_BASE_URL}/reseller/billing`, resellerBillingHeaders)
                .then(({ data }) => {
                    const body = data.body;
                    body.forEach(element => {
                        if (element.reseller_id === resellerId) {
                            if (element.subscription_slug === subscriptionType) {
                                if (element.component_slug === "paid") {
                                    paidUserComponentId = element.component_id;
                                    paidUserComponentSlug = element.component_slug;
                                }
                                if (element.component_slug === "trial") {
                                    trialUserComponentId = element.component_id;
                                    trialUserComponentSlug = element.component_slug;
                                }
                                if (element.component_slug === "connected") {
                                    connectedUserComponentId = element.component_id;
                                    connectedUserComponentSlug = element.component_slug;
                                }
                                if (element.component_slug === "active-account") {
                                    activeAccountComponentId = element.component_id;
                                    activeAccountComponentSlug = element.component_slug;
                                }
                            }
                        }
                    });
                })

            const billingAccounts = [{
                subscriptionType,
                paidUserComponentId,
                paidUserComponentSlug,
                trialUserComponentId,
                trialUserComponentSlug,
                connectedUserComponentId,
                connectedUserComponentSlug,
                activeAccountComponentId,
                activeAccountComponentSlug,
            }].map(obj =>
                Object.fromEntries(
                    Object.entries(obj).filter(([_, v]) => v !== undefined)
                )
            );

            Promise.all(billingAccounts.map(async (account) => {
                try {
                    if (account.subscriptionType === "connection-based") {
                        const paid = account.paidUserComponentId;
                        const trial = account.trialUserComponentId;
                        const connected = account.connectedUserComponentId;

                        const chargifyHeaders = {
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": "Basic empwQ1JpTXdVSWxoTVhjOFFDWDVrVE1reUdhTzFYbWhTcHM4WHJtd1U6Kg=="
                            }
                        }
                        if (paid !== undefined) {
                            await axios.get(`${process.env.CHARGIFY_BASE_URL}/components/${paid}/price_points.json`, chargifyHeaders)
                                .then(({ data }) => {
                                    const body = data.price_points;
                                    body.forEach(element => {
                                        const prices = element.prices;
                                        prices.forEach(element => {
                                            paidUserUnitPrice = element.unit_price;
                                        });
                                    });
                                }).catch(() => {
                                    callback([], 404, "0", "Paid Users Not Found")
                                })
                        }

                        if (trial !== undefined) {
                            await axios.get(`${process.env.CHARGIFY_BASE_URL}/components/${trial}/price_points.json`, chargifyHeaders)
                                .then(({ data }) => {
                                    const body = data.price_points;
                                    body.forEach(element => {
                                        const prices = element.prices;
                                        prices.forEach(element => {
                                            trialUserUnitPrice = element.unit_price;
                                        });
                                    });
                                }).catch(() => {
                                    callback([], 404, "0", "Trial Users Not Found")
                                })
                        }

                        if (paid === undefined && trial === undefined && connected !== undefined) {
                            await axios.get(`${process.env.CHARGIFY_BASE_URL}/components/${connected}/price_points.json`, chargifyHeaders)
                                .then(({ data }) => {
                                    const body = data.price_points;
                                    body.forEach(element => {
                                        const prices = element.prices;
                                        prices.forEach(element => {
                                            connectedUserUnitPrice = element.unit_price;
                                        });
                                    });
                                }).catch(() => {
                                    callback([], 404, "0", "Connected Users Not Found")
                                })
                        }

                        const elasticSearchHeaders = {
                            headers: {
                                "Content-Type": "application/json"
                            }
                        }

                        const getMonthStartAndEndDates = getMonthStartEndDates(startDateMonth, endDateMonth);

                        for (const months of getMonthStartAndEndDates) {
                            const { startDate, endDate } = months;

                            await axios.get(`${process.env.ELASTIC_SEARCH_BASE_URL}/networklogs/getResellerConnectedUsers?IResellerId=${resellerId}&sFromDate=${startDate}&sToDate=${endDate}`, elasticSearchHeaders)
                                .then(({ data }) => {
                                    userAccountsTotalCost.push({
                                        month: getMonthYear(startDate, endDate),
                                        total_cost_of_paid_accounts: data.body.paid * paidUserUnitPrice || 0,
                                        total_cost_of_trial_accounts: data.trial * trialUserUnitPrice || 0,
                                        total_cost_of_connected_accounts: data.connected * connectedUserUnitPrice || 0,
                                    })
                                }).catch(() => {
                                    callback([], 404, "0", "No Data Found For Given Period")
                                })
                        }
                    }

                    else {
                        const active = account.activeAccountComponentId;

                        const chargifyHeaders = {
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": "Basic empwQ1JpTXdVSWxoTVhjOFFDWDVrVE1reUdhTzFYbWhTcHM4WHJtd1U6Kg=="
                            }
                        }

                        if (active !== undefined) {
                            await axios.get(`${process.env.CHARGIFY_BASE_URL}/components/${active}/price_points.json`, chargifyHeaders)
                                .then(({ data }) => {
                                    const body = data.price_points;
                                    body.forEach(element => {
                                        const prices = element.prices;
                                        prices.forEach(element => {
                                            activeUserUnitPrice = element.unit_price;
                                        });
                                    });
                                }).catch(() => {
                                    callback([], 404, "0", "Active Users Not Found")
                                })
                        }

                        const elasticSearchHeaders = {
                            headers: {
                                "Content-Type": "application/json",
                                "X-AccessToken": process.env.WEB_ACCESS_TOKEN,
                            }
                        }

                        const getMonthStartAndEndDates = getMonthStartEndDates(startDateMonth, endDateMonth);

                        for (const months of getMonthStartAndEndDates) {
                            const { startDate, endDate } = months;

                            await axios.get(`${process.env.ELASTIC_SEARCH_BASE_URL}/networklogs/getResellerConnectedUsers?IResellerId=${resellerId}&sFromDate=${startDate}&sToDate=${endDate}`, elasticSearchHeaders)
                                .then(({ data }) => {
                                    userAccountsTotalCost.push({
                                        month: getMonthYear(startDate, endDate),
                                        total_cost_of_active_accounts: data.body.connected * activeUserUnitPrice || 0,
                                    })
                                }).catch(() => {
                                    callback([], 404, "0", "No Data Found For Given Period")
                                })
                        }

                    }

                    return callback(userAccountsTotalCost, 404, "0", "Cost Of Monthly Account Record Found Sucessfully")

                } catch (error) {
                    return callback([], 500, "0", "Internal Server Error")
                }
            }))

        } catch (error) {
            console.log(error);
        }
    },

}

export const getUserSubscriptionType = async (request, response, next) => {

    const reseller_billing_headers = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    await User.findOne({ where: { email: request.body.email } })
        .then(async (user) => {
            await axios.get(`${process.env.PARTNER_BILL_BASE_URL}/reseller/billing`, reseller_billing_headers)
                .then(async ({ data }) => {
                    const body = data.body;
                    body.forEach(async (element) => {
                        if (element.reseller_id === user.reseller_id) {
                            user.subscription_type = element.subscription_slug
                            await user.save()
                        }
                    })
                }).catch((e) => {
                    return "User Not Found"
                })
        }).catch((e) => {
            return "Axios Error"
        })
    next()
}
