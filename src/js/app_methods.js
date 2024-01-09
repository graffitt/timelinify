const app_run = (event) => {
    const id = $(event.target).parents('.app_card')[0].dataset.id
    const app = APPS.active.find(i => i.id === id)

    $(event.target).text('■')
    $(event.target).trigger('blur')
    $(event.target).prop('disabled', true)
    $(event.target).css('pointer-events', 'none')

    invoke('run_app', {
        id: id,
        name: app.name,
        target: app.target_file
    }).then(run_data => {
        $(event.target).text('▶')
        $(event.target).prop('disabled', false)
        $(event.target).css('pointer-events', 'auto')

        run_data = JSON.parse(run_data)
        if(run_data !== null){
            let duration = (new Date(run_data.end) - new Date(run_data.start)) / 1000

            app.sessions.push(run_data)
            app.usage_time_s += duration
            $(event.target).parent().siblings('.app_text_container').children('.app_usage_time').text(unix_to_hms(app.usage_time_s, 0, false))
            last_session_dialog(app, run_data, duration)

            APPS_save()
            // APPS_save_sessions()
        }
    })
    // last_session_dialog(APPS.active[0], {'start': '2023-10-14T20:44:22+03:00', 'end': '2023-10-14T21:42:31+03:00'}, 4261)
}
const app_info = async (app_id, from = APPS.active) => {
    let editable_app_index = from.findIndex(i => i.id === app_id)

    let editable_app = from[editable_app_index]

    if(editable_app_index > -1){
        app_info_tab(editable_app)
        // console.log(`App with id '${app_id}' has been edited in '${from}'`)
    }
    // else{
    //     console.error(`Can't find the app with id '${app_id}' in '${from}'`)
    // }
}
const app_move = async (app_id, from = APPS.active, to = HISTORY) => {
    let movable_app_index = from.findIndex(i => i.id === app_id)

    if(movable_app_index > -1){
        if(await app_confirm_dialog(from[movable_app_index], 0)){
            let movable_app = from.splice(movable_app_index, 1)[0]

            if(movable_app.tracking_ended === ''){
                movable_app.tracking_ended = to_iso_string(new Date())
            }
            to.push(movable_app)
            $(`.app_card[data-id='${app_id}']`).remove()
            // invoke('delete_icon', {
            //     icon_name: app_id
            // })
            APPS_save()
            HISTORY_save()
            // console.warn(`App with id '${app_id}' has been moved from '${from}' to '${to}'`)
            console.warn(`App with id '${app_id}' has been moved`)
            // console.warn(to.constructor.name)
            // console.log(Object.keys({to})[0])
        }
        else{
            // console.log(`App with id '${app_id}' hasn't been moved from '${from}' to '${to}'`)
            console.log(`App with id '${app_id}' hasn't been moved`)
        }
    }
    else{
        // console.error(`Can't find the app with id '${app_id}' in '${from}'`)
        console.error(`Can't find the app with id '${app_id}'`)
    }
}
const app_delete = async (app_id, from = APPS.active) => {
    let deletable_app_index = from.findIndex(i => i.id === app_id)

    if(deletable_app_index > -1){
        if(await app_confirm_dialog(from[deletable_app_index], 1)){
            const {icon} = from[deletable_app_index]

            from.splice(deletable_app_index, 1)// delete app from array
            $(`.app_card[data-id='${app_id}']`).remove()// delete UI element
            invoke('delete_icon', {
                icon_file_name: icon
            })// delete icon

            APPS_save()
            // console.warn(`App with id '${app_id}' has been deleted from '${from}'`)
            console.warn(`App with id '${app_id}' has been deleted`)
        }
        else{
            // console.log(`App with id '${app_id}' hasn't been deleted from '${from}'`)
            console.log(`App with id '${app_id}' hasn't been deleted`)
        }
    }
    else{
        // console.error(`Can't find the app with id '${app_id}' in '${from}'`)
        console.error(`Can't find the app with id '${app_id}'`)
    }
}