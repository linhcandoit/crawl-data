export const header: string =
  [
    "Kline open time",
    "Open price",
    "High price",
    "Low price",
    "Close price",
    "Volume",
    "Kline close time",
    "Quote asset volume",
    "Number of trades",
    "Taker buy base asset volume",
    "Taker buy quote asset volume",
    "Unused field. Ignore.",
  ].join(";") + "\n";

// The date running the program: 28/05/2024 => The date start crawling: 28/05/2020
export const startDate = new Date("2020-05-28T00:00:00Z");
export const endDate = new Date("2024-05-28T00:00:00Z");

export const eachCallPeriod = 1001 * 1 * 60 * 1000; // miliseconds

export const apiKey = "cfed47bf-d9e8-44d2-b969-2c802c0afb75";

export interface Coin {
  name: string;
  symbol: string;
  rank: number;
}
