import { Link } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { fetchCoins } from "./api";

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

interface ICoins {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
}
function Coins() {
    const { isLoading, data } = useQuery<ICoins[]>(["Coins"], fetchCoins);
    const coins = data;
    return (
        <Container>
            <Header>
                <Title>Coin World</Title>
            </Header>
            {!isLoading ? (
                <CoinList>
                    {coins?.slice(0, 100).map((coin) => (
                        <Link key={coin.id} to={coin.id} state={coin.name}>
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
