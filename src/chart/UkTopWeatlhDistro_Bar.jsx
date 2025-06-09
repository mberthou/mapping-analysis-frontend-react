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
    let dataCombinedWealthPercent = [];
    distroData.map((wealthCategory) => {
      labels.push(wealthCategory.population_top_percent + "%");
      dataCombinedWealthGbp.push(wealthCategory.combined_wealth_bln_gbp);
      dataCombinedWealthPercent.push(wealthCategory.combined_wealth_percent);
    });

    const newChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          // Indigo bars
          {
            label: "Bln GBP",
            data: dataCombinedWealthGbp,
            backgroundColor: getCssVariable("--color-violet-500"),
            hoverBackgroundColor: getCssVariable("--color-violet-700"),
            borderWidth: 1,
            borderRadius: 4,
            yAxisID: "absoluteAxis",
          },
          // Turquoise bars
          {
            label: "%",
            data: dataCombinedWealthPercent,
            backgroundColor: getCssVariable("--color-sky-500"),
            hoverBackgroundColor: getCssVariable("--color-sky-700"),
            borderWidth: 1,
            borderRadius: 4,
            yAxisID: "percentageAxis",
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
          absoluteAxis: {
            position: "left",
            beginAtZero: true,
            border: {
              display: false,
            },
            ticks: {
              callback: function (value, index, ticks) {
                return formatTickBln(value) + "B";
              },
            },
          },
          percentageAxis: {
            position: "right",
            beginAtZero: true,
            border: {
              display: false,
            },
            grid: {
              display: false,
            },
            ticks: {
              callback: function (value, index, ticks) {
                return value + "%";
              },
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
              label: (context) => {
                if (context.datasetIndex === 0) {
                  return formatTickBln(context.parsed.y) + " Bln GBP";
                }
                return context.parsed.y + "%";
              },
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
      chart.options.scales.absoluteAxis.ticks.color = textColor.dark;
      chart.options.scales.absoluteAxis.grid.color = gridColor.dark;
      chart.options.scales.percentageAxis.ticks.color = textColor.dark;
      chart.options.scales.percentageAxis.grid.color = gridColor.dark;
      chart.options.plugins.tooltip.bodyColor = tooltipBodyColor.dark;
      chart.options.plugins.tooltip.backgroundColor = tooltipBgColor.dark;
      chart.options.plugins.tooltip.borderColor = tooltipBorderColor.dark;
    } else {
      chart.options.scales.x.ticks.color = textColor.light;
      chart.options.scales.absoluteAxis.ticks.color = textColor.light;
      chart.options.scales.absoluteAxis.grid.color = gridColor.light;
      chart.options.scales.percentageAxis.ticks.color = textColor.light;
      chart.options.scales.percentageAxis.grid.color = gridColor.light;
      chart.options.plugins.tooltip.bodyColor = tooltipBodyColor.light;
      chart.options.plugins.tooltip.backgroundColor = tooltipBgColor.light;
      chart.options.plugins.tooltip.borderColor = tooltipBorderColor.light;
    }
    chart.update("none");
  }, [currentTheme]);

  return (
    <div className="flex flex-col col-span-full min-h-[400px] lg:col-span-6 xl:col-span-6 bg-white dark:bg-gray-800 shadow-xs rounded-xl max-sm:max-h-[400px] xl:max-h-[500px]">
      <div className="grow max-sm:max-h-[400px] xl:max-h-[500px]">
        <canvas ref={canvas}></canvas>
      </div>
    </div>
  );
};

export default UkTopWeatlhDistro_Bar;
