

import axios from "axios";
import { getCurrencySymbol, getformatedInvoiceMonth, getFormattedPaymentDate } from "../middlewares/formatMonth.middleware.js";

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
        const page = queryStrings.Page;
        const limit = queryStrings.Limit;

        try {
            const active_user_vpn_headers = {
                headers: {
                    "Content-Type": "application/json",
                    "X-accessToken": process.env.WEB_ACCESS_TOKEN,
                }
            };

            await axios.get(`${process.env.ACIVE_USERS_BASE_URL}/vap/v1/listUsers?iResellerId=${reseller_id}&iPage=${page}&iLimit=${limit}`, active_user_vpn_headers)
                .then(({ data }) => {

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
    }
}





