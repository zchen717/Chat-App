var socket = io();
var chat = new ChatApp.Chat(socket);

var getInput = function () {
	var input = $("textarea").val();
	return input;
};

var sendText = function () {
	var input = getInput();
	
	chat.sendMessage(input);
};

var parseText = function (event) {
	var regex = /\/nick */;
	var data = getInput();
	var input = regex.exec(data);
		debugger;
	if (data[0] === "/") {
		chat.processCommand(data);
	}	else {
		sendText();
	}
};

var socket = io('http://localhost');
socket.on('addChatMessage', function (message, nickname) {
	var $ul = $('ul');
  console.log(message);
  $ul.prepend('<li>' + nickname + ": " + message + '</li>');
});

socket.on('systemMessage', function (message) {
	var $ul = $('ul');
  console.log(message);
  $ul.prepend('<li>' + message + '</li>');
});