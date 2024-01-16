const unfinished_session = async (apps_array) => {
    let file = '.timelinify/_unfinished.json'

    if(await invoke('file_exist', {path: '_unfinished.json'})){
        let session = JSON.parse(await readTextFile(file, file_options))
        let {start, end} = session

        end = JSON.parse(await invoke('get_file_metadata', {path: '_unfinished.json'})).modified
        end = to_iso_string(new Date(new Date(end) - 2000))// 2000 = 5000(file writing delay) / 2

        let app = apps_array.find(app => app.id === session.id)
        if(!app.sessions.some(ses => ses.start === session.start)){
            app.sessions.push({start, end})
            APPS_save()
            calc_usage_time_app(app)
        }
        removeFile(file, file_options)

        console.warn('unfinished_session', session)
        // return session
    }
}

// console.warn('unfinished_session', await unfinished_session())