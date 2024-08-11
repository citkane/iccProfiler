import net from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const startPort = 8081;
const socket = net.createServer((socket) => socket);
const filepath = fileURLToPath(import.meta.url);
const app_dir = path.dirname(filepath);

function findOpenPort(port: number): Promise<number> {
  return new Promise((resolve) => {
    //const listener = socket.connect(port, "127.0.0.1");
    socket.once("listening", () => {
      socket.close();
      resolve(port);
    });
    socket.once("error", () => {
      socket.removeAllListeners();
      resolve(findOpenPort(port + 1));
    });
    socket.listen(port, "localhost");
  });
}

const PORT = await findOpenPort(startPort);
const appOpts = { cwd: app_dir, env: { ...process.env, PORT: `${PORT}` } };

//start the backend server using NODE.js
const iccProfilerBack = spawn("bin/node", ["backend/index.js"], appOpts);
iccProfilerBack.stderr.on("data", (data) => console.error(`${data}`));
iccProfilerBack.stdout.on("data", (data) => console.log(`${data}`));

//start the frontend using NW.js
const iccProfilerFront = spawn("bin/nw", ["."], appOpts);
iccProfilerFront.stderr.on("data", (data) => console.error(`${data}`));
iccProfilerFront.stdout.on("data", (data) => console.log(`${data}`));

iccProfilerFront.on("close", () => {
  const stopped = iccProfilerBack.kill(2);
  if (!stopped) {
    console.log("Could not gracefully stop backend. Killing now...");
    iccProfilerBack.kill();
  }
});
