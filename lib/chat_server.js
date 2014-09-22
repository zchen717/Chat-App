var createChat = function (server) {
	var io = require('socket.io')(server);

	io.on('connection', function (socket) {
		nicknames[socket.id] = "guest" + guestnumber++;
		socket.emit('messageFromServer', { message: 'test from server' });
		socket.on('chatMessage', function (message) {
			io.sockets.emit("addChatMessage", message, nicknames[socket.id]);
			console.log(nicknames);
		});
		socket.on('nicknameChangeRequest', function changeNickname (nick) {
			if (validNickname(nick)) {
				nicknames[socket.id] = nick;
			}
		});
		
		socket.on("disconnect", function () {
			io.sockets.emit("systemMessage", nicknames[socket.id] + " has disconnected.");
			nicknames[socket.id] = "";
		});
	});
};

var validNickname = function (nick) {
	for(var key in nicknames) {
		if (nicknames[key] === nick) {
			return false;
		}
		if (nick.slice(0, 5).toString().toLowerCase() === 'guest') {
			return false;
		}
	}
	return true;
};

var nicknames = {};
var guestnumber = 1;

module.exports = createChat;