import { useQuery } from "@tanstack/react-query";
import { fetchChart } from "./api";
import { useParams } from "react-router-dom";
import ApexCharts from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./../atoms";

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
    const { isLoading, data } = useQuery<IChart[]>(["Chart"], () => fetchChart(coinId!));
    const isDark = useRecoilValue(isDarkAtom);
    return (
        <div>
            {isLoading ? (
                "Loading..."
            ) : (
                <ApexCharts
                    type="candlestick"
                    height={350}
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
                        theme: {
                            mode: isDark ? "dark" : "light",
                        },
                        chart: {
                            type: "candlestick",
                            height: 350,
                        },
                        title: {
                            text: "CandleStick Chart",
                            align: "center",
                        },
                        xaxis: {
                            type: "datetime",
                        },
                        yaxis: {
                            tooltip: {
                                enabled: true,
                            },
                        },
                    }}
                />
            )}
        </div>
    );
}
