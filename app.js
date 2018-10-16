var SerialPort = require('serialport');
var RawParser = require('./hardware/raw_parser');

var socketIo = require('socket.io');
var express = require('express');
var path = require('path');
var logger = require('morgan');


var port = new SerialPort('COM8',{
    baudRate: 9600
});

parser = port.pipe(new RawParser());

parser.on('data', function(data){
    console.log(data);
    var result = {
        origen : data[1].toString(16),
        destino : data[2].toString(16),
        longitud : data[3],
        payload : {},
        checksum : data[data.length + 5].toString(16)
    }
    for(var i = 3; i<data.length -2; i+=2){
        var buf = Buffer.from([data[i+1], data[i+2]]);
        result.payload[data[i].toString(16)] = buf.readInt16BE(0);
      }
    console.log(result);
});
