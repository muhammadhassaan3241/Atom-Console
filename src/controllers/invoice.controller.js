// packages
import axios from "axios";

// modules
import { findAll } from "../services/invoice.services.js";

// INVOICE_APIs

// get all invoices
export const getInvoices = async (request, response) => {
    try {
        const headers = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': process.env.CHARGIFY_AUTH_TOKEN
            }
        };

        const invoicePath = process.env.CHARGIFY_BASE_URL + `/invoices.json`

        findAll(axios, invoicePath, headers, (data, statusCode, customStatus, message) => {
            return (data !== null)
                ? response.status(statusCode).send({
                    status: customStatus,
                    message: message,
                    data: data
                })
                : response.status(statusCode).send({
                    status: customStatus,
                    message: message,
                });
        });

    } catch (error) {
        return response.status(500).send({
            message: "Something Went Wrong"
        })
    }
}
