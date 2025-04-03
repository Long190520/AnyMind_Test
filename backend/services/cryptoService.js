const axios = require('axios');
const AppError = require('../utils/appError');

const fetchCryptoData = async (coin = 'bitcoin') => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coin}`,
      {
        params: {
          localization: false,
          tickers: false,
          market_data: true,
          community_data: false,
          developer_data: false,
        },
      },
    );

    const normalizedData = {
      name: response.data.name,
      symbol: response.data.symbol.toUpperCase(),
      price: response.data.market_data.current_price.usd,
      market_cap: response.data.market_data.market_cap.usd,
    };

    return normalizedData;
  } catch (error) {
    throw new AppError(`Cant find ${coin} crypto data`, 404);
  }
};

module.exports = { fetchCryptoData };
