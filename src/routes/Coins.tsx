import { Link } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { fetchCoins } from "./api";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "./../atoms";
import { DarkMode } from "@styled-icons/material/DarkMode";
import { LightMode } from "@styled-icons/material-rounded/LightMode";

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
    color: ${(props) => props.theme.accentColor};
`;
export const ModeBtn = styled.button`
    position: absolute;
    right: 30px;
    top: 30px;
    background-color: #6b6b6b;
    border: none;
    border-radius: 50px;
    width: 50px;
    height: 50px;
    color: white;
    transition: all 0.2s ease;
    &:hover {
        cursor: pointer;
        background-color: white;
        color: #6b6b6b;
    }
`;
export const LMode = styled(ModeBtn)`
    background-color: #ffc93c;
    color: white;
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
    background-color: ${(props) => props.theme.btnColor};
    border-radius: 5px;
    color: ${(props) => props.theme.textColor};
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
    const { isLoading, data: coins } = useQuery<ICoins[]>(["Coins"], fetchCoins);
    const isDark = useRecoilValue(isDarkAtom);
    const setIsDark = useSetRecoilState(isDarkAtom);
    const toggleDarkAtom = () => setIsDark((cur) => !cur);
    return (
        <Container>
            <HelmetProvider>
                <Helmet>
                    <title>{!isLoading ? "Coin World" : "Loading..."}</title>
                </Helmet>
            </HelmetProvider>
            <Header>
                {isDark ? (
                    <LMode onClick={toggleDarkAtom}>
                        <LightMode />
                    </LMode>
                ) : (
                    <ModeBtn onClick={toggleDarkAtom}>
                        <DarkMode />
                    </ModeBtn>
                )}

                <Title>Coin World</Title>
            </Header>
            {!isLoading ? (
                <CoinList>
                    {coins?.slice(0, 100).map((coin) => (
                        <Link key={coin?.id} to={coin?.id} state={coin?.name}>
                            <Coin>
                                <Img
                                    src={`https://cryptocurrencyliveprices.com/img/${coin?.id}.png`}
                                    alt="#"
                                />
                                {coin?.symbol}
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
