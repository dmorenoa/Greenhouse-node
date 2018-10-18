var app = angular.module("rt-arduino", ['btford.socket-io']);

app.factory('socket', function (socketFactory) {
  var myIoSocket = io.connect();
  mySocket = socketFactory({
    ioSocket: myIoSocket
  });
  return mySocket;
});

app.controller("report-controller", function($scope, socket) {

  $scope.changes = [];

  socket.on('data', function(data){
    console.log(data);
    $scope.data = data;
  });

  $scope.checktemp = function(){
    socket.emit('checkTemp');
  };

  socket.on('addtemp_sensor',function(){
    var sens = document.getElementById('addtemps');
    socket.emit('addtemp_sensor',sens);
  });

  socket.on('add_relay',function(){
    var sens = document.getElementById('addrel');
    socket.emit('add_relay',sens);
  });
});