var createChat = function (server) {
	var io = require('socket.io')(server);

	io.on('connection', function (socket) {
	  socket.emit('messageFromServer', { message: 'test from server' });
	  socket.on('chatMessage', function (data) {
	    io.sockets.emit('addChatMessage', data);
	  });
		// socket.on('disconnect', function(){
		//       console.log("A socket disconnected.");
		//     });
	});
};

module.exports = createChat;