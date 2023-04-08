const moment = require('moment')
moment.locale('zh-cn');

function compareDate(target) {
    const targetDate = returnToDateArr(moment(target))
    const nowDate = returnToDateArr(moment())
    for (let i = 0; i < 2; i++) {
        if (targetDate[i] > nowDate[i]) {
            return false;
        }
        if (targetDate[i] < nowDate[i]) {
            return true;
        }
    }
    if (targetDate[2] < nowDate[2]) {
        return true
    } else {
        return false
    }
}

function returnToDateArr(date) {
    const year = date.year()
    const month = date.month() + 1
    const day = date.date()
    return [year, month, day]
}

module.exports = compareDate