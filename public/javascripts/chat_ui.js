var socket = io();
var chat = new ChatApp.Chat(socket);

var getInput = function () {
	var input = $("input").val();
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
socket.on('addChatMessage', function (data) {
	$(".room-name").html(data.room);
	var $ul = $('.messages-list');
  $ul.prepend('<li>' + data.user + ": " + data.message + '</li>');
});

socket.on('systemMessage', function (data) {
	$(".room-name").html(data.room);
	var $ul = $('.messages-list');
  $ul.prepend('<li>' + data.message + '</li>');
});

socket.on("userList", function (data) {
	$(".room-name").html(data.room);
	var $ul = $(".users-list");
	$ul.empty();
	data.users.forEach(function (username) {
		$ul.append("<li>" + username + "</li>");
	});
})