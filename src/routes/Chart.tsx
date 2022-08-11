import { useQuery } from "@tanstack/react-query";
import { fetchChart } from "./api";
import { useParams } from "react-router-dom";
import ApexChart from "apexcharts";
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

export default function Chart() {
    const { coinId } = useParams();
    console.log(coinId);
    const { isLoading, data } = useQuery<IChart[]>(["Chart"], () => fetchChart(coinId!));
    return <div>{isLoading ? "Loading..." : <ApexChart />}</div>;
}
