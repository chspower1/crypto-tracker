import { useParams } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchChart } from "./api";

interface IChart {
    time_open: number;
    time_close: number;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    market_cap: number;
}
function Price() {
    const { coinId } = useParams();
    const { isLoading, data } = useQuery<IChart[]>(["Chart"], () => fetchChart(coinId!));
    return <h1>Price</h1>;
}
export default Price;
