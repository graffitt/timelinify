String.prototype.splice = function(idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem))
}
function getPosition(string, subString, index) {
  return string.split(subString, index).join(subString).length;
}

/**
 * JS date to ISO string
 * @param {Date} date
 * @returns string
 */
const to_iso_string = (date) => {
    let tzo = -date.getTimezoneOffset(),
        dif = tzo >= 0 ? '+' : '-',
        pad = function(num){
            return (num < 10 ? '0' : '') + num
        }

    return date.getFullYear() +
        '-' + pad(date.getMonth() + 1) +
        '-' + pad(date.getDate()) +
        'T' + pad(date.getHours()) +
        ':' + pad(date.getMinutes()) +
        ':' + pad(date.getSeconds()) +
        dif + pad(Math.floor(Math.abs(tzo) / 60)) +
        ':' + pad(Math.abs(tzo) % 60)
}

/**
 * 2023-10-02T10:14:47+03:00 -> 2023-10-02 10:14:47 +03:00
 * @param {string} date
 * @returns string
 */
const iso_display = (date, include_time_zone = true) => {
    if(include_time_zone){
        return date.replace('T', ' ').splice(getPosition(date, ':', 2) + 3, 0, ' ')
    }
    else{
        return date.replace('T', ' ').substring(0, 19)
    }
}