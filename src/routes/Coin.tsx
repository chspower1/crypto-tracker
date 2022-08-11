import { Link, Route, RouterProps, Routes, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Chart from "./Chart";
import Price from "./Price";
import { useQuery } from "@tanstack/react-query";
import { fetchTickers } from "./api";
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
    justify-content: center;
    font-size: 60px;
`;
const Title = styled.h1`
    text-align: center;
    color: ${(props) => props.theme.textColor};
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

function Coin() {
    const { coinId } = useParams();
    const { isLoading, data } = useQuery<ITickers>(["Tickers", coinId], () =>
        fetchTickers(coinId!)
    );
    const tickers = data;
    return (
        <Container>
            <Header>
                <Title>{coinId}</Title>
            </Header>
            {!isLoading ? (
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
            <Link to={`/${coinId}/chart`}>chart</Link>
            <Link to={`/${coinId}/price`}>price</Link>
            <Routes>
                <Route path="chart" element={<Chart />} />
                <Route path="price" element={<Price />} />
            </Routes>
        </Container>
    );
}
export default Coin;
