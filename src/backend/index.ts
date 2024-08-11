import Wss from "./Wss";
import chromium from "chromium";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import path from "node:path";

const __filepath = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filepath);
const index = path.join(__dirname, "../frontend/index.html");
execFileSync(chromium.path, [`file://${index}`]);

const wss = new Wss();
wss.listen(8080);
