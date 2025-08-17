import http from "http";
import fs from "fs";
import path from "path";

const logFile = path.join(process.cwd(), "logFile.txt");
const logFileStream = fs.createWriteStream(logFile);

const log = async (message) => {
  await logFileStream.write(`${message}`);
};

const server = http.createServer((req, res) => {
  log(
    `${new Date().toString()} ${req.method} ${req.url} ${
      req.headers["user-agent"]
    }`
  )
    .then(() => {
      res.writeHead(200, { "content-type": "text/plain" });
      res.end("Yo Mundo");
    })
    .catch((err) => {
      console.log(err);
    });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
