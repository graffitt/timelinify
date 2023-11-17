$(window).on('keydown', (event) => {
    if(event.ctrlKey && event.code === 'KeyF'){
        event.preventDefault()
        $('#search_box').trigger('focus')
    }
})