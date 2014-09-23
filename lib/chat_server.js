var nicknames = {};
var currentRooms = {};
var guestnumber = 1;

var createChat = function (server) {
	var io = require('socket.io')(server);

	io.on('connection', function (socket) {
		nicknames[socket.id] = "guest" + guestnumber++;
		joinRoom(socket, 'lobby');
		sendUserList(io, socket);
		socket.on('chatMessage', function (message) {
			io.to(findRoom(socket)).emit("addChatMessage", {
				message: message,
				user: nicknames[socket.id],
				room: findRoom(socket)
			});
			console.log(nicknames);
		});
		socket.on('nicknameChangeRequest', function changeNickname (data) {
			if (validNickname(data.nickname)) {
				io.to(findRoom(socket)).emit("nicknameChangeResult", {
					message: nicknames[socket.id] + " is now " + data.nickname,
					room: findRoom(socket)
				});
				nicknames[socket.id] = data.nickname;
				sendUserList(io, socket);
			}
		});
		
		socket.on("disconnect", function () {
			io.sockets.emit("systemMessage", {
				message: nicknames[socket.id] + " has disconnected.",
				room: findRoom(socket)
			});
			delete nicknames[socket.id];
			sendUserList(io, socket);
		});
		
		socket.on("changeRoomRequest", function (data) {
			handleRoomChangeRequests(data.room, socket);
			socket.emit("systemMessage", {
				message: nicknames[socket.id] + " has joined " + findRoom(socket),
				room: findRoom(socket)
			});
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

module.exports = createChat;

var sendUserList = function (io, socket) {
	io.to(findRoom(socket)).emit('userList', function () {
		var names = [];
		for(var key in nicknames) {
			if(currentRooms[findRoom(socket)].indexOf(nicknames[key] >= 0)) {
				names.push(nicknames[key]);
			}
		}
		return { users: names };
	}());
};

var joinRoom = function (socket, room) {
	socket.join(room);
	currentRooms[room] = currentRooms[room] || [];
	currentRooms[room].push(socket.id);
};

var handleRoomChangeRequests = function (newRoom, socket) {
	var currentRoom = findRoom(socket);
	currentRooms[currentRoom].splice(findRoomIndex(socket), 1);
	socket.leave(currentRoom);
	joinRoom(socket, newRoom);
};

var findRoom = function (socket) {
	var currentRoom = 0;
	for(var key in currentRooms) {
		var users = currentRooms[key];
		if(users.indexOf(socket.id) >= 0) {
			currentRoom = key;
		}
	}
	return currentRoom;
};

var findRoomIndex = function (socket) {
	for(var key in currentRooms) {
		var users = currentRooms[key];
		if(users.indexOf(socket.id) >= 0) {
			return users.indexOf(socket.id);
		}
	}
	return -1;
};
