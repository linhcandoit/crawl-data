import fs from "node:fs";
import { check } from "./checkFile";

const listFile = fs.readdirSync("./data");

listFile.forEach((fileName) => {
  check(fileName);
});
