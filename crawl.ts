import axios from "axios";
import fs from "node:fs";
import { Coin, eachCallPeriod, endDate, header, startDate } from "./shared";

const startTime = startDate.getTime();
const endTime = endDate.getTime();
let indexGlobal = 0;

const baseAxios = axios.create({
  baseURL: "https://data-api.binance.vision/api/v3/uiKlines",
  params: {
    limit: 1000,
    interval: "1m",
  },
});

// return the API call with the specific startTime (base on the index)
function coinPromise(index: number, coinCode: string): Promise<any> {
  if (checkTime(index))
    return baseAxios.get("", {
      params: {
        symbol: `${coinCode}USDT`,
        startTime: startTime + index * eachCallPeriod,
      },
    });
  else return new Promise((res, rej) => res(0));
}

function checkTime(index: number) {
  if (startTime + index * eachCallPeriod >= endTime) return false;
  return true;
}

function getFileName(coin: Coin) {
  return `rank${coin.rank}_${coin.symbol}_${coin.name}`;
}

export function crawl(coin: Coin) {
  console.log(`Start crawling ${getFileName(coin)}`);
  //coinCode
  indexGlobal = 0;
  const stream = fs.createWriteStream(`./data/${getFileName(coin)}.csv`, {
    flags: "a",
  });

  while (startTime + indexGlobal * eachCallPeriod < endTime) {
    fs.writeFileSync(`./data/${getFileName(coin)}.csv`, header);

    Promise.all([
      coinPromise(indexGlobal, coin.symbol),
      coinPromise(++indexGlobal, coin.symbol),
      coinPromise(++indexGlobal, coin.symbol),
      coinPromise(++indexGlobal, coin.symbol),
      coinPromise(++indexGlobal, coin.symbol),
      coinPromise(++indexGlobal, coin.symbol),
      coinPromise(++indexGlobal, coin.symbol),
      coinPromise(++indexGlobal, coin.symbol),
      coinPromise(++indexGlobal, coin.symbol),
      coinPromise(++indexGlobal, coin.symbol),
    ])
      .then((responses) => {
        let responseArray = responses.filter((response) => response != 0);
        const datas: Array<string> = responseArray.map((response) => {
          // return a string which is 10000 row
          let rows = response.data.map((row: Array<any>) => row.join(";"));
          return rows.join("\n");
        });

        stream.write(datas.join("\n"), () => {
          if (responseArray.length !== 10) {
            setTimeout(() => {
              stream.end(() => {
                console.log(`Crawl ${getFileName(coin)} successful!`);
              });
            }, 10000);
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });

    indexGlobal++;
  }
}
