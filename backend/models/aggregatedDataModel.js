const mongoose = require('mongoose');

const AggregatedDataSchema = new mongoose.Schema({
  crypto: {
    name: String,
    symbol: String,
    price: Number,
    market_cap: Number,
  },
  weather: {
    city: String,
    temperature: Number,
    condition: String,
  },
  news: {
    title: String,
    source: String,
    url: String,
  },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('AggregatedData', AggregatedDataSchema);
