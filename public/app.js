var app = angular.module("rt-arduino", ['btford.socket-io'])

app.factory('socket', function (socketFactory) {
  var myIoSocket = io.connect();
  mySocket = socketFactory({
    ioSocket: myIoSocket
  });
  return mySocket;
});

app.controller("report-controller", function($scope, socket) {

  $scope.changes = []

  socket.on('data', function(data){
    console.log(data)
    $scope.data = data
  })
  
})