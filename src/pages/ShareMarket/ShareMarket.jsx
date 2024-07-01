import React, { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto"; // Import Chart.js (version 3)
import { yesterdayPrices, todayPrices, products } from "../../data/AdvertData";
import {
  FaChartLine,
  FaThList,
  FaExchangeAlt,
  FaBriefcase,
  FaNewspaper,
  FaChartPie,
  FaTrophy,
  FaCog,
} from "react-icons/fa";
import "./ShareMarket.css";
import NavBar from "../../components/Layout/Navbar";
import StockListings from "./routes/StockListings";
import Leaderboard from "./routes/Leaderboard";

// Function to create and render a chart
const renderChart = (ctx, data, options, type) => {
  return new Chart(ctx, {
    type: type,
    data: data,
    options: options,
  });
};

// Function to destroy a chart instance safely
const destroyChart = (chartInstance) => {
  if (chartInstance) {
    chartInstance.destroy();
  }
};

const ShareMarket = () => {
  const [chartData, setChartData] = useState(null);
  const [chartOptions, setChartOptions] = useState(null);
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [selectedProduct, setSelectedProduct] = useState(""); // State for selected product
  const [selectedMenu, setSelectedMenu] = useState("chart"); // State for selected menu item
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null); // Reference to the chart instance

  useEffect(() => {
    const productNames = products.map((product) => product.name);
    const yesterdayPricesArray = productNames.map(
      (name) => yesterdayPrices[name] || 0
    );
    const todayPricesArray = productNames.map((name) => todayPrices[name] || 0);

    const data = {
      labels: productNames,
      datasets: [
        {
          label: "Yesterday's Prices",
          data: yesterdayPricesArray,
          fill: false,
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0.2)",
          tension: 0.1,
        },
        {
          label: "Today's Prices",
          data: todayPricesArray,
          fill: false,
          borderColor: "rgba(255,99,132,1)",
          backgroundColor: "rgba(255,99,132,0.2)",
          tension: 0.1,
        },
      ],
    };

    const options = {
      scales: {
        y: {
          beginAtZero: true, // Start y-axis from 0
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
    setLoading(false); // Set loading to false once data and options are set
  }, []);

  useEffect(() => {
    if (
      selectedMenu === "chart" &&
      chartRef.current &&
      chartData &&
      chartOptions
    ) {
      if (chartInstanceRef.current) {
        destroyChart(chartInstanceRef.current);
      }
      const ctx = chartRef.current.getContext("2d");
      const chartType = selectedProduct ? "bar" : "line"; // Use bar chart for single item, line chart for multiple
      chartInstanceRef.current = renderChart(
        ctx,
        chartData,
        chartOptions,
        chartType
      );
    }
  }, [chartData, chartOptions, selectedProduct, selectedMenu]);

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setSelectedProduct(value);

    const filteredProducts = products
      .map((product) => product.name)
      .filter((name) => name.toLowerCase() === value.toLowerCase());

    let productNames = filteredProducts.length
      ? filteredProducts
      : products.map((product) => product.name);

    const yesterdayPricesArray = productNames.map(
      (name) => yesterdayPrices[name] || 0
    );
    const todayPricesArray = productNames.map((name) => todayPrices[name] || 0);

    let data = {};
    if (filteredProducts.length === 1) {
      data = {
        labels: ["Yesterday's Price", "Today's Price"],
        datasets: [
          {
            label: filteredProducts[0],
            data: [yesterdayPricesArray[0], todayPricesArray[0]],
            backgroundColor: ["rgba(75,192,192,0.2)", "rgba(255,99,132,0.2)"],
            borderColor: ["rgba(75,192,192,1)", "rgba(255,99,132,1)"],
            borderWidth: 1,
          },
        ],
      };
    } else {
      data = {
        labels: productNames,
        datasets: [
          {
            label: "Yesterday's Prices",
            data: yesterdayPricesArray,
            fill: false,
            borderColor: "rgba(75,192,192,1)",
            backgroundColor: "rgba(75,192,192,0.2)",
            tension: 0.1,
          },
          {
            label: "Today's Prices",
            data: todayPricesArray,
            fill: false,
            borderColor: "rgba(255,99,132,1)",
            backgroundColor: "rgba(255,99,132,0.2)",
            tension: 0.1,
          },
        ],
      };
    }

    setChartData(data);
    setChartOptions({
      ...chartOptions,
      scales: {
        y: {
          beginAtZero: true, // Ensure y-axis always starts from 0
        },
      },
      plugins: {
        legend: {
          labels: {
            color: "black",
          },
        },
        tooltip: {
          backgroundColor: "white",
          titleColor: "black",
          bodyColor: "black",
          borderColor: "#ddd",
          borderWidth: 1,
        },
      },
    });
  };

  const renderContent = () => {
    if (selectedMenu === "chart") {
      return (
        <>
          <div className="chart-container">
            {loading && <div className="chart-loading">Loading...</div>}
            <canvas ref={chartRef} />
          </div>
          <div className="filter-container">
            <select value={selectedProduct} onChange={handleFilterChange}>
              <option value="">All Products</option>
              {products.map((product) => (
                <option key={product.name} value={product.name}>
                  {product.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Search product"
              value={selectedProduct}
              onChange={handleFilterChange}
            />
          </div>
        </>
      );
    }
    if (selectedMenu === "marketOverview") {
      return <div>Market Overview Content</div>;
    }
    if (selectedMenu === "stockListings") {
      return <StockListings />;
    }
    if (selectedMenu === "trade") {
      return <div>Trade Content</div>;
    }
    if (selectedMenu === "portfolio") {
      return <div>Portfolio Content</div>;
    }
    if (selectedMenu === "news") {
      return <div>News Content</div>;
    }
    if (selectedMenu === "analysis") {
      return <div>Analysis Content</div>;
    }
    if (selectedMenu === "leaderboard") {
      return <Leaderboard />;
    }
    if (selectedMenu === "settings") {
      return <div>Settings Content</div>;
    }
    // Add more conditions for other components as needed
    return null;
  };

  useEffect(() => {
    // Clean up chart instance on component unmount
    return () => {
      destroyChart(chartInstanceRef.current);
    };
  }, []);

  return (
    <>
      <NavBar />
      <div className="share-market-container">
        <h2>ENTREPRENEURIA STOCK EXCHANGE</h2>
        <nav className="horizontal-menu">
          <button onClick={() => setSelectedMenu("chart")}>
            <FaChartLine /> Chart
          </button>
          <button onClick={() => setSelectedMenu("marketOverview")}>
            <FaThList /> Market Overview
          </button>
          <button onClick={() => setSelectedMenu("stockListings")}>
            <FaThList /> Stock Listings
          </button>
          <button onClick={() => setSelectedMenu("trade")}>
            <FaExchangeAlt /> Trade
          </button>
          <button onClick={() => setSelectedMenu("portfolio")}>
            <FaBriefcase /> Portfolio
          </button>
          <button onClick={() => setSelectedMenu("news")}>
            <FaNewspaper /> News
          </button>
          <button onClick={() => setSelectedMenu("analysis")}>
            <FaChartPie /> Analysis
          </button>
          <button onClick={() => setSelectedMenu("leaderboard")}>
            <FaTrophy /> Leaderboard
          </button>
          <button onClick={() => setSelectedMenu("settings")}>
            <FaCog /> Settings
          </button>
          {/* Add more buttons for additional components */}
        </nav>

        {renderContent()}
      </div>
    </>
  );
};

export default ShareMarket;
