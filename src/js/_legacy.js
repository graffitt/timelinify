// const app_move = async (app_id, object = APPS, from = 'active', to = 'history') => {
//     let movable_app_index = object[from].findIndex(i => i.id === app_id)

//     if(movable_app_index > -1){
//         if(await app_confirm_dialog(object[from][movable_app_index], 0)){
//             let movable_app = object[from].splice(movable_app_index, 1)[0]

//             if(movable_app.tracking_ended === ''){
//                 movable_app.tracking_ended = to_iso_string(new Date())
//             }
//             object[to].push(movable_app)
//             $(`.app_card[data-id='${app_id}']`).remove()
//             APPS_save()
//             console.warn(`App with id '${app_id}' has been moved from '${from}' to '${to}'`)
//         }
//         else{
//             console.log(`App with id '${app_id}' hasn't been moved from '${from}' to '${to}'`)
//         }
//     }
//     else{
//         console.error(`Can't find the app with id '${app_id}' in '${from}'`)
//     }
// }

// const app_delete = async (app_id, object = APPS, from = 'active') => {
//     let deletable_app_index = object[from].findIndex(i => i.id === app_id)

//     if(deletable_app_index > -1){
//         if(await app_confirm_dialog(object[from][deletable_app_index], 1)){
//             object[from].splice(deletable_app_index, 1)
//             $(`.app_card[data-id='${app_id}']`).remove()
//             APPS_save()
//             console.warn(`App with id '${app_id}' has been deleted from '${from}'`)
//         }
//         else{
//             console.log(`App with id '${app_id}' hasn't been deleted from '${from}'`)
//         }
//     }
//     else{
//         console.error(`Can't find the app with id '${app_id}' in '${from}'`)
//     }
// }