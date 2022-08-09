import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    padding: 20px;
    max-width: 480px;
    margin: 0 auto;
`;
const Header = styled.header`
    display: flex;
    justify-content: center;
    font-size: 60px;
`;
const Title = styled.h1`
    color: ${(props) => props.theme.textColor};
`;
const CoinList = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const Coin = styled.li`
    display: flex;
    padding: 15px 30px;
    justify-content: space-between;
    margin-top: 10px;
    width: 200px;
    align-items: center;
    background-color: white;
    border-radius: 5px;
    color: ${(props) => props.theme.bgColor};
    transition: all 0.2s ease;
    &:hover {
        color: ${(props) => props.theme.accentColor};
        filter: brightness(0.9);
    }
`;
const Img = styled.img`
    height: 25px;
    width: 25px;
`;
const Loading = styled.h1`
    font-size: 50px;
    display: grid;
    place-items: center;
    min-height: 80vh;
`;

interface CoinInterface {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: any;
}

function Coins() {
    const [coins, setCoins] = useState<CoinInterface[]>([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        (async () => {
            const json = (
                await (await fetch("https://api.coinpaprika.com/v1/tickers")).json()
            ).slice(0, 100);
            console.log(json);
            setCoins(json);
        })();
        setLoading(true);
    }, []);

    return (
        <Container>
            <Header>
                <Title>Coin World</Title>
            </Header>
            {loading ? (
                <CoinList>
                    {coins.map((coin) => (
                        <Link key={coin.id} to={coin.id} state={coin}>
                            <Coin>
                                <Img
                                    src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                                    alt="#"
                                />
                                {coin.symbol}
                            </Coin>
                        </Link>
                    ))}
                </CoinList>
            ) : (
                <Loading>Loading...</Loading>
            )}
        </Container>
    );
}
export default Coins;
