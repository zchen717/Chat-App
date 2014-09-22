var socket = io();
var chat = new ChatApp.Chat(socket);

var getInput = function () {
	var input = $("textarea").val();
	return input;
};

var sendText = function () {
	var $ul = $('ul');
	var input = getInput();
	chat.sendMessage(input);
};

var parseText = function (text) {
	var regex = /\/nick */;
	var input = regex.exec(data);
	if (input) {
		socket.emit('nicknameChangeRequest', input.slice(6));
	}	else {
		sendText();
	}
}