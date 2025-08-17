import fs from "fs";
import { Transform } from "stream";

const replaceName = new Transform({
  transform(chunk, encoding, callback) {
    chunk = chunk.toString().replace(/Ishmael/g, process.argv[2]);
    this.push(chunk);
    callback();
  },
});

const getUserApproval = new Transform({
  transform(chunk, encoding, callback) {
    //display each chunk of data as it comes in and ask the user to confirm
    console.log(chunk.toString());
    console.log("Is this correct? (y/n)");
    //wait for the user to respond
    process.stdin.once("data", (answer) => {
      //waits for user input in the console/terminal
      //is the user says yes, then push the chunk to the output
      if (answer.toString().trim().toLowerCase() === "y") {
        this.push(chunk);
        console.log("Thank you for approving!");
        callback();
      }

      //otherwise, ask for more input
      else {
        console.log("Please enter the correct data:");
        process.stdin.once("data", (correctData) => {
          this.push(correctData);
          callback();
          console.log("Thank you for the new text!");
        });
      }
    });
  },
});

const readableStream = fs.createReadStream("mobyduck.txt");
const writableStream = fs.createWriteStream("mobyDickCopy.txt");

readableStream.setEncoding("utf-8");

writableStream.on("finish", () => {
  console.log("Done!");
  process.exit();
});

readableStream.pipe(replaceName).pipe(getUserApproval).pipe(writableStream);
