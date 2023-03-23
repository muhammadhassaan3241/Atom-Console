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

// get data of every month
export function getMonthStartEndDates(startDateStr, endDateStr) {

    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);
    const startYear = startDate.getFullYear();
    const endYear = endDate.getFullYear();
    const startMonth = startDate.getMonth();
    const endMonth = endDate.getMonth();

    let monthStartEndDates = [];

    for (let year = startYear; year <= endYear; year++) {
        const monthStart = (year === startYear) ? startMonth : 0;
        const monthEnd = (year === endYear) ? endMonth : 11;

        for (let month = monthStart; month <= monthEnd; month++) {
            const monthStartDate = (year === startYear && month === startMonth) ? parseInt(startDate.getDate(), 10) : 1;
            const monthEndDate = (year === endYear && month === endMonth) ? parseInt(endDate.getDate(), 10) : new Date(year, month + 1, 0).getDate();

            monthStartEndDates.push({
                startDate: new Date(year, month, monthStartDate).toISOString().slice(0, 10),
                endDate: new Date(year, month, monthEndDate).toISOString().slice(0, 10),
            });
        }
    }

    return monthStartEndDates;
}

export function getMonthYear(start, end) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const startDate = new Date(start);
    const endDate = new Date(end);


    // Get the month name and year in the desired format
    const monthYear = months[endDate.getMonth()] + " " + endDate.getFullYear();

    return monthYear;
}

export function formatDateToString(date) {

    // 01, 02, 03, ... 29, 30, 31
    var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();

    console.log(dd);
    // 01, 02, 03, ... 10, 11, 12
    var MM = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
    // 1970, 1971, ... 2015, 2016, ...
    var yyyy = date.getFullYear();

    // create the format you want
    return (dd + "-" + MM + "-" + yyyy);
}