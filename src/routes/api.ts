const BASE_URL = "https://api.coinpaprika.com/v1";

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
    return await (await fetch(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`)).json();
}
