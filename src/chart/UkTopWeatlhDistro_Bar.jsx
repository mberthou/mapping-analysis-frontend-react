import { useEffect, useState, useRef } from "react";
import { Chart } from "chart.js/auto";

import { getCssVariable } from "../utils/Utils";

/*
 * Chart built with Chart.js
 */

const UkTopWeatlhDistro_Bar = ({ distroData }) => {
  const [chart, setChart] = useState(null);
  const canvas = useRef(null);
  // const chartData = {
  //   labels: ["0.0001", "0.001", "0.01", "0.1", "1"],
  //   datasets: [
  //     // Blue bars
  //     {
  //       label: "Combined Wealth £",
  //       data: [600, 1200, 2200, 3500, 4800],
  //       backgroundColor: getCssVariable("--color-violet-500"),
  //       hoverBackgroundColor: getCssVariable("--color-violet-600"),
  //       barPercentage: 0.7,
  //       categoryPercentage: 0.7,
  //       borderRadius: 4,
  //     },
  //   ],
  // };

  useEffect(() => {
    const ctx = canvas.current;
    let labels = [];
    let dataCombinedWealthGbp = [];
    distroData.map((wealthCategory) => {
      labels.push(wealthCategory.population_top_percent + "%");
      dataCombinedWealthGbp.push(wealthCategory.combined_wealth_bln_gbp);
    });

    const newChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Combined Wealth - in Billion GBP",
            data: dataCombinedWealthGbp,
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    setChart(newChart);
    return () => newChart.destroy();
  }, []);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      {/* Change the height attribute to adjust the chart height */}
      {/* <BarChart data={chartData} width={595} height={248} /> */}
      <div className="grow">
        <canvas ref={canvas}></canvas>
      </div>
    </div>
  );
};

export default UkTopWeatlhDistro_Bar;
