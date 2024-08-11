export default class Ws {
  socket: WebSocket;
  retry: 0;
  resolve: (value: boolean) => void;
  reject: (err: Error) => void;
  connect(url: string) {
    return new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
      this.socket = new WebSocket(url);
      this.socket.addEventListener("open", this.onOpen);
      this.socket.addEventListener("error", this.onError);
      this.socket.addEventListener("message", this.onMessage);
    });
  }
  onError(err) {
    if (this.retry < 5 && this.socket.readyState != this.socket.OPEN) {
      this.retry++;
      setTimeout(() => this.connect(this.socket.url), 0.5);
    } else {
      console.error(err);
      this.reject(err);
    }
  }
  onOpen() {
    console.log(`Websocket connected`);
    this.resolve(true);
  }
  onMessage(e) {
    console.log(e.data);
  }
}
