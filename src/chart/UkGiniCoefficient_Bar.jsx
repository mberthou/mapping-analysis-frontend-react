import { useEffect, useState, useRef } from "react";
import { Chart } from "chart.js/auto";
import { useThemeProvider } from "../utils/ThemeContext";

import { getCssVariable } from "../utils/Utils";
import { chartColors } from "./ChartjsConfig";

/*
 * Chart built with Chart.js
 */

const UkGiniCoefficient_Bar = ({ giniCoefficientsData }) => {
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
    let dataYears = [];
    let dataCoef = [];
    let dataName = [];
    let dataCitizenship = [];
    giniCoefficientsData.map((giniCoeffItem, index) => {
      dataYears.push(giniCoeffItem.year);
      dataCoef.push(giniCoeffItem.gini_coefficient);
      dataName.push(giniCoeffItem.name);
      dataCitizenship.push(giniCoeffItem.citizenship);
    });

    const newChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: dataYears,
        datasets: [
          // Indigo bars
          {
            label: "",
            data: dataCoef,
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
            position: "left",
            beginAtZero: true,
            border: {
              display: false,
            },
            // ticks: {
            //   callback: function (value, index, ticks) {
            //     return formatTickBln(value) + "B";
            //   },
            // },
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
              label: (context) =>
                context.parsed.y + "% in " + dataYears[context.dataIndex],
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
    <div className="flex flex-col col-span-full min-h-[400px]  bg-white dark:bg-gray-800 shadow-xs rounded-xl max-sm:max-h-[400px] xl:max-h-[500px]">
      <div className="px-5 pt-4 text-xs text-gray-400 dark:text-gray-500 -mb-[10px]">
        <span>Gini Coefficient %</span>
      </div>
      <div className="grow max-sm:max-h-[400px] xl:max-h-[500px]">
        <canvas ref={canvas}></canvas>
      </div>
      <div className="px-5 pb-4 text-center text-xs text-gray-400 dark:text-gray-500 -mt-[5px]">
        Year
      </div>
    </div>
  );
};

export default UkGiniCoefficient_Bar;
