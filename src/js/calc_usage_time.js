const calc_usage_time_all = () => {
    APPS.active.forEach(app => {
        console.log(app.name)
        // if(app.sessions.length > 0){
        let temp = 0
        app.sessions.forEach(session => {
            temp += (new Date(session.end) - new Date(session.start)) / 1000
        })
        app.usage_time_s = temp
        $(`.app_card[data-id='${app.id}']`).find('.app_usage_time').text(unix_to_hms(app.usage_time_s, 0, false))
        console.error(unix_to_hms(app.usage_time_s, 0, false))
        // }
    })
}

const calc_usage_time_id = (id = '', apps_array = APPS.active) => {
    let app = apps_array.find(app => app.id === id)

    let temp = 0
    app.sessions.forEach(session => {
        temp += (new Date(session.end) - new Date(session.start)) / 1000
    })
    app.usage_time_s = temp

    $(`.app_card[data-id='${id}']`).find('.app_usage_time').text(unix_to_hms(app.usage_time_s, 0, false))
}

const calc_usage_time_app = (app) => {
    let temp = 0
    app.sessions.forEach(session => {
        temp += (new Date(session.end) - new Date(session.start)) / 1000
    })
    app.usage_time_s = temp

    $(`.app_card[data-id='${app.id}']`).find('.app_usage_time').text(unix_to_hms(app.usage_time_s, 0, false))
}