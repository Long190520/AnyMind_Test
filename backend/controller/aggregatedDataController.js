const AggregatedData = require('../models/aggregatedDataModel');
const { fetchCryptoData } = require('../services/cryptoService');
const { fetchWeatherData } = require('../services/weatherService');
const { fetchLatestNews } = require('../services/newsService');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.fetchAggregatedData = catchAsync(async (req, res, next) => {
  const [cryptoData, weatherData, newsData] = await Promise.all([
    fetchCryptoData(req.query.crypto),
    fetchWeatherData(req.query.city),
    fetchLatestNews(req.query.newsKeyword),
  ]);

  const aggregatedData = {
    crypto: cryptoData,
    weather: weatherData,
    news: newsData,
  };

  const newData = new AggregatedData(aggregatedData);
  await newData.save();

  res.status(200).json(aggregatedData);
});

exports.getAggregatedData = catchAsync(async (req, res, next) => {
  const { minPrice, maxPrice, city, newsKeyword } = req.query;

  let filter = {};

  if (minPrice || maxPrice) {
    filter['crypto.price'] = {};
    if (minPrice) filter['crypto.price'].$gte = parseFloat(minPrice);
    if (maxPrice) filter['crypto.price'].$lte = parseFloat(maxPrice);
  }

  if (city) {
    filter['weather.city'] = { $regex: city, $options: 'i' };
  }

  if (newsKeyword) {
    filter.$or = [
      { 'news.title': { $regex: newsKeyword, $options: 'i' } },
      { 'news.source': { $regex: newsKeyword, $options: 'i' } },
      { 'news.url': { $regex: newsKeyword, $options: 'i' } },
    ];
  }

  const data = await AggregatedData.findOne(filter).sort({ createdAt: -1 });

  res.status(200).json(data);
});
