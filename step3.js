const fs = require("fs");
const axios = require("axios");

const url = "https://" || "http://";
const outFlagIndex = process.argv.indexOf("--out");
const file =
  outFlagIndex !== -1 && outFlagIndex + 1 < process.argv.length
    ? process.argv[outFlagIndex + 1]
    : null;
const path = outFlagIndex === -1 ? process.argv[2] : process.argv[4];

if (file !== null) {
  path.includes(url) ? webCatWrite(path, file) : catWrite(path, file);
} else {
  path.includes(url) ? webCat(path) : cat(path);
}

function cat(path) {
  fs.readFile(`${path}`, "utf8", (error, data) => {
    error
      ? (console.log("error!!!...", error), process.kill(1))
      : console.log(data);
  });
}

function catWrite(path, file) {
  fs.appendFile(file, path, "utf8", (error) => {
    error
      ? (console.log("error!!!...", error), process.kill(1))
      : console.log(`no output, but ${file} contains content from ${path}`);
  });
}

async function webCat(path) {
  try {
    const resp = await axios.get(path);
    console.log(resp);
  } catch (error) {
    console.log(`ERROR!!!... fetching ${path}`, error);
  }
}

async function webCatWrite(path, file) {
  try {
    const resp = await axios.get(path);
    fs.appendFile(file, resp.data, "utf8", (error) => {
      error
        ? (console.log("error!!!...", error), process.kill(1))
        : console.log(`no output, but ${file} contains content from ${path}`);
    });
  } catch (error) {
    console.log(`ERROR!!!... fetching ${path}`, error);
  }
}
