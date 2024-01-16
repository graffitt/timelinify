const unfinished_session = async (apps_array) => {
    let file = '.timelinify/_unfinished.json'

    if(await invoke('file_exist', {path: '_unfinished.json'})){
        let {id, start, end} = JSON.parse(await readTextFile(file, file_options))

        end = JSON.parse(await invoke('get_file_metadata', {path: '_unfinished.json'})).modified
        end = to_iso_string(new Date(new Date(end) - 2_000))// 2_000 = 5000(file writing delay) / 2

        let app = apps_array.find(app => app.id === id)
        if(!app.sessions.some(ses => ses.start === start)){
            app.sessions.push({start, end})
            calc_usage_time_id(id, APPS.active)
            APPS_save()
        }
        removeFile(file, file_options)

        console.warn('unfinished_session', session)
    }
}