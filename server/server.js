var app = require('../app');   //request listener
var io = require('../io');
var server = require('http').createServer(express);

var port = process.env.PORT || 8000;

server.listen(port);
io.attach(server);

console.log('Magic happens on port ' + port);