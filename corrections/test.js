
moment('2023-08-13T13:45:13+03:00').diff('2023-08-13T13:20:49+03:00')// 1464000 00:24:24
moment('2023-08-13T15:15:19+03:00').diff('2023-08-13T13:46:38+03:00')// 5321000 01:28:41
moment('2023-08-14T14:21:32+03:00').diff('2023-08-14T13:30:13+03:00')// 3079000 00:51:19
moment('2023-08-14T16:19:47+03:00').diff('2023-08-14T14:31:31+03:00')// 6496000 01:48:16
                                                                     // 16360000 04:32:40

moment('2023-08-16T20:00:00+03:00').diff('2023-08-14T14:31:31+03:00')// 192509000 53:28:29

moment('2023-07-07T14:11:04+03:00').diff('2023-07-07T12:30:21+03:00')// 192509000 53:28:29
moment('2023-07-14T23:22:43+03:00').diff('2023-07-14T23:20:52+03:00')// 192509000 53:28:29

const _format_00 = (value = 0) => {
    value = value.toString()

    if(value.length < 2){
        value = `0${value}`
    }

    return value
}

const _unix_to_hms = (time = moment.unix(moment())) => {
    if(time % 1000 === 0){
        time /= 1000
    }

    let hours = time / 3600
    let hours_decimal = hours % 1

    let minutes = hours_decimal * 60
    let minutes_decimal = minutes % 1

    let seconds = minutes_decimal * 60

    hours = _format_00(Math.floor(hours))
    minutes = _format_00(Math.floor(minutes))
    seconds = _format_00(Math.round(seconds))

    // console.warn(hours)
    // console.warn(hours_decimal)
    // console.warn(minutes)
    // console.warn(minutes_decimal)
    // console.warn(seconds)

    return `${hours}:${minutes}:${seconds}`
}
_unix_to_hms(1464)
_unix_to_hms(5321)
_unix_to_hms(3079)
_unix_to_hms(6496)
_unix_to_hms(1850)
_unix_to_hms(1163)
_unix_to_hms(6035)
_unix_to_hms(9190)
_unix_to_hms(9250)
_unix_to_hms(6829)
_unix_to_hms(3076)
_unix_to_hms(2621)