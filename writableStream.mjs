import fs, { read } from "fs";
const mobyDick = process.cwd() + "/mobyduck.txt";
const readableStream = fs.createReadStream(mobyDick);
const writableStream = fs.createWriteStream("mobyduck-copy.txt");

readableStream.setEncoding("utf-8");

readableStream.on("data", (chunk) => {
  writableStream.write(chunk);
});
