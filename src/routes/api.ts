const BASE_URL = "https://api.coinpaprika.com/v1";

export function fetchCoins() {
    return fetch(`${BASE_URL}/coins`).then((res) => res.json());
}
export async function fetchTickers(coinId: string) {
    return await (await fetch(`${BASE_URL}/tickers/${coinId}`)).json();
}
