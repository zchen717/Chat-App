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
	$ul.prepend('<li>' + input + '</li>');
};
