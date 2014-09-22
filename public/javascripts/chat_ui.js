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
	var data = getInput();
	if (data[0] === "/") {
		chat.processCommand(data);
	}	else {
		sendText();
	}
};

var socket = io('http://localhost');
socket.on('addChatMessage', function (message, nickname) {
	var $ul = $('.messages-list');
  $ul.prepend('<li>' + nickname + ": " + message + '</li>');
});

socket.on('systemMessage', function (message) {
	var $ul = $('.messages-list');
  $ul.prepend('<li>' + message + '</li>');
});

socket.on("userList", function (usernames) {
	var $ul = $(".users-list");
	$ul.empty();
	usernames.forEach(function (username) {
		$ul.append("<li>" + username + "</li>");
	});
})