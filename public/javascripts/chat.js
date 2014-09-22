ChatApp = {};
ChatApp.Chat =  function (socket) {
	this.socket = socket;
};

ChatApp.Chat.prototype.sendMessage = function (message) {
	this.socket.emit("chatMessage", message);
};

var socket = io('http://localhost');
socket.on('addChatMessage', function (data) {
  console.log(data);
  $ul.prepend('<li>' + data + '</li>');
});