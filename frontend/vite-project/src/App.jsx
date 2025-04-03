import React, { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import "./App.css";
import CryptoCard from "../components/CryptoCard";
import WeatherCard from "../components/WeatherCard";
import NewsCard from "../components/NewsCard";
import FilterPanel from "../components/FilterPanel";
import toast from "react-hot-toast";

function App() {
  const [aggregatedData, setAggregatedData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Filter states
  const [cryptoMinPrice, setCryptoMinPrice] = useState(0);
  const [cryptoMaxPrice, setCryptoMaxPrice] = useState(100000);
  const [selectedCity, setSelectedCity] = useState("London");
  const [newsKeyword, setNewsKeyword] = useState("technology");

  useEffect(
    function () {
      async function fetchData() {
        setIsLoading(true);
        setAggregatedData(null); // Reset data before fetching new data
        try {
          const response = await fetch(
            `http://localhost:3000/aggregated-data?minPrice=${cryptoMinPrice}&maxPrice=${cryptoMaxPrice}&city=${selectedCity}&newsKeyword=${newsKeyword}`
          );
          if (!response.ok) {
            throw new Error("Server error");
          }
          const data = await response.json();
          if (!data) {
            toast.error("No data with the specified filter!");
            return;
          }
          setAggregatedData(data);
        } catch (err) {
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      }

      fetchData();
    },
    [cryptoMinPrice, cryptoMaxPrice, selectedCity, newsKeyword]
  );

  const handlePriceFilterChange = (min, max) => {
    setCryptoMinPrice(min);
    setCryptoMaxPrice(max);
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
  };

  const handleNewsSearch = (keyword) => {
    setNewsKeyword(keyword);
  };

  if (isLoading) return <div className="loading">Loading data...</div>;

  return (
    <div className="app">
      <header>
        <h1>Multi-API Dashboard</h1>
      </header>

      <FilterPanel
        onPriceFilterChange={handlePriceFilterChange}
        onCityChange={handleCityChange}
        onNewsSearch={handleNewsSearch}
        currentCity={selectedCity}
        currentMinPrice={cryptoMinPrice}
        currentMaxPrice={cryptoMaxPrice}
        currentKeyword={newsKeyword}
      />

      <div className="dashboard">
        {aggregatedData != null && (
          <>
            <CryptoCard crypto={aggregatedData.crypto} />
            <WeatherCard weather={aggregatedData.weather} />
            <NewsCard news={aggregatedData.news} />
          </>
        )}
      </div>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 3000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(color--grey-0)",
            color: "var(color--grey-0)",
          },
        }}
      />
    </div>
  );
}

export default App;
