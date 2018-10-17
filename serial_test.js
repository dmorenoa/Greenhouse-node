// var SerialPort = require('serialport');
// var RawParser = require('./hardware/raw_parser');

// var serial = new SerialPort('/dev/ttyACM0', {
//     baudRate : 9600
// })

// var parser = serial.pipe(new RawParser());

// serial.on('open', function(){
//     console.log("Port open!")
// })

// parser.on('data', function(data){
//     console.log("Pack")
//     console.log(data)
// })

var Com = require('./hardware/comunication')

var com = new Com({
    address : 0xAA
});

com.on('open', function(data){
    console.log(data)
})

com.on('data', function(data){
    console.log(data)
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