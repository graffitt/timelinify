const unfinished_session = async () => {
    let file = '.timelinify/_unfinished.json'

    if(await exists(file, file_options)){
        let temp = {}
        await readTextFile(file, file_options).then(result => {
            let session = JSON.parse(result)
            temp.id = session.id
            temp.start = session.start
        })
        return temp
    }
}


unfinished_session().then(response => {
    if(response !== undefined){
        console.warn('unfinished_session', response)
    }
})