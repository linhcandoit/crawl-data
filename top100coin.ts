import axios, { AxiosResponse } from "axios";
import { apiKey } from "./shared";
import fs from "node:fs/promises";

let axiosCall = axios.create({
  baseURL: "https://pro-api.coinmarketcap.com",
  headers: {
    "X-CMC_PRO_API_KEY": apiKey,
  },
});

axiosCall
  .get("/v1/cryptocurrency/listings/latest", {
    params: {
      limit: 100,
    },
  })
  .then((response: AxiosResponse) => {
    const cmcResponse = response.data;
    const dataReturn = cmcResponse.data.map((coin: any, index: number) => ({
      name: coin.name,
      symbol: coin.symbol,
      rank: index + 1,
    }));

    let dataJSON = JSON.stringify(dataReturn);
    //@ts-ignore
    dataJSON = dataJSON.replaceAll(" ", "_");

    fs.writeFile("./top100coin.json", dataJSON, { encoding: "utf-8" }).then(
      (result) => {
        console.log(`
        The date running this program: ${Date()}
        -----------------------------------------
            SUCCESSFUL GET TOP 100 COIN
        `);
      }
    );
  });
