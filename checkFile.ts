import fs from "node:fs";

const valueCheck = ["Kline open time", "Open price"];

export function check(fileName: string) {
  let count = 0;

  //   What the different between reading csv file and txt file?
  const stream = fs.createReadStream(`./data/${fileName}`, "utf-8");

  console.log(`Start reading file ${fileName}`);

  stream.on("data", (chunk) => {
    if (chunk.includes(valueCheck[0]) || chunk.includes(valueCheck[1])) {
      count++;
      if (count == 2) {
        console.log(`File ${fileName} ERROR`);
        stream.emit("close");
      }
    }
  });

  stream.on("close", () => {
    console.log(`Completed reading ${fileName}`);
    console.log(`Total count: ${count}`);
  });
}
