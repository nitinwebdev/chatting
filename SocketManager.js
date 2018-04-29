const io = require('./index.js').io;

module.exports = function (socket) {
	socket.on('username', function (newuser) {
		console.log(newuser + "socket");
		io.sockets.emit('username', "" + newuser + "");
	})

	socket.on('chat', function (input) {
		console.log(input);
		io.sockets.emit('acknowledgement', input);
	})
	console.log("Socket Id :" + socket.id);

}
