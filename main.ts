import fs from "node:fs";
import { crawl } from "./crawl";

const top100Json = fs.readFileSync("./top100coin.json", { encoding: "utf-8" });

const top100Coin = JSON.parse(top100Json);

function main(startIndex: number, endIndex: number) {
  for (let i = startIndex; i <= endIndex; i++) {
    crawl(top100Coin[i]);
  }
}

main(30, 30);
