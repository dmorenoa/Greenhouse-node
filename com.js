var Com = require('./hardware/comunication')
var io = require('./io')

var com = new Com({
    address : 0xAA
});

com.on('open', function(data){
    console.log(data)
})

com.on('data', function(data){
    io.sockets.emit('data', data);
})

setInterval(function(){
    var params = {
        destination : 0x00,
        payload : [
            {
                cmd : 0x50,
                value : 0x0a
            },
            {
                cmd : 0x51,
                value : 0x00
            },
            {
                cmd : 0x52,
                value : 0x01
            }
        ]
    }
    com.send(params)
}, 2000)

module.exports = com;