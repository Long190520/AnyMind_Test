const express = require('express');
const rateLimit = require('express-rate-limit');

const AppError = require('./utils/appError');
const aggregatedDataRouter = require('./routes/aggregatedDataRoutes');

const app = express();

const limiter = rateLimit({
  max: 5,
  windowMs: 60 * 1000,
  message: 'Too many requests, please wait before retrying.',
});
app.use('/', limiter);

app.use('/aggregated-data', aggregatedDataRouter);

app.all(/(.*)/, (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl} on this server`, 404));
});

module.exports = app;
