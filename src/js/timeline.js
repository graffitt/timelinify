let sessions = [
    {
        start: '2023-08-13T13:20:49+03:00',
        end: '2023-08-13T13:45:13+03:00'
    },
    {
        'start': '2023-08-13T13:46:38+03:00',
        'end': '2023-08-13T15:15:19+03:00'
    },
    {
        'start': '2023-08-14T13:30:13+03:00',
        'end': '2023-08-14T14:21:32+03:00'
    },
    {
        'start': '2023-08-14T14:31:31+03:00',
        'end': '2023-08-14T16:19:47+03:00'
    },
    {
        'start': '2023-08-15T15:07:18+03:00',
        'end': '2023-08-15T15:38:08+03:00'
    },
    {
        'start': '2023-08-15T15:42:28+03:00',
        'end': '2023-08-15T16:01:51+03:00'
    },
    {
        'start': '2023-08-15T22:27:21+03:00',
        'end': '2023-08-16T00:07:56+03:00'
    },
    {
        'start': '2023-08-16T11:49:45+03:00',
        'end': '2023-08-16T14:22:55+03:00'
    },
    {
        'start': '2023-08-17T16:30:37+03:00',
        'end': '2023-08-17T19:04:47+03:00'
    },
    {
        'start': '2023-08-18T13:45:16+03:00',
        'end': '2023-08-18T15:39:05+03:00'
    },
    {
        'start': '2023-08-18T18:55:59+03:00',
        'end': '2023-08-18T19:47:15+03:00'
    },
    {
        'start': '2023-08-18T23:17:23+03:00',
        'end': '2023-08-19T00:01:04+03:00'
    },
    {
        'start': '2023-08-19T15:38:54+03:00',
        'end': '2023-08-19T16:44:00+03:00'
    },
    {
        'start': '2023-08-21T13:40:52+03:00',
        'end': '2023-08-21T14:00:11+03:00'
    }
]

let groups = new vis.DataSet([
    {id: 1, content: 'sessions'},
    {id: 2, content: 'pauses'}
])

let items = new vis.DataSet()
// let index = 1
sessions.forEach((session, index) => {
    items.add({
        id: index,
        group: 1,
        start: new Date(session.start),
        end: new Date(session.end),
        className: 'session',
        content: 'session'
    })
})

// var start = new Date('2023-08-13 13:20:49')
// var end = new Date('2023-08-13 13:45:13')
// items.add({
//     id: 1,
//     group: 1,
//     start: start,
//     end: end,
//     className: 'segment',
//     content: 'segment 1'
// })

let options = {
    stack: true,
    // min: new Date('2023-07-07 00:00:01'),                // lower limit of visible range
    min: new Date(sessions[0].start),                // lower limit of visible range
    // max: new Date('2023-09-30 00:00:01'),                // upper limit of visible range
    max: new Date(sessions.at(-1).end),                // upper limit of visible range
    hiddenDates: [],
    zoomMin: 1000 * 60 * 60 * 12,             // one week in milliseconds
    zoomMax: 1000 * 60 * 60 * 24 * 30,
    editable: false,
    margin: {
        item: 0, // minimal margin between items
        axis: 1   // minimal margin between items and the axis
    },
    orientation: 'top'

}
let container = document.getElementById('mytimeline')
let timeline = new vis.Timeline(container, null, options)
timeline.setGroups(groups)
timeline.setItems(items)