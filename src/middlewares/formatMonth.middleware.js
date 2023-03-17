// get formatted Invoice Month
export function getformatedInvoiceMonth(dateString) {
    const date = new Date(dateString);

    const options = { month: 'long' };
    const monthName = date.toLocaleString('en-US', options);
    const year = date.getFullYear();

    return (`${monthName} ${year}`);

}

// get formatted Payment Date
export function getFormattedPaymentDate(dateString) {
    const date = new Date(dateString);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC' };
    return date.toLocaleDateString('en-GB', options).replace(/\//g, '-');
}

// get formatted Currency Symbol

export function getCurrencySymbol(currencyName) {
    const currencySymbols = {
        USD: "$",
        EUR: "€",
        GBP: "£",
        JPY: "¥",
        AUD: "$",
        CAD: "$",
        CHF: "Fr",
        CNY: "¥",
        HKD: "$",
        NZD: "$",
        SEK: "kr",
        KRW: "₩",
        SGD: "$",
        NOK: "kr",
        MXN: "$",
        INR: "₹",
        RUB: "₽",
        ZAR: "R",
        TRY: "₺",
        BRL: "R$",
        TWD: "NT$",
        SAR: "﷼",
        AED: "د.إ",
        CLP: "$",
        COP: "$",
        IDR: "Rp",
        ILS: "₪",
        PHP: "₱",
        THB: "฿",
        VND: "₫",
    };
    return currencySymbols[currencyName.toUpperCase()] || "";
}