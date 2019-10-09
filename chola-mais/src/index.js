#!/usr/bin/env node

const { exec } = require('child_process');
const { promisify } = require("util");
const { readFileSync } = require("fs");
const path = require("path");

const { platform } = process;
const execProcess = promisify(exec);

const textPath = path.join(__dirname, "..", "assets", "chola_mais.txt");

const script = path.join(__dirname, "windows.jscript");
const ogg = path.join(__dirname, "..", "assets", "chola_mais.ogg");
const mp3 = path.join(__dirname, "..", "assets", "chola_mais.mp3");

const commands = {
    linux: `paplay ${ogg}`,
    darwin: `afplay ${mp3}`,
    windows: `cscript /E:JScript /nologo "${script}" "${mp3}"`
};
(async () => {
    console.log(readFileSync(textPath, { encoding: "utf8"}));
    await execProcess(commands[platform]);
})();

