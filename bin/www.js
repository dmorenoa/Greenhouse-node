var app = require('express')
var io = require('socket.io');
var server = require('http').createServer(app);

var port = process.env.PORT || 8000;

server.listen(port);
io.attach(server);