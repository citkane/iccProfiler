import { WebSocketServer } from "ws";

export default class Wss {
	wss: WebSocketServer;
	listen(port: number) {
		this.wss = new WebSocketServer({ port });
		this.wss.on("listening", () =>
			console.log(`The websocket server is listening on port: ${port}`)
		);
		this.wss.on("connection", (ws) => {
			ws.on("error", this.onError);
			ws.on("message", this.onMessage);
			ws.send("connected");
		});
	}
	private onError(err) {
		console.error(err);
	}
	private onMessage(data) {
		console.log(data);
	}
}
