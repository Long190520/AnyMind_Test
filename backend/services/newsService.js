const axios = require('axios');

const fetchLatestNews = async (keyword) => {
  try {
    const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
      params: {
        q: keyword,
        apiKey: process.env.NEWSAPI_API_KEY,
        pageSize: 1,
      },
    });

    const article = response.data.articles[0];
    return {
      title: article.title,
      source: article.source.name,
      url: article.url,
    };
  } catch (error) {
    throw new AppError(`Cant find news data`, 404);
  }
};

module.exports = { fetchLatestNews };
