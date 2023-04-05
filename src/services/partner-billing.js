const { chargifyURL, atomVapURL, elasticSearchURL, partnerBillingURL } = require("../constants/constant");
const { statusCode } = require("../constants/header-code");
const { headerMessage } = require("../constants/header-message");
const { getAccessToken } = require("../constants/redis");
const { dateFormatter, getMonthStartEndDates, getCurrencySymbol, getformatedInvoiceMonth, getFormattedPaymentDate, getMonthYear } = require("../helpers/dateFormatter");
const { getAtomData } = require("../repositories/atom");
const { getChargifyData } = require("../repositories/chargify");
const { getElasticSearchData } = require("../repositories/elastic-search");
const { getPartnerBillingData } = require("../repositories/partner-billing");

module.exports = {

    getBillingInvoices: async (resellerId, callback) => {
        try {

            const filteredData = [];

            const { partnerBillingInvoices } = await getChargifyData(
                chargifyURL.getInvoices,
                {
                    "Content-Type": "application/json",
                    "Authorization": process.env.CHARGIFY_SECRET_KEY
                }
            )

            if (partnerBillingInvoices) {
                partnerBillingInvoices.data.invoices.map((invoice) => {
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
                callback(filteredData);
                return
            }

            return callback(partnerBillingInvoices)

        } catch (error) {
            let code = statusCode.someThingWentWrong;
            let message = headerMessage.someThingWentWrong;
            return { code, message }
        }
    },

    getActiveVpnUsers: async (resellerId, queryStrings, callback) => {
        try {
            const page = queryStrings.page;
            const limit = queryStrings.limit;
            const accessToken = await getAccessToken(resellerId);

            const activeVpnUsers = await getAtomData(
                atomVapURL.getVpnActiveUsers,
                `?iResellerId=${resellerId}&iPage=${page || 1}&iLimit=${limit || 100000}`,
                {
                    "Content-Type": "application/json",
                    "Authorization": accessToken
                }
            )

            return callback(activeVpnUsers)

        } catch (error) {
            let code = statusCode.someThingWentWrong;
            let message = headerMessage.someThingWentWrong;
            return { code, message }
        }
    },

    getConnectedVpnUsers: async (resellerId, callback) => {
        try {

            const today = new Date();
            const firstAndCurrentDateOfTheCurrentMonth = dateFormatter(today);
            const firstDay = firstAndCurrentDateOfTheCurrentMonth.formattedFirstDay;
            const currentDay = firstAndCurrentDateOfTheCurrentMonth.formattedCurrentDay;

            const connectedVpnUsers = await getElasticSearchData(
                elasticSearchURL.getResellerConnectedUsers,
                `?IResellerId=${resellerId}&sFromDate=${firstDay}&sToDate=${currentDay}`,
                { "Content-Type": "application/json" }
            )

            const usernames = [];
            connectedVpnUsers.forEach(user => {
                usernames.push({ username: user })
            });

            return callback(usernames)

        } catch (error) {
            let code = statusCode.someThingWentWrong;
            let message = headerMessage.someThingWentWrong;
            return { code, message }
        }
    },

    getVpnBillingEstimation: async (resellerId, queryStrings, callback) => {
        try {

            let paidUserComponentId, paidUserComponentSlug, paidUserUnitPrice;
            let trialUserComponentId, trialUserComponentSlug, trialUserUnitPrice;
            let connectedUserComponentId, connectedUserComponentSlug, connectedUserUnitPrice;
            let activeAccountComponentId, activeAccountComponentSlug, activeUserUnitPrice;
            let userAccountTotalCost = [];

            let startDate = queryStrings.form_date;
            let endDate = queryStrings.to_date;

            const resellerBilling = await getPartnerBillingData(
                partnerBillingURL.getResellerBillings,
                "?",
                { "Content-Type": "application/json" }
            )

            resellerBilling.forEach(bill => {
                if (bill.reseller_id === resellerId) {
                    if (bill.subscription_slug === subscriptionType) {
                        if (bill.component_slug === "paid") {
                            paidUserComponentId = bill.component_id;
                            paidUserComponentSlug = bill.component_slug;
                        }
                        if (bill.component_slug === "trial") {
                            trialUserComponentId = bill.component_id;
                            trialUserComponentSlug = bill.component_slug;
                        }
                        if (bill.component_slug === "connected") {
                            connectedUserComponentId = bill.component_id;
                            connectedUserComponentSlug = bill.component_slug;
                        }
                        if (bill.component_slug === "active-account") {
                            activeAccountComponentId = bill.component_id;
                            activeAccountComponentSlug = bill.component_slug;
                        }
                    }
                }
            });

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

                // FOR CONNECTED USERS

                try {
                    if (account.subscriptionType === "connection-based" || account.subscriptionType === "trial-to-paid") {
                        const paid = account.paidUserComponentId;
                        const trial = account.trialUserComponentId;
                        const connected = account.connectedUserComponentId;


                        if (paid !== undefined) {
                            const paidPricePoints = await getChargifyData(
                                `${chargifyURL.getPricePoints}/${paid}/price_points.json`,
                                "?",
                                {
                                    "Content-Type": "application/json",
                                    "Authorization": process.env.CHARGIFY_SECRET_KEY,
                                }

                            )

                            paidPricePoints.forEach(price => {
                                const prices = price.prices;
                                prices.forEach(price => {
                                    paidUserUnitPrice = price.unit_price;
                                });
                            });

                        }

                        if (trial !== undefined) {
                            const trialPricePoints = await getChargifyData(
                                `${chargifyURL.getPricePoints}/${trial}/price_points.json`,
                                "?",
                                {
                                    "Content-Type": "application/json",
                                    "Authorization": process.env.CHARGIFY_SECRET_KEY,
                                }
                            )

                            trialPricePoints.forEach(price => {
                                const prices = price.prices;
                                prices.forEach(price => {
                                    trialUserUnitPrice = price.unit_price;
                                });
                            });
                        }

                        else if (paid === undefined && trial === undefined && connected !== undefined) {
                            const connectedPricePoints = await getChargifyData(
                                `${chargifyURL.getPricePoints}/${connected}/price_points.json`,
                                "?",
                                {
                                    "Content-Type": "application/json",
                                    "Authorization": process.env.CHARGIFY_SECRET_KEY,
                                }

                            )

                            connectedPricePoints.forEach(price => {
                                const prices = price.prices;
                                prices.forEach(price => {
                                    connectedUserUnitPrice = price.unit_price;
                                });
                            });
                        }

                        const getMonthStartAndEndDates = getMonthStartEndDates(startDate.replace(/-0(\d)/, '-$1'), endDate.replace(/-0(\d)/, '-$1'));
                        const accessToken = await getAccessToken(resellerId);

                        for (const months of getMonthStartAndEndDates) {
                            const { startDate, endDate } = months;

                            const resellerConnectedUsers = await getElasticSearchData(
                                elasticSearchURL.getResellerConnectedUsers,
                                `?IResellerId=${641}&sFromDate=${startDate}&sToDate=${endDate}`,
                                {
                                    "Content-Type": "application/json",
                                    "X-AccessToken": accessToken,
                                }
                            )

                            userAccountTotalCost.push({
                                name: 'Paid',
                                month: getMonthYear(startDate, endDate),
                                total_cost_of_paid_accounts: resellerConnectedUsers.paid * paidUserUnitPrice || 0,
                            })
                            userAccountTotalCost.push({
                                label: 'Trial',
                                month: getMonthYear(startDate, endDate),
                                total_cost_of_trial_accounts: resellerBilling.trial * trialUserUnitPrice || 0,
                            })
                        }
                    }

                    // FOR ACTIVE USERS

                    else {
                        const active = account.activeAccountComponentId;

                        if (active !== undefined) {
                            const activePricePoints = await getChargifyData(
                                `${chargifyURL.getPricePoints}/${active}/price_points.json`,
                                "?",
                                {
                                    "Content-Type": "application/json",
                                    "Authorization": process.env.CHARGIFY_SECRET_KEY,
                                }

                            )

                            activePricePoints.forEach(price => {
                                const prices = price.prices;
                                prices.forEach(price => {
                                    activeUserUnitPrice = price.unit_price;
                                });
                            });
                        }

                        const accessToken = await getAccessToken(resellerId);

                        const getMonthStartAndEndDates = getMonthStartEndDates(startDate.replace(/-0(\d)/, '-$1'), endDate.replace(/-0(\d)/, '-$1'));

                        for (const months of getMonthStartAndEndDates) {
                            const { startDate, endDate } = months;

                            const resellerActiveUsers = await getElasticSearchData(
                                elasticSearchURL.getResellerConnectedUsers,
                                `?IResellerId=${641}&sFromDate=${startDate}&sToDate=${endDate}`,
                                {
                                    "Content-Type": "application/json",
                                    "X-AccessToken": accessToken,
                                }
                            )

                            userAccountTotalCost.push({
                                month: getMonthYear(startDate, endDate),
                                total_cost_of_active_accounts: resellerActiveUsers.connected * activeUserUnitPrice || 0,
                            })
                        }

                    }

                    return callback(userAccountTotalCost)

                } catch (error) {
                    let code = statusCode.notFound;
                    let message = headerMessage.notFound;
                    return { code, message }
                }
            }))

        } catch (error) {
            let code = statusCode.someThingWentWrong;
            let message = headerMessage.someThingWentWrong;
            return { code, message }
        }
    },
}