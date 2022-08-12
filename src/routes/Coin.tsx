import { Link, Route, Routes, useParams } from "react-router-dom";
import styled from "styled-components";
import Chart from "./Chart";
import Price from "./Price";
import { useQuery } from "@tanstack/react-query";
import { fetchInfo, fetchTickers } from "./api";
import { Helmet, HelmetProvider } from "react-helmet-async";

// ------------------------styled-components-----------------------
const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    max-width: 480px;
    margin: 0 auto;
`;
const Header = styled.header`
    display: flex;

    width: 100%;
    padding: 10px 20px;
    justify-content: space-between;
    align-items: center;
`;
const Title = styled.h1`
    text-align: center;
    font-size: 35px;
    color: ${(props) => props.theme.textColor};
`;
const Img = styled.img`
    height: 40px;
    width: 40px;
`;
const Overview = styled.section`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border-radius: 10px;
    background-color: #1f1f1f;
    margin: 10px 30px;
    padding: 20px;
`;
const OverviewItem = styled.div`
    color: ${(props) => props.theme.textColor};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    width: 33%;
    h5 {
        font-size: 12px;
        margin-bottom: 10px;
    }
`;
const Loading = styled.h1`
    font-size: 50px;
    display: grid;
    place-items: center;
    min-height: 80vh;
`;
const HomeBtn = styled.button`
    padding: 10px 20px;
    border-radius: 10px;
    border: none;
    background-color: #3275ac;
`;
const ContentBtn = styled(HomeBtn)`
    width: 50%;
    margin: 5px 20px;
`;
const Content = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-evenly;
`;

// --------------------interface--------------------------
// Tickers Interface
interface ITickers {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: Date;
    last_updated: Date;
    quotes: Quotes;
}

interface Quotes {
    USD: Usd;
}

interface Usd {
    price: number;
    volume_24h: number;
    volume_24h_change_24h: number;
    market_cap: number;
    market_cap_change_24h: number;
    percent_change_15m: number;
    percent_change_30m: number;
    percent_change_1h: number;
    percent_change_6h: number;
    percent_change_12h: number;
    percent_change_24h: number;
    percent_change_7d: number;
    percent_change_30d: number;
    percent_change_1y: number;
    ath_price: number;
    ath_date: Date;
    percent_from_price_ath: number;
}
// CoinInfo Interface
interface ICoinInfo {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    tags: Tag[];
    team: Team[];
    description: string;
    message: string;
    open_source: boolean;
    started_at: Date;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    links: Links;
    links_extended: LinksExtended[];
    whitepaper: Whitepaper;
    first_data_at: Date;
    last_data_at: Date;
}

interface Links {
    explorer: string[];
    facebook: string[];
    reddit: string[];
    source_code: string[];
    website: string[];
    youtube: string[];
}

interface LinksExtended {
    url: string;
    type: string;
    stats?: Stats;
}

interface Stats {
    subscribers?: number;
    contributors?: number;
    stars?: number;
    followers?: number;
}

interface Tag {
    id: string;
    name: string;
    coin_counter: number;
    ico_counter: number;
}

interface Team {
    id: string;
    name: string;
    position: string;
}

interface Whitepaper {
    link: string;
    thumbnail: string;
}

function Coin() {
    const { coinId } = useParams();
    const { isLoading: tickersLoading, data: tickers } = useQuery<ITickers>(
        ["Tickers", coinId],
        () => fetchTickers(coinId!),
        {
            refetchInterval: 5000,
        }
    );
    const { isLoading: coinInfoLoading, data: coinInfo } = useQuery<ICoinInfo>(
        ["CoinInfo", coinId],
        () => fetchInfo(coinId!)
    );
    const loading = tickersLoading && coinInfoLoading;

    return (
        <Container>
            <HelmetProvider>
                <Helmet>
                    <title>{!loading ? coinId : "Loading..."}</title>
                </Helmet>
            </HelmetProvider>
            <Header>
                <Img src={`https://cryptocurrencyliveprices.com/img/${coinId}.png`} alt="#" />
                <Title>{!loading ? coinId : "Loading..."}</Title>
                <HomeBtn>
                    <Link to="/">Home</Link>
                </HomeBtn>
            </Header>
            {!loading ? (
                <>
                    <Overview>
                        <OverviewItem>
                            <h5>Rank</h5>
                            <span>{tickers?.rank}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <h5>Symbol</h5>
                            <span>{tickers?.symbol}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <h5>Price</h5>
                            <span>{tickers?.quotes.USD.price.toFixed(2)} $</span>
                        </OverviewItem>
                    </Overview>
                    <Overview>
                        <OverviewItem>
                            <h5>Max price</h5>
                            <span>{tickers?.quotes.USD.ath_price.toFixed(2)} $</span>
                        </OverviewItem>
                        <OverviewItem>
                            <h5>Supply</h5>
                            <span>{tickers?.total_supply}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <h5>Max supply</h5>
                            <span>{tickers?.max_supply}</span>
                        </OverviewItem>
                    </Overview>
                </>
            ) : (
                <Loading>Loding...</Loading>
            )}
            <Content>
                <ContentBtn>
                    <Link to={`/${coinId}/chart`}>chart</Link>
                </ContentBtn>
                <ContentBtn>
                    <Link to={`/${coinId}/price`}>price</Link>
                </ContentBtn>
            </Content>
            <Routes>
                <Route path="chart" element={<Chart />} />
                <Route path="price" element={<Price />} />
            </Routes>
        </Container>
    );
}
export default Coin;
