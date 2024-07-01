import React, { useEffect, useRef, useState } from "react";
import "./PricesAdvert.css";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";
import { yesterdayPrices, todayPrices, products } from "../../data/AdvertData";

const PricesAdvert = () => {
  // Precompute whether each product's price is up or down
  const productsWithArrows = products.map((product) => {
    const yesterdayPrice = yesterdayPrices[product.name] || 0;
    const todayPrice = todayPrices[product.name] || 0;
    const isPriceUp = todayPrice > yesterdayPrice;
    const isPriceDown = todayPrice < yesterdayPrice;

    return {
      ...product,
      isPriceUp,
      isPriceDown,
    };
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const totalItems = productsWithArrows.length;
  const itemWidth = 50; // Adjusted width for demonstration

  const scrollingRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems);
    }, 3000); // Interval time in milliseconds

    return () => clearInterval(interval);
  }, [totalItems]);

  return (
    <div className="prices-advert">
      <div
        className="scrolling-text"
        style={{
          transform: `translateX(${-currentIndex * itemWidth}px)`,
          width: `${totalItems * itemWidth}px`,
        }}
        ref={scrollingRef}
      >
        {productsWithArrows.map((product, index) => (
          <span className="product" key={index}>
            {product.emoji} {product.name}:{" "}
            {todayPrices[product.name].toFixed(2)}{" "}
            {product.isPriceUp && (
              <ArrowUpward style={{ color: "green", marginLeft: "5px" }} />
            )}
            {product.isPriceDown && (
              <ArrowDownward style={{ color: "red", marginLeft: "5px" }} />
            )}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PricesAdvert;
