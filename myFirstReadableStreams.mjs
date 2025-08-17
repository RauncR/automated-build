import { Stream } from "stream";
const readableStream = new Stream.Readable();
readableStream.push("Yo Yo Mundo!");
readableStream.push(null);
readableStream.pipe(process.stdout);
