import { Route, Routes, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import Chart from "./Chart";
import Price from "./Price";
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

export interface CoinInterface {
    state: {
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
    };
}

export interface Quotes {
    USD: Usd;
}

export interface Usd {
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
    const [loading, setLoading] = useState(true);
    const { state } = useLocation() as CoinInterface;
    console.log(state);
    return (
        <Container>
            <Header>
                <Title>{coinId}</Title>
            </Header>
            <Routes>
                <Route path="chart" element={<Chart />} />
                <Route path="price" element={<Price />} />
            </Routes>
        </Container>
    );
}
export default Coin;
