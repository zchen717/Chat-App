ChatApp = {};
ChatApp.Chat =  function (socket) {
	this.socket = socket;
};

ChatApp.Chat.prototype.sendMessage = function (message) {
	this.socket.emit("chatMessage", message);
};

ChatApp.Chat.prototype.processCommand = function (input) {
	var regex = /\/nick */;
	if (regex.exec(input)) {
		this.socket.emit("nicknameChangeRequest", {
			nickname: input.slice(6)
		});
	} else if (/\/join */.exec(input)) {
		this.socket.emit("changeRoomRequest", {
			room: input.slice(6)
		});
	} else {
		console.log("not valid command");
	}
};

