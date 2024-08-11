import Ws from "./Ws";

const port = process.env.PORT;
const ws = new Ws();
ws.connect(`ws://localhost:${port}`)
  .then(() => {
    console.log("ws connected");
  })
  .catch((err) => {
    throw err;
  });
