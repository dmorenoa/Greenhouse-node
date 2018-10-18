var app = require('../app');   //request listener
var io = require('../io');
var server = require('http').createServer(express);
var com = require('com.js');
var lm35list = [];
var rellist = [];

var port = process.env.PORT || 8000;

server.listen(port);
io.attach(server);

/* console.log('Magic happens on port ' + port); */

io.on('checkTemp',function(){
    com.params.payload = [];
    com.params.payload[0].cmd = 0x51;
    com.params.payload[0].value = 0x00;
    com.send(params);
});

io.on('add_tempsensor',function(sens){
    com.params.payload = [];
    com.params.payload[0].cmd = 0x50;
    com.params.payload[0].value = sens;
    com.send(params);
    lm35list[lm35list.length] = sens;
});

io.on('add_relay',function(sens){
    com.params.payload = [];
    com.params.payload[0].cmd = 0x52;
    com.params.payload[0].value = sens;
    com.send(params);
    rellist[rellist.length] = sens;
});