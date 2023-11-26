$(window).on('keydown', (event) => {
    if(event.ctrlKey && event.code === 'KeyF'){
        event.preventDefault()
        $('#search_box').trigger('focus')
    }
})

$('#search_box').on('keyup', (event) => {
    apps_search($(event.target).val())
})

const apps_search = (term) => {
    const fuse = new Fuse(APPS.active, {
        keys: ['name', 'display_name'],
        threshold: 0.4
    })

    if(term.length !== 0){
        let result = fuse.search(term).map(item => {
            return `.app_card[data-id*="${item.item.id}"]`
        })

        $('.app_card').not(result.join(',')).not('.app_card.service').hide()
        $(result.join(',')).show()
    }
    else{
        $('.app_card').show()
    }
}
// APPS.active.map(item => {
//     return {
//         'name': item.name,
//         'display_name': item.display_name
//     }
// })