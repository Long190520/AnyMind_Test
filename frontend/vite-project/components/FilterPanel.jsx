import React, { useState } from "react";

function FilterPanel({
  onPriceFilterChange,
  onCityChange,
  onNewsSearch,
  currentCity,
  currentMinPrice,
  currentMaxPrice,
  currentKeyword,
}) {
  const [minPrice, setMinPrice] = useState(currentMinPrice);
  const [maxPrice, setMaxPrice] = useState(currentMaxPrice);
  const [city, setCity] = useState(currentCity);
  const [newsQuery, setNewsQuery] = useState(currentKeyword);

  const handlePriceSubmit = (e) => {
    e.preventDefault();
    onPriceFilterChange(Number(minPrice), Number(maxPrice));
  };

  const handleCitySubmit = (e) => {
    e.preventDefault();
    onCityChange(city);
  };

  const handleNewsSubmit = (e) => {
    e.preventDefault();
    onNewsSearch(newsQuery);
  };

  return (
    <div className="filter-panel">
      <div className="filter-section">
        <h3>Crypto Filter</h3>
        <form onSubmit={handlePriceSubmit}>
          <div className="filter-inputs">
            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
          <button type="submit">Apply</button>
        </form>
      </div>

      <div className="filter-section">
        <h3>Weather City</h3>
        <form onSubmit={handleCitySubmit}>
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit">Update</button>
        </form>
      </div>

      <div className="filter-section">
        <h3>News Search</h3>
        <form onSubmit={handleNewsSubmit}>
          <input
            type="text"
            placeholder="Search keyword"
            value={newsQuery}
            onChange={(e) => setNewsQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
    </div>
  );
}

export default FilterPanel;
