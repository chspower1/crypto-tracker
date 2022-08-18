import { Link } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { fetchCoins } from "./api";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkState } from "./../atoms";
import { DarkMode } from "@styled-icons/material/DarkMode";
import { LightMode } from "@styled-icons/material-rounded/LightMode";

const Container = styled.div`
    padding: 20px;
    width: 70%;

    margin: 0px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const Header = styled.header`
    display: flex;
    justify-content: center;
    font-size: 60px;
`;
const Title = styled.h1`
    width: 100%;
    margin: 20px auto;
    color: ${(props) => props.theme.accentColor};
    @media screen and (max-width: 1024px) {
        font-size: 40px;
    }
`;
export const ModeBtn = styled.button`
    position: fixed;
    right: 30px;
    bottom: 50%;
    transform: translateY(50%);
    border: none;
    border-radius: 50px;
    width: 50px;
    height: 50px;
    @media screen and (max-width: 1024px) {
        bottom: 50px;
    }
`;
export const LModeBtn = styled(ModeBtn)`
    background-color: #ffc93c;
    color: white;
`;
const CoinList = styled.ul`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    @media screen and (max-width: 1024px) {
        flex-direction: column;
    }
`;
const Coin = styled.li``;
const CoinBtn = styled.button`
    display: flex;
    padding: 15px 30px;
    justify-content: space-between;
    margin: 10px;
    width: 200px;
    align-items: center;
    background-color: ${(props) => props.theme.btnColor};
    border-radius: 5px;
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
    const isDark = useRecoilValue(isDarkState);
    const setIsDark = useSetRecoilState(isDarkState);
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
                    <LModeBtn onClick={toggleDarkAtom}>
                        <LightMode />
                    </LModeBtn>
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
                                <CoinBtn>
                                    <Img
                                        src={`https://cryptocurrencyliveprices.com/img/${coin?.id}.png`}
                                        alt="#"
                                    />
                                    {coin?.symbol}
                                </CoinBtn>
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
