// packages
import axios from "axios";
import { getMonthStartEndDates, getMonthYear } from "../middlewares/formatMonth.middleware.js";

// modules
import Bill_Services from "../services/partner_bill.services.js";

// BILLS_APIs

export const GET_graph_data = async (request, response) => {
    try {


        // @chargify API headers
        const chargify_api_headers = { headers: { 'Content-Type': 'application/json', 'Authorization': process.env.CHARGIFY_AUTH_TOKEN } };
        const active_users_form_data = { 'secretKey': process.env.ACTIVE_USERS_SECRET_KEY, 'grantType': 'secret' };


        // @fetching response from find_all_bills
        Bill_Services.find_all_bills(
            async (data, status_code, custom_status, message) => {

                // @check if data is not null
                (data !== null)
                    ? (async () => {

                        // @looping through bills data
                        for (const bills of data) {
                            // @fetching prices from /components/give your id here/price_points.json
                            // @check if subscription type is active-account
                            (bills.subscription_type === "active-account")
                                ? (async () => {
                                    // @active users price points

                                    const active_accounts_price_points = await axios.get(`${process.env.CHARGIFY_BASE_URL}/components/${bills.subscription_type_component_id}/price_points.json`, chargify_api_headers);


                                    // @filter unit price of active user accounts from price points
                                    var active_account_unit_price;
                                    active_accounts_price_points.data.price_points.filter((a) => {
                                        a.prices.filter((b) => {
                                            active_account_unit_price = b.unit_price;
                                            return active_account_unit_price;
                                        })
                                    });

                                    // @creating access token for API ===>>> /vap/v1/reseller/active/users?iResellerId=<>
                                    const data = await axios.post('https://atomapi.com/auth/v1/accessToken', active_users_form_data)

                                    // headers for API ===>>> /vap/v1/reseller/active/users?iResellerId=<>
                                    const active_users_api_headers = { headers: { 'Content-Type': 'application/json', "X-AccessToken": `${data.data.body.accessToken}` } };

                                    // @getting number of active accounts
                                    const { data: { body: active_accounts } } = await axios.get(`${process.env.ACTIVE_USERS_BASE_URL}/vap/v1/reseller/active/users?iResellerId=641`, active_users_api_headers);

                                    // @total active accounts
                                    var total_active_accounts;
                                    active_accounts.subscriptions.filter((a) => {
                                        total_active_accounts = a.usersCount
                                        return total_active_accounts
                                    })

                                    // @reseller id 
                                    const reseller_id = bills.reseller_id;

                                    const elastic_search_headers = { headers: { "Content-Type": "application/json" } };

                                    const month_wise_data = [];

                                    const from_date_string = request.query.from;
                                    const to_date_string = request.query.to;

                                    const monthStartEndDates = getMonthStartEndDates(from_date_string, to_date_string);


                                    // @filtering costs of active accounts for all months between given dates
                                    for (const month of monthStartEndDates) {
                                        const { startDate, endDate } = month;

                                        // @elastic API Url
                                        const url = `${process.env.ELASTIC_SEARCH_BASE_URL}/networklogs/getResellerConnectedUsers?IResellerId=${reseller_id}&sFromDate=${startDate}&sToDate=${endDate}`;

                                        const { data } = await axios.get(url, elastic_search_headers);

                                        (data.body.length === 0)
                                            ? response.status(status_code).send({
                                                status: custom_status,
                                                message: message,
                                                data: []
                                            })
                                            : (async () => {
                                                // @multiplying total active accounts with unit price of active account
                                                const total_cost_of_active_accounts = active_account_unit_price * total_active_accounts;

                                                month_wise_data.push({
                                                    time_period: getMonthYear(startDate, endDate),
                                                    details: {
                                                        total_cost_of_active_accounts
                                                    }
                                                })
                                            })()
                                    }

                                    // @sending response to client
                                    response.status(status_code).send({
                                        status: custom_status,
                                        message: message,
                                        reseller_id: reseller_id,
                                        month_wise_data: month_wise_data,
                                    });

                                })()

                                : (async () => {
                                    // @paid users price points
                                    const paid_accounts_price_points = await axios.get(`${process.env.CHARGIFY_BASE_URL}/components/${bills.paid_user_component_id}/price_points.json`, chargify_api_headers);

                                    // @filter unit price of paid user accounts from price points
                                    var paid_accounts_unit_price;
                                    paid_accounts_price_points.data.price_points.filter((a) => {
                                        a.prices.filter((b) => {
                                            paid_accounts_unit_price = b.unit_price;
                                            return paid_accounts_unit_price
                                        })
                                    })

                                    // @trial users price points
                                    const trial_accounts_price_points = await axios.get(`${process.env.CHARGIFY_BASE_URL}/components/${bills.trial_user_component_id}/price_points.json`, chargify_api_headers);

                                    const reseller_id = bills.reseller_id;

                                    // @filter unit price of trail user accounts from price points
                                    var trial_accounts_unit_price;
                                    trial_accounts_price_points.data.price_points.filter((a) => {
                                        a.prices.filter((b) => {
                                            trial_accounts_unit_price = b.unit_price;
                                            return paid_accounts_unit_price;
                                        })
                                    });

                                    // @fetching data for a certain period of time
                                    const elastic_search_headers = { headers: { "Content-Type": "application/json" } };

                                    const month_wise_data = [];

                                    const from_date_string = request.query.from;
                                    const to_date_string = request.query.to;

                                    const monthStartEndDates = getMonthStartEndDates(from_date_string, to_date_string);


                                    // @filtering costs of paid and trials accounts for all months between given dates
                                    for (const month of monthStartEndDates) {
                                        const { startDate, endDate } = month;

                                        // @elastic API Url
                                        const url = `${process.env.ELASTIC_SEARCH_BASE_URL}/networklogs/getResellerConnectedUsers?IResellerId=${reseller_id}&sFromDate=${startDate}&sToDate=${endDate}`;

                                        const { data } = await axios.get(url, elastic_search_headers)
                                        const total_cost_of_paid_accounts = data.body.paid * paid_accounts_unit_price;
                                        const total_cost_of_trial_accounts = data.body.trial * trial_accounts_unit_price;

                                        month_wise_data.push({
                                            month: getMonthYear(startDate, endDate),
                                            paid: total_cost_of_paid_accounts,
                                            trail: total_cost_of_trial_accounts
                                        })


                                    }

                                    response.status(status_code).send({
                                        status: custom_status,
                                        message: message,
                                        reseller_id: reseller_id,
                                        data: month_wise_data
                                    });
                                })()
                        }

                    })()

                    // @if data is null sending response to client
                    : response.status(status_code).send({
                        status: custom_status,
                        message: message,
                        data: data,
                    })
            }
        )

        // @catch error if something goes wrong
    } catch (error) {
        return response.status(500).send({
            message: "Something Went Wrong"
        })
    }
};