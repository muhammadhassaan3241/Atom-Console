const { statusCode } = require("../constants/header-code");
const { headerMessage } = require("../constants/header-message");

exports.dateFormatter = (today) => {
    try {
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const formattedFirstDay = `${firstDayOfMonth.getFullYear()}-${(firstDayOfMonth.getMonth() + 1).toString().padStart(2, '0')}-${firstDayOfMonth.getDate().toString().padStart(2, '0')}`;
        const formattedCurrentDay = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

        return { formattedFirstDay, formattedCurrentDay };

    } catch (error) {
        let code = statusCode.someThingWentWrong;
        let message = headerMessage.someThingWentWrong;
        return { code, message };
    }
}

exports.getMonthStartEndDates = (startDateStr, endDateStr) => {

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

exports.getMonthYear = (start, end) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const startDate = new Date(start);
    const endDate = new Date(end);


    // Get the month name and year in the desired format
    const monthYear = months[endDate.getMonth()] + " " + endDate.getFullYear();

    return monthYear;
}

exports.getformatedInvoiceMonth = (dateString) => {
    const date = new Date(dateString);

    const options = { month: 'long' };
    const monthName = date.toLocaleString('en-US', options);
    const year = date.getFullYear();

    return (`${monthName} ${year}`);

}

exports.getFormattedPaymentDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC' };
    return date.toLocaleDateString('en-GB', options).replace(/\//g, '-');
}

exports.getCurrencySymbol = (currencyName) => {
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