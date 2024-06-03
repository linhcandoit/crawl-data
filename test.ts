import fs from "node:fs";

const stream = fs.createWriteStream("./tuanlinh.txt", { flags: "a" });

let global = 0;

for (let i = 0; i < 10000; i++) {
  stream.write("HelloMyNameIsTuanLinh", () => {
    global++;
    console.log(global);
    if (global == 9999) {
      setTimeout(() => {
        stream.end();
      }, 1000);
    }
  });
}
