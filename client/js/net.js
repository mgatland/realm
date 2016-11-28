var NET = (function () {
	var net = {};

	net.connect = function() {
		var socket = new WebSocket ("ws://localhost:3000/game");
		socket.onopen = function (event) {
			socket.send("test message");
		}
		socket.onmessage = function (event) {
			console.log(event.data);
		}
	}

	return net;
}());