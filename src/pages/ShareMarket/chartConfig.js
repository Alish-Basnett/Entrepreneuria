import { Chart } from "chart.js/auto"; // Import Chart.js (version 3)

// Function to create and render a line chart
export const renderLineChart = (ctx, data, options) => {
  return new Chart(ctx, {
    type: "line",
    data: data,
    options: options,
  });
};

// Function to destroy a chart instance safely
export const destroyChart = (chartInstance) => {
  if (chartInstance) {
    chartInstance.destroy();
  }
};
