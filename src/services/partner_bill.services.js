// packages
import axios from "axios";

// modules
import { User } from "../models/user.model.js";

// INVOICE_SERVICES

// findAll
export default {
    find_all_bills: async (callback) => {
        try {

            // @variables
            var subscription_type_component_id = '';
            var paid_user_component_id = '';
            var trial_user_component_id = '';
            var subscription_type = '';
            var reseller_id;

            // @local API headers
            const reseller_billing_headers = { headers: { "Content-Type": "application/json" } }

            // @fetching bills data from /reseller/billing
            const { data: { body: bills_data } } = await axios.get(`${process.env.PARTNER_BILL_BASE_URL}/reseller/billing`, reseller_billing_headers);

            // @relevant fields from bills data
            const relevant_fields = ["component_id", "component_slug", "reseller_id"]
            const relevant_bills = bills_data.filter(bill => relevant_fields.every(field => bill[field]))

            // @filtering through relevant bills and returing the fields
            await Promise.all(relevant_bills.map(async bill => {

                // @finding user that has the reseller id as reseller id in bills data
                await User.findOne({ where: { reseller_id: bill.reseller_id } })
                    .then((user_data) => {


                        // @check if reseller id in bills data is equal to reseller id in users table
                        (user_data !== null && bill.reseller_id === user_data.reseller_id)
                            ? (async () => {

                                // @reseller id 
                                reseller_id = user_data.reseller_id;

                                subscription_type = bill.component_slug === 'connected' || bill.component_slug === 'active-account'
                                    ? bill.component_slug
                                    : subscription_type;

                                subscription_type_component_id = bill.component_slug === 'connected' || bill.component_slug === 'active-account'
                                    ? bill.component_id
                                    : subscription_type_component_id;

                                paid_user_component_id = bill.component_slug === 'paid'
                                    ? bill.component_id
                                    : paid_user_component_id;

                                trial_user_component_id = bill.component_slug === 'trial'
                                    ? bill.component_id
                                    : trial_user_component_id;

                            })()
                            : callback([], 404, "0", "User Not Found");
                    })
            }));

            // @total accounts
            const total_accounts = relevant_bills.length;

            // @filtered data
            const matching_bills = [{
                subscription_type_component_id,
                trial_user_component_id,
                paid_user_component_id,
                subscription_type,
                total_accounts,
                reseller_id,
            }]

            // @return bills that satisfies the conditions
            return (matching_bills.length > 0)
                ? callback(matching_bills, 200, "1", "Bills Found Successfully")
                : callback([], 404, "0", "Bills Not Found");

            // @catch error when something goes wrong
        } catch (error) {
            throw error;
        }
    }

};