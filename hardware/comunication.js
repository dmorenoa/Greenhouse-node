var SerialPort = require('serialport');
var RawParser = require('./hardware/raw_parser');
var Events = require('events');

class Com extends Events.EventEmitter {
    constructor(params) {
        super(params);
        this.address = params.address || 0xAA;
        this.port = params.port || 'COM8';
        this.uart = new SerialPort(this.port , {
            baudRate : params.baudRate || 9600,
        });
        this.parser = this.uart.pipe(new RawParser());
        this._init();
    }

    _init () {
        var th = this;
        this.uart.on('open', function(){
            th.emit('open', 'Port open at: ' + th.port);
        });
        this.parser.on('data', function(data){
            var response = {
                origin : data[0].toString(16),
                destination : data[1].toString(16),
                length : data[2]/2,
                payload : []
            };
            for(var i = 0; i < response.length; i++){
                response.payload.push({
                    cmd : data[3 + (i*2)].toString(16),
                    value : data[4 + (i*2)]
                });
            }
            th.emit('data', response);
        });
    }

    send (params) {
        var buffer = new Buffer([0x23, this.address, params.destination, 0x00]);
        var cursor = 3;
        params.payload.forEach(function(element) {
            var tempBuffer = new Buffer([0, 0]);
            tempBuffer.writeUInt8(element.cmd, 0);
            tempBuffer.writeUInt8(element.value, 1);
            buffer = Buffer.concat([buffer, tempBuffer]);
            buffer[3] = buffer[3] + 2;
        });
        var sum = 0;
        for(var i = 4; i<buffer.length; i++){
            sum += buffer[i];
        }
        sum &= 0b0000000011111111;
        sum = 0xFF - sum;
        buffer = Buffer.concat([buffer, Buffer([sum])]);
        this.uart.write(buffer);
    }
}

module.exports = Com;