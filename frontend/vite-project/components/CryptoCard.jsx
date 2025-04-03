import React from "react";

function CryptoCard({ crypto }) {
  return (
    <div className="card crypto-card">
      <h2>Cryptocurrency</h2>
      <div className="card-content">
        <h3>
          {crypto.name} ({crypto.symbol})
        </h3>
        <p className="price">Price: ${crypto.price.toLocaleString()}</p>
        <p>Market Cap: ${crypto.market_cap.toLocaleString()}</p>
      </div>
    </div>
  );
}

export default CryptoCard;
