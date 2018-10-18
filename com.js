var Com = require('./hardware/comunication');
var io = require('./io');

var com = new Com({
    port : '/dev/ttyACM0',
    address : 0xAA
});

com.on('open', function(data){
    console.log(data);
});

com.on('data', function(data){
    console.log(data)
    io.sockets.emit('data', data);
});

module.exports = com;