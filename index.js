var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);
var port = process.env.PORT || 9000;

//route
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, +'public/index.html'));
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

});

http.listen(port,'0.0.0.0', function(){
  console.log('listening on *:' + port);
});
