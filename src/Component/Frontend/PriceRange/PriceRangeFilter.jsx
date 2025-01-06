import React, { useState, useEffect } from "react";
import "./PriceRangeFilter.css"; // Import the CSS file

const PriceRangeFilter = ({ min, max, onRangeChange, currency,minDifference }) => {
  const [value, setValue] = useState([min, max]);

  useEffect(() => {
    setValue([min, max]);
  }, [min, max]);

  const handleChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    setValue((prev) => {
      const updated = [...prev];
      if (e.target.name === "min") updated[0] = Math.min(newValue, updated[1] - minDifference); // Prevent min from crossing max
      if (e.target.name === "max") updated[1] = Math.max(newValue, updated[0] + minDifference); // Prevent max from crossing min
      return updated;
    });
  };

  useEffect(() => {
    if (onRangeChange) {
      onRangeChange(value);
    }
  }, [value, onRangeChange]);

  const calculatePercentage = (val) => ((val - min) / (max - min)) * 100;

  return (
    <div className="price-range-filter">
      <div className="slider-container">
        {/* Track */}
        <div className="slider-track"></div>
        {/* Highlighted Range */}
        <div
          className="slider-range"
          style={{
            left: `${calculatePercentage(value[0])}%`,
            right: `${100 - calculatePercentage(value[1])}%`,
          }}
        ></div>
        {/* Min Handle */}
        <input
          type="range"
          name="min"
          min={min}
          max={max}
          value={value[0]}
          onChange={handleChange}
          className="slider-thumb"
        />
        {/* Max Handle */}
        <input
          type="range"
          name="max"
          min={min}
          max={max}
          value={value[1]}
          onChange={handleChange}
          className="slider-thumb"
        />
      </div>
      <div className="values">
        <span>Min: {currency}{value[0]}</span>
        <span>Max: {currency}{value[1]}</span>
      </div>
    </div>
  );
};

export default PriceRangeFilter;
