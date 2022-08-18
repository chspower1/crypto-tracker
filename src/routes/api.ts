import { IChart } from "./Chart";
const BASE_URL = "https://api.coinpaprika.com/v1";

const emptyObject: IChart = {
    time_open: 0,
    time_close: 0,
    open: "EMPTY",
    high: "EMPTY",
    low: "EMPTY",
    close: "EMPTY",
    volume: "EMPTY",
    market_cap: 0,
};
export const emptyArr: IChart[] = [emptyObject];
for (let i = 0; i < 19; i++) {
    emptyArr.push(emptyObject);
}

export function fetchCoins() {
    return fetch(`${BASE_URL}/coins`).then((res) => res.json());
}
export async function fetchTickers(coinId: string) {
    return await (await fetch(`${BASE_URL}/tickers/${coinId}`)).json();
}
export async function fetchInfo(coinId: string) {
    return await (await fetch(`${BASE_URL}/coins/${coinId}`)).json();
}

export async function fetchChart(coinId: string) {
    const data = await (
        await fetch(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`)
    ).json();
    console.log(data);
    if ("error" in data) {
        return false;
    } else return data;
}
