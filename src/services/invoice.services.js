// modules
import { getCurrencySymbol, getformatedInvoiceMonth, getFormattedPaymentDate } from "../middlewares/formatMonth.middleware.js";

// INVOICE_SERVICES

// findAll
export const findAll = async (axios, base_url, authHeaders, callback) => {
    try {
        await axios.get(base_url, authHeaders)
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
        throw error
    }
}





