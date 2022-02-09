const { series } = require("async");
const { spawn } = require("child_process");
const fs = require("fs");

function buildClient(cb) {
  console.log("Building client...");
  return spawn("npm.cmd", ["run", "build", "--workspace=client"]).on(
    "exit",
    (code) => {
      if (code === 0) {
        console.log("Client built");
        cb(null, null);
      } else {
        cb(`Client build failed (${code})`, null);
      }
    }
  );
}

function buildServer(cb) {
  console.log("Building server...");
  return spawn("npm.cmd", ["run", "build-dev", "--workspace=server"]).on(
    "exit",
    (code) => {
      if (code === 0 || code === 1) {
        console.log("Server built");
        cb(null, null);
      } else {
        cb(`Server build failed (${code})`, null);
      }
    }
  );
}

function copySettings(cb) {
  console.log("Copying settings...");
  fs.copyFile("./settings.js", "./dist/settings.js", (err) => {
    if (err) cb(err, null);
    else {
      console.log("Copied settings.");
      cb(null, null);
    }
  });
}

function copyInfo(cb) {
  console.log("Copying info...");
  fs.copyFile("./info.js", "./dist/info.js", (err) => {
    if (err) cb(err, null);
    else {
      console.log("Copied info.");
      cb(null, null);
    }
  });
}

console.log("Building game...");
series([buildClient, buildServer, copySettings, copyInfo])
  .then(() => console.log("Build done."))
  .catch((e) => console.log(e));
