var io = require('socket.io')();
io.serveClient(false);

module.exports = io