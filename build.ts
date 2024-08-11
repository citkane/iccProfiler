#!/usr/bin/env -S npx tsx

import { exec } from "node:child_process";
import { fileURLToPath } from "node:url";
import fs from "node:fs";
import path from "node:path";

const __filepath = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filepath);

const root_dir = path.resolve(__dirname);
const dist_dir_copies = ["frontend/resource", "frontend/style"];
const dist_file_copies = ["frontend/index.html"];

exec("npx pkgroll", (error, stdout, stderr) => {
	console.log(error ? stderr : stdout);
	if (error) return;
	dist_dir_copies.forEach((dir) => {
		const src_dir = `${root_dir}/src/${dir}`;
		const dist_dir = `${root_dir}/dist/${dir}`;
		fs.cpSync(src_dir, dist_dir, { recursive: true });
	});
	dist_file_copies.forEach((file) => {
		const src_file = `${root_dir}/src/${file}`;
		const dist_file = `${root_dir}/dist/${file}`;
		fs.cpSync(src_file, dist_file);
	});
});
