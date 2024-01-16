const unfinished_session = async (object) => {
    let file = '.timelinify/_unfinished.json'

    if(await invoke('file_exist', {path: '_unfinished.json'})){
        let session = JSON.parse(await readTextFile(file, file_options))
        session.end = JSON.parse(await invoke('get_file_metadata', {path: '_unfinished.json'})).modified

        let app = object.active.find(app => app.id === session.id)
        console.error(app)
        console.error(app.sessions.some(ses => ses.start === session.start))
        console.warn('unfinished_session', session)
        // return session
    }
}

// console.warn('unfinished_session', await unfinished_session())