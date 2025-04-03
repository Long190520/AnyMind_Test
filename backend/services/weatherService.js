const axios = require('axios');
const AppError = require('../utils/appError');

const fetchWeatherData = async (city) => {
  try {
    const response = await axios.get(
      'https://api.openweathermap.org/data/2.5/weather',
      {
        params: {
          q: city,
          units: 'metric',
          appid: process.env.OPENWEATHER_API_KEY,
        },
      },
    );

    const normalizedData = {
      city: response.data.name,
      temperature: response.data.main.temp,
      condition: response.data.weather[0].main,
    };

    return normalizedData;
  } catch (error) {
    throw new AppError(`Cant find ${city} weather data`, 404);
  }
};

module.exports = { fetchWeatherData };
