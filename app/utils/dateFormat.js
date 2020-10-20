
export function getFullDayName(index) {
    let fullDayNameList = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];
    return fullDayNameList[index];
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
    return fullMonthNameList[index];

}

export function getTotalDaysDifference_TillToday(fromDate) {

    let today = new Date();
    let form_date = new Date(fromDate);
    let difference = today > form_date ? today - form_date : form_date - today;

    let diff_days = Math.floor(difference / (1000 * 3600 * 24))

    // console.log('diff_days', diff_days);
    return diff_days;
}

export function get_YYMMDD_Format_WithHyphen(date) {
    var moment = require('moment/moment');
    var dateFromString = moment(date).format('YYYY-MM-DD');
    return dateFromString;
}

export function get_DDMMYY_Format_WithHyphen(date) {
    var moment = require('moment/moment');
    var dateFromString = moment(date).format('DD-MM-YYYY');
    return dateFromString;
}

export function get_DDMMYY_Format_WithSlash(date) {
    var moment = require('moment/moment');
    var dateFormat = moment(date).format('DD/MM/YYYY');
    return dateFormat;
}

export function getHHMMSS(date) {
    var moment = require('moment/moment');
    var hh = moment(date).format('h');
    var mm = moment(date).format('mm');
    var ss = moment(date).format('ss');
    // var hhmmss = hh + mm + ss;
    var hhmmss = hh + mm + ss;
    return hhmmss;
}

export function getHHcloneMMcloneSS(date) {
    var moment = require('moment/moment');
    var hh = moment(date).format('h');
    var mm = moment(date).format('mm');
    var ss = moment(date).format('ss');
    // var hhmmss = hh + mm + ss;
    var hhmmss = hh + ':' + mm + ':' + ss;
    return hhmmss;
}

export function getHHcloneMMwithAMorPM(date) {
    var moment = require('moment/moment');
    var hh = moment(date).format('h');
    var mm = moment(date).format('mm');
    var ss = moment(date).format('ss');
    var aa = moment(date).format('a');
    // var hhmmss = hh + mm + ss;
    var hhmm = hh + ':' + mm + ' ' + aa;
    return hhmm;

}

export function get_Only_Year(date) {
    var moment = require('moment/moment');
    var dateFromString = moment(date).format('YYYY');
    return dateFromString;
}

export function get_DDMMM_YY_Format_WithComma(date) {
    var moment = require('moment/moment');
    var dateFromString = moment(date).format('DD MMMM, YYYY');
    return dateFromString;
}
