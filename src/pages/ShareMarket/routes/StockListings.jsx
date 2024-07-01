import React from "react";
import {
  yesterdayPrices,
  todayPrices,
  products,
} from "../../../data/AdvertData";
import "../routes.css";

const StockListings = () => {
  // Calculate percentage change from yesterday to today
  const calculatePercentageChange = (yesterdayPrice, todayPrice) => {
    if (yesterdayPrice === 0) return 0; // Prevent division by zero
    return ((todayPrice - yesterdayPrice) / yesterdayPrice) * 100;
  };

  return (
    <div className="stock-listings-container">
      <h2>Stock Listings</h2>
      <div className="stock-listings">
        {products.map((product) => {
          const yesterdayPrice = yesterdayPrices[product.name] || 0;
          const todayPrice = todayPrices[product.name] || 0;
          const percentageChange = calculatePercentageChange(
            yesterdayPrice,
            todayPrice
          );

          return (
            <div key={product.name} className="stock-item">
              <span className="emoji">{product.emoji}</span>
              <div className="product-details">
                <div className="product-name">{product.name}</div>
                <div className="prices">
                  <div className="price">
                    <span>Yesterday's Price:</span>{" "}
                    <span>{yesterdayPrice.toFixed(2)}</span>
                  </div>
                  <div className="price">
                    <span>Today's Price:</span>{" "}
                    <span>{todayPrice.toFixed(2)}</span>
                  </div>
                  <div className="percentage-change">
                    {percentageChange > 0 ? (
                      <span className="positive-change">
                        +{percentageChange.toFixed(2)}%
                      </span>
                    ) : (
                      <span className="negative-change">
                        {percentageChange.toFixed(2)}%
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StockListings;
