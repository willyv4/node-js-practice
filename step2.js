const fs = require("fs");
const axios = require("axios");

const url = "https://" || "http://";
const path = process.argv[2];

path.includes(url) ? webCat(path) : cat(path);

function cat(path) {
  fs.readFile(`${path}`, "utf8", (error, data) => {
    error
      ? (console.log("error!!!...", error), process.kill(1))
      : console.log(data);
  });
}

async function webCat(path) {
  try {
    const resp = await axios.get(path);
    console.log(resp);
  } catch (error) {
    console.log("ERROR!!!...", error);
  }
}
