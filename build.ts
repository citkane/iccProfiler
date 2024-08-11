#!/usr/bin/env -S npx tsx

import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import fs from "node:fs";
import path from "node:path";

const filepath = fileURLToPath(import.meta.url);
const root_dir = path.dirname(filepath);
const src_dir = path.join(root_dir, "src");
const dist_dir = path.join(root_dir, "dist");
const dist_bin_dir = path.join(dist_dir, "bin");
const root_bin_dir = path.join(root_dir, "bin");
const recursive = {
  recursive: true,
  force: true,
};

/**
 * Copy various binary dependencies from /bin to /dist/bin and create symlinks in /dist/bin
 */

//NW.js (https://nwjs.io/)
const nwSdkLinux64_dir = "nwjs-sdk-v0.90.0-linux-x64";
//const nwLinux64_dir = "nwjs-v0.90.0-linux-x64";
const nwjs_dir = path.join(dist_bin_dir, "NWjs");
const nwjs_link = path.join(dist_bin_dir, "nw");
fs.rmSync(nwjs_dir, recursive);
fs.rmSync(nwjs_link, { force: true });
fs.cpSync(path.join(root_bin_dir, nwSdkLinux64_dir), nwjs_dir, recursive);
fs.symlinkSync(path.join(nwjs_dir, "nw"), nwjs_link);

//Node.js (https://nodejs.org)
const nodeLinux64_dir = "node-v20.16.0-linux-x64";
const nodejs_dir = path.join(dist_bin_dir, "NODEjs");
const nodejs_link = path.join(dist_bin_dir, "node");
fs.rmSync(nodejs_dir, recursive);
fs.rmSync(nodejs_link, { force: true });
fs.cpSync(path.join(root_bin_dir, nodeLinux64_dir), nodejs_dir, recursive);
fs.symlinkSync(path.join(nodejs_dir, "bin", "node"), nodejs_link);

/**
 * Package various Typescript resources from /src to /dist using pkgroll.
 * https://github.com/privatenumber/pkgroll
 * Targets are defined in package.json "exports"
 */
try {
  execSync("npx pkgroll");
} catch (err) {
  console.error(err);
  console.log("Build failed, cleaning up and exiting now...");
  fs.rmSync(dist_dir);
  process.exit(0);
}

/**
 * Copy various assets to dist.
 */
const dist_dir_copies = ["frontend/resource", "frontend/style"];
const dist_file_copies = ["frontend/index.html", "package.json"];

dist_dir_copies.forEach((subdir) => {
  const src = path.join(src_dir, subdir);
  const targ = path.join(dist_dir, subdir);
  fs.cpSync(src, targ, { recursive: true });
});
dist_file_copies.forEach((file) => {
  const src = path.join(src_dir, file);
  const targ = path.join(dist_dir, file);
  fs.cpSync(src, targ);
});
