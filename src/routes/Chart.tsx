import React from "react";
import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistroy } from "../api";
import ApexChart from "react-apexcharts";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

const Chart = () => {
  const { coinId } = useOutletContext<ChartProps>();
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistroy(coinId)
  );
  return (
    <div>
      {isLoading ? (
        "Loading CHART "
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "Price",
              data: data?.map((price) => price.close) as number[],
            },
          ]}
          options={{
            theme: { mode: "light" },
            chart: { height: 400, width: 500, toolbar: { show: false } },
            xaxis: { axisTicks: { show: false }, axisBorder: { show: false } },
            yaxis: { show: false },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["orange"], stops: [0, 100] },
            },
            colors: ["green"],
            tooltip: {
              y: {
                formatter: (value) => `$ ${value}`,
              },
            },
            stroke: {
              curve: "straight",
              width: 2.5,
            },
          }}
        />
      )}
    </div>
  );
};

export default Chart;
