import { useQuery } from "@tanstack/react-query";
import { fetchChart } from "./api";
import { useParams } from "react-router-dom";
import ApexCharts from "react-apexcharts";

export interface IChart {
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
    const { isLoading, data } = useQuery<IChart[] | false>(["Chart"], () => fetchChart(coinId!));
    if (data === false) return null;
    return (
        <div>
            {isLoading ? (
                "Loading..."
            ) : (
                <ApexCharts
                    type="candlestick"
                    height={300}
                    width={500}
                    series={[
                        {
                            name: "price",
                            data: data?.map((price) => ({
                                x: price.time_open,
                                y: [
                                    parseFloat(price.open),
                                    parseFloat(price.high),
                                    parseFloat(price.low),
                                    parseFloat(price.close),
                                ],
                            })) as [],
                        },
                    ]}
                    options={{
                        plotOptions: {
                            candlestick: {
                                colors: {
                                    upward: "#3C90EB",
                                    downward: "#df4b46",
                                },
                            },
                        },
                        chart: {
                            type: "candlestick",
                            height: 350,
                            toolbar: {
                                autoSelected: "pan",
                                show: false,
                            },
                        },

                        xaxis: {
                            type: "datetime",
                            labels: {
                                show: false,
                            },
                        },
                        yaxis: {
                            show: false,
                        },
                    }}
                />
            )}
        </div>
    );
}
