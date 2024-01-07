const format_00 = (value = 0) => {
    value = value.toString()

    if(value.length < 2){
        value = `0${value}`
    }

    return value
}
window.format_00 = format_00

const format = (h = 0, m = 0, s = 0, h_str = '', m_str = '', s_str = '') => {
    let result = []

    h > 0 ? result.push(h + h_str) : undefined
    m > 0 ? result.push(m + m_str) : undefined
    s > 0 ? result.push(s + s_str) : undefined
    if(h <= 0 && m <= 0 && s <= 0){
        result.push(s + s_str)
    }

    return result.join('').trim()
}
window.format = format

/**
 * UNIX time to formated time - 108297 -> 30:04:57
 * @param {number} time
 * @param {number} time_format
 * @returns {string} 30:04:57
 */
const unix_to_hms = (time, time_format = 0, hide_zeros = true) => {
    // if(time % 1000 === 0){
    //     time /= 1000
    // }

    let hours = time / 3600
    let hours_decimal = hours % 1

    let minutes = hours_decimal * 60
    let minutes_decimal = minutes % 1

    let seconds = minutes_decimal * 60

    hours = /*format_00(*/Math.floor(hours)//)
    minutes = /*format_00(*/Math.floor(minutes)//)
    seconds = /*format_00(*/Math.round(seconds)//)

    let h = LOCALE.unix_to_hms_h
    let m = LOCALE.unix_to_hms_m
    let s = LOCALE.unix_to_hms_s

    let h_ = LOCALE.unix_to_hms_hours
    let m_ = LOCALE.unix_to_hms_minutes
    let s_ = LOCALE.unix_to_hms_seconds

    // return `${hours}:${minutes}:${seconds}`
    switch(time_format){
        default:
        case 0:
            return hide_zeros ?
                format(format_00(hours), format_00(minutes), format_00(seconds), ':', ':', '') :
                `${format_00(hours)}:${format_00(minutes)}:${format_00(seconds)}`

        case 1:
            return hide_zeros ?
                format(hours, minutes, seconds, `${h} `, `${m} `, `${s}`) :
                `${hours}${h} ${minutes}${m} ${seconds}${s}`

        case 2:
            return hide_zeros ?
                format(hours, minutes, seconds, ` ${h_} `, ` ${m_} `, ` ${s_}`) :
                `${hours} ${h_} ${minutes} ${m_} ${seconds} ${s_}`
    }
}
window.unix_to_hms = unix_to_hms