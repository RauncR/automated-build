const fs = require("fs");
const fileToRead = process.cwd() + "/inputFile";
const readStream = fs.createReadStream(fileToRead);

readStream.on("data", (chunk) => {
  console.log(chunk.toString());
});
readStream.on("end", () => {
  console.log("End of the file reacher");
});

readStream.on("error", (err) => {
  console.log(err);
});
