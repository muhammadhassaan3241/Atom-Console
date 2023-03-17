// packages
import axios from "axios";

// modules
import Bill_Services from "../services/partner_bill.services.js";

// BILLS_APIs

export const getGraphData = async (request, response) => {
    try {

        // @accounts counts variables
        var total_paid_accounts = 0;
        var total_trial_accounts = 0;
        var total_active_accounts = 0;

        // @chargify API headers
        const chargify_api_headers = { headers: { 'Content-Type': 'application/json', 'Authorization': process.env.CHARGIFY_AUTH_TOKEN } };

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
                                    const active_accounts_price_points = await axios.get(`${process.env.CHARGIFY_BASE_URL}/components/${d.subscription_type_component_id}/price_points.json`, chargify_api_headers);
                                    total_active_accounts++;

                                    // @filter unit price of active user accounts from price points
                                    const active_accounts_unit_price = active_accounts_price_points.data.price_points.filter((a) => {
                                        a.prices.filter((b) => {
                                            return ({ unit_price: b.unit_price })
                                        })
                                    })

                                    // @sending response to client
                                    response.status(status_code).send({
                                        status: custom_status,
                                        message: message,
                                        active_accounts_unit_price: active_accounts_unit_price,
                                        total_active_accounts: total_active_accounts,
                                    });

                                })()
                                : (async () => {
                                    // @paid users price points
                                    const paid_accounts_price_points = await axios.get(`${process.env.CHARGIFY_BASE_URL}/components/${bills.paid_user_component_id}/price_points.json`, chargify_api_headers);
                                    total_paid_accounts++;

                                    // @filter unit price of paid user accounts from price points
                                    var paid_accounts_unit_price = "";
                                    paid_accounts_price_points.data.price_points.filter((a) => {
                                        a.prices.filter((b) => {
                                            paid_accounts_unit_price = b.unit_price;
                                            return paid_accounts_price_points
                                        })
                                    })

                                    // @trial users price points
                                    const trial_accounts_price_points = await axios.get(`${process.env.CHARGIFY_BASE_URL}/components/${bills.trial_user_component_id}/price_points.json`, chargify_api_headers);
                                    total_trial_accounts++;

                                    // @filter unit price of trail user accounts from price points
                                    var trial_accounts_unit_price = "";
                                    trial_accounts_price_points.data.price_points.filter((a) => {
                                        a.prices.filter((b) => {
                                            trial_accounts_unit_price = b.unit_price;
                                            return trial_accounts_price_points;
                                        })
                                    })

                                    // @sending response to client
                                    response.status(status_code).send({
                                        status: custom_status,
                                        message: message,
                                        total_paid_accounts: total_paid_accounts,
                                        total_trial_accounts: total_trial_accounts,
                                        paid_account_unit_price: paid_accounts_unit_price,
                                        trial_account_unit_price: trial_accounts_unit_price,
                                    });
                                })()
                        }
                    })()
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