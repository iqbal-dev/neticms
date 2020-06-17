
export function getFullDayName(index) {
    let fullDayNameList = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
    ];
    return fullDayNameList[index - 1];
}

export function getFullMonthName(index) {

    let fullMonthNameList = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    return fullMonthNameList[index - 1];

}

export function getTotalDaysDifference_TillToday(fromDate) {

    let today = new Date();
    let form_date = new Date(fromDate);
    let difference = today > form_date ? form_date - today : today - form_date;

    let diff_days = Math.floor(difference / (1000 * 3600 * 24))

    // console.log('diff_days', diff_days);
    return diff_days;
}
