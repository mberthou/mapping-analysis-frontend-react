import { useEffect, useState, useRef } from "react";
import { Chart } from "chart.js/auto";
import { useThemeProvider } from "../utils/ThemeContext";

import { getCssVariable } from "../utils/Utils";
import { chartColors } from "./ChartjsConfig";
import { formatTickBln } from "../utils/Utils";

/*
 * Chart built with Chart.js
 */

const UkTopWeatlhDistro_Bar = ({ distroData }) => {
  const [chart, setChart] = useState(null);
  const canvas = useRef(null);
  const { currentTheme } = useThemeProvider();
  const darkMode = currentTheme === "dark";
  const {
    textColor,
    gridColor,
    tooltipBodyColor,
    tooltipBgColor,
    tooltipBorderColor,
  } = chartColors;

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
            label: "Bln GBP",
            data: dataCombinedWealthGbp,
            backgroundColor: getCssVariable("--color-violet-500"),
            hoverBackgroundColor: getCssVariable("--color-violet-700"),
            borderWidth: 1,
            borderRadius: 4,
          },
        ],
      },
      options: {
        layout: {
          padding: {
            top: 30,
            bottom: 16,
            left: 20,
            right: 20,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            border: {
              display: false,
            },
            ticks: {
              maxTicksLimit: 6,
              callback: (value) => formatTickBln(value),
              color: darkMode ? textColor.dark : textColor.light,
            },
          },
          x: {
            border: {
              display: false,
            },
            grid: {
              display: false,
            },
            ticks: {
              color: darkMode ? textColor.dark : textColor.light,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              title: () => false, // Disable tooltip title
              label: (context) => formatTickBln(context.parsed.y) + " Bln GBP",
            },
            bodyColor: darkMode
              ? tooltipBodyColor.dark
              : tooltipBodyColor.light,
            backgroundColor: darkMode
              ? tooltipBgColor.dark
              : tooltipBgColor.light,
            borderColor: darkMode
              ? tooltipBorderColor.dark
              : tooltipBorderColor.light,
          },
        },
        interaction: {
          intersect: false,
          mode: "nearest",
        },
        animation: {
          duration: 800,
        },
        maintainAspectRatio: false,
        resizeDelay: 200,
      },
    });
    setChart(newChart);
    return () => newChart.destroy();
  }, []);

  useEffect(() => {
    if (!chart) return;

    if (darkMode) {
      chart.options.scales.x.ticks.color = textColor.dark;
      chart.options.scales.y.ticks.color = textColor.dark;
      chart.options.scales.y.grid.color = gridColor.dark;
      chart.options.plugins.tooltip.bodyColor = tooltipBodyColor.dark;
      chart.options.plugins.tooltip.backgroundColor = tooltipBgColor.dark;
      chart.options.plugins.tooltip.borderColor = tooltipBorderColor.dark;
    } else {
      chart.options.scales.x.ticks.color = textColor.light;
      chart.options.scales.y.ticks.color = textColor.light;
      chart.options.scales.y.grid.color = gridColor.light;
      chart.options.plugins.tooltip.bodyColor = tooltipBodyColor.light;
      chart.options.plugins.tooltip.backgroundColor = tooltipBgColor.light;
      chart.options.plugins.tooltip.borderColor = tooltipBorderColor.light;
    }
    chart.update("none");
  }, [currentTheme]);

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
