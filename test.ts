import fs from "node:fs";

const data = "Hello, my name is Tuan Linh";

fs.writeFile("./tuanlinh.txt", data, { flag: "a" }, () => {});
