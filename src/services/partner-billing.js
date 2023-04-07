const { statusCode } = require("../constants/header-code");
const { headerMessage } = require("../constants/header-message");
const { atomVapInstance } = require("../repositories/atom");
const chargifyInstance = require("../repositories/chargify");
const elasticSearchInstance = require("../repositories/elastic-search");
const partnerBillingInstance = require("../repositories/partner-billing");
const { getAccessToken } = require("../constants/redis");
const {
  dateFormatter,
  getMonthStartEndDates,
  getCurrencySymbol,
  getformatedInvoiceMonth,
  getFormattedPaymentDate,
  getMonthYear,
} = require("../helpers/dateFormatter");

module.exports = {
  getBillingInvoices: async (resellerId, callback) => {
    try {
      const filteredData = [];
      const invoices = await chargifyInstance.invoices({
        "Content-Type": "application/json",
        Authorization: process.env.CHARGIFY_SECRET_KEY,
      });
      if (invoices) {
        invoices.data.invoices.map((invoice) => {
          filteredData.push({
            invoice_uid: invoice.uid,
            amount: `${getCurrencySymbol(invoice.currency)}${
              invoice.total_amount
            }`,
            invoice_month: getformatedInvoiceMonth(invoice.created_at),
            payment_date: getFormattedPaymentDate(invoice.created_at),
            status: invoice.status,
            action: invoice.public_url,
            details: invoice.public_url,
          });
        });
      }
      if (filteredData.length > 0) {
        return callback(
          filteredData,
          statusCode.success,
          "1",
          "Invoices Found Successfully"
        );
      } else {
        return callback([], statusCode.notFound, "0", "Invoices Not Found");
      }
    } catch (error) {
      return {
        code: statusCode.someThingWentWrong,
        status: "0",
        message: headerMessage.someThingWentWrong,
      };
    }
  },

  getActiveVpnUsers: async (resellerId, queryStrings, callback) => {
    try {
      const page = queryStrings.page;
      const limit = queryStrings.limit;

      const accessToken = await getAccessToken(resellerId);
      const users = await atomVapInstance.getUsersList(
        `?iResellerId=${resellerId}&iPage=${page || 1}&iLimit=${
          limit || 100000
        }`,
        {
          "Content-Type": "application/json",
          "X-AccessToken": accessToken,
        }
      );
      const body = users.body;
      if ((body !== null) & (body !== undefined)) {
        return callback(
          body,
          statusCode.success,
          "1",
          "Active VPN Users Found Successfully"
        );
      } else {
        return callback(
          [],
          statusCode.notFound,
          "0",
          "Active VPN Users Found Successfully"
        );
      }
    } catch (error) {
      return {
        code: statusCode.someThingWentWrong,
        status: "0",
        message: headerMessage.someThingWentWrong,
      };
    }
  },

  getConnectedVpnUsers: async (resellerId, callback) => {
    try {
      const usernames = [];
      const today = new Date();
      const firstAndCurrentDateOfTheCurrentMonth = dateFormatter(today);
      const firstDay = firstAndCurrentDateOfTheCurrentMonth.formattedFirstDay;
      const currentDay =
        firstAndCurrentDateOfTheCurrentMonth.formattedCurrentDay;
      const connectedUsers =
        await elasticSearchInstance.getresellerConnectedUsersList(
          `?IResellerId=${resellerId}&sFromDate=${firstDay}&sToDate=${currentDay}`,
          {
            "Content-Type": "application/json",
          }
        );
      if ((connectedUsers !== undefined) & (connectedUsers !== null)) {
        connectedUsers.forEach((user) => {
          usernames.push({ username: user });
        });
        return callback(
          usernames,
          statusCode.success,
          "1",
          "Connected VPN Users Found Successfully"
        );
      }
      return callback(
        [],
        statusCode.notFound,
        "0",
        "Connected VPN Users Not Found"
      );
    } catch (error) {
      return {
        code: statusCode.someThingWentWrong,
        status: "0",
        message: headerMessage.someThingWentWrong,
      };
    }
  },

  getVpnBillingEstimation: async (
    resellerId,
    queryStrings,
    subscriptionType,
    callback
  ) => {
    try {
      let paidUserComponentId, paidUserComponentSlug, paidUserUnitPrice;
      let trialUserComponentId, trialUserComponentSlug, trialUserUnitPrice;
      let connectedUserComponentId,
        connectedUserComponentSlug,
        connectedUserUnitPrice;
      let activeAccountComponentId,
        activeAccountComponentSlug,
        activeUserUnitPrice;
      let userAccountTotalCost = [];

      let startDate = queryStrings.form_date;
      let endDate = queryStrings.to_date;

      const resellerBilling = await partnerBillingInstance.resellerBilling({
        "Content-Type": "application/json",
      });
      resellerBilling.forEach((bill) => {
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

      const billingAccounts = [
        {
          subscriptionType,
          paidUserComponentId,
          paidUserComponentSlug,
          trialUserComponentId,
          trialUserComponentSlug,
          connectedUserComponentId,
          connectedUserComponentSlug,
          activeAccountComponentId,
          activeAccountComponentSlug,
        },
      ].map((obj) =>
        Object.fromEntries(
          Object.entries(obj).filter(([_, v]) => v !== undefined)
        )
      );

      Promise.all(
        billingAccounts.map(async (account) => {
          // FOR CONNECTED USERS

          try {
            if (
              account.subscriptionType === "connection-based" ||
              account.subscriptionType === "trial-to-paid"
            ) {
              const paid = account.paidUserComponentId;
              const trial = account.trialUserComponentId;
              const connected = account.connectedUserComponentId;

              if (paid !== undefined) {
                const paidPricePoints = await chargifyInstance.price_points(
                  paid,
                  {
                    "Content-Type": "application/json",
                    Authorization: process.env.CHARGIFY_SECRET_KEY,
                  }
                );

                paidPricePoints.price_points.forEach((price) => {
                  const prices = price.prices;
                  prices.forEach((price) => {
                    paidUserUnitPrice = price.unit_price;
                  });
                });
              }
              return;
              if (trial !== undefined) {
                const trialPricePoints = await chargifyInstance.price_points(
                  trial,
                  {
                    "Content-Type": "application/json",
                    Authorization: process.env.CHARGIFY_SECRET_KEY,
                  }
                );
                trialPricePoints.price_points.forEach((price) => {
                  const prices = price.prices;
                  prices.forEach((price) => {
                    trialUserUnitPrice = price.unit_price;
                  });
                });
              } else if (
                paid === undefined &&
                trial === undefined &&
                connected !== undefined
              ) {
                const connectedPricePoints =
                  await chargifyInstance.price_points(connected, {
                    "Content-Type": "application/json",
                    Authorization: process.env.CHARGIFY_SECRET_KEY,
                  });

                connectedPricePoints.price_points.forEach((price) => {
                  const prices = price.prices;
                  prices.forEach((price) => {
                    connectedUserUnitPrice = price.unit_price;
                  });
                });
              }
              const getMonthStartAndEndDates = getMonthStartEndDates(
                startDate.replace(/-0(\d)/, "-$1"),
                endDate.replace(/-0(\d)/, "-$1")
              );

              const accessToken = await getAccessToken(resellerId);

              for (const months of getMonthStartAndEndDates) {
                const { startDate, endDate } = months;

                const resellerConnectedUsers =
                  await elasticSearchInstance.getResellerConnectedUsers(
                    `?IResellerId=${resellerId}&sFromDate=${startDate}&sToDate=${endDate}`,
                    {
                      "Content-Type": "application/json",
                      "X-AccessToken": accessToken,
                    }
                  );

                userAccountTotalCost.push({
                  name: "Paid",
                  month: getMonthYear(startDate, endDate),
                  total_cost_of_paid_accounts:
                    resellerConnectedUsers.paid * paidUserUnitPrice || 0,
                });
                userAccountTotalCost.push({
                  label: "Trial",
                  month: getMonthYear(startDate, endDate),
                  total_cost_of_trial_accounts:
                    resellerConnectedUsers.trial * trialUserUnitPrice || 0,
                });
              }
            }

            // FOR ACTIVE USERS
            else {
              const active = account.activeAccountComponentId;

              if (active !== undefined) {
                const activePricePoints = await chargifyInstance.price_points(
                  active,
                  {
                    "Content-Type": "application/json",
                    Authorization: process.env.CHARGIFY_SECRET_KEY,
                  }
                );

                activePricePoints.price_points.forEach((price) => {
                  const prices = price.prices;
                  prices.forEach((price) => {
                    activeUserUnitPrice = price.unit_price;
                  });
                });
              }

              const accessToken = await getAccessToken(resellerId);

              const getMonthStartAndEndDates = getMonthStartEndDates(
                startDate.replace(/-0(\d)/, "-$1"),
                endDate.replace(/-0(\d)/, "-$1")
              );

              for (const months of getMonthStartAndEndDates) {
                const { startDate, endDate } = months;

                const resellerActiveUsers =
                  await elasticSearchInstance.getResellerConnectedUsers(
                    `?IResellerId=${resellerId}&sFromDate=${startDate}&sToDate=${endDate}`,
                    {
                      "Content-Type": "application/json",
                      "X-AccessToken": accessToken,
                    }
                  );

                userAccountTotalCost.push({
                  month: getMonthYear(startDate, endDate),
                  total_cost_of_active_accounts:
                    resellerActiveUsers.connected * activeUserUnitPrice || 0,
                });
              }
            }

            if (userAccountTotalCost.length > 0) {
              return callback(
                userAccountTotalCost,
                statusCode.success,
                "1",
                "Billing Estimations Found Successfully"
              );
            } else {
              return callback(
                [],
                statusCode.notFound,
                "0",
                "Billing Estimations Not Found"
              );
            }
          } catch (error) {
            return {
              code: statusCode.someThingWentWrong,
              status: "0",
              message: headerMessage.someThingWentWrong,
            };
          }
        })
      );
    } catch (error) {
      return {
        code: statusCode.someThingWentWrong,
        status: "0",
        message: headerMessage.someThingWentWrong,
      };
    }
  },
};
