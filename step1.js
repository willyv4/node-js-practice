const fs = require("fs");

function cat(path) {
  fs.readFile(`${path}`, "utf8", (e, data) => {
    if (e) {
      console.log("error!!!...", e);
      process.kill(1);
    }
    console.log(data);
  });
}

cat(process.argv[2]);
