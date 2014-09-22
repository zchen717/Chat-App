var createChat = function (server) {
	var io = require('socket.io')(server);

	io.on('connection', function (socket) {
		nicknames[socket.id] = "guest" + guestnumber++;
	  socket.emit('messageFromServer', { message: 'test from server' });
	  socket.on('chatMessage', io.emit("addChatMessage", message));
		socket.on('nicknameChangeRequest', function changeNickname (nick) {
			if (validNickname(nick)) {
				nicknames[socket.id] = nick;
			}
		});
	});
};

var validNickname = function (nick) {
	for(var key in nicknames) {
		if (nicknames[key] === nick) {
			return false;
		} else if (nick.slice(0, 5).toLowerCase() === 'guest') {
			return false;
		}
	}
	return true;
};

var nicknames = {};
var guestnumber = 1;


module.exports = createChat;