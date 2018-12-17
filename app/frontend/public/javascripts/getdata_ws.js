window.onload = function() {
    var socket = io();
    socket.on('message', function(msg) {
        console.log(msg)

    })
    var msg = document.querySelectorAll('.carry-item-title')[0].innerText;
    socket.emit('chat message', msg);
    console.log(msg)
    socket.on('test message', function(msg) {
        console.log('test message:' + msg)
    })
}