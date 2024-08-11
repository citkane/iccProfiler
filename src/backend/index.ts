import Wss from "./Wss";

const port = process.env.PORT;
if (!port) throw Error("No websocket port was given in the Env.");
const wss = new Wss();
wss.listen(parseInt(port) + 1);
