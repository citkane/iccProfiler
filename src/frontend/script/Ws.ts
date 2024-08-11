export default class Ws {
	socket: WebSocket;
	connect(url: string) {
		this.socket = new WebSocket(url);
		this.socket.addEventListener("open", this.onOpen);
		this.socket.addEventListener("message", this.onMessage);
		this.socket.addEventListener("error", this.onError);
	}
	onError(err) {
		console.error(err);
	}
	onOpen() {
		console.log(`Websocket connected`);
	}
	onMessage(e) {
		console.log(e.data);
	}
}
