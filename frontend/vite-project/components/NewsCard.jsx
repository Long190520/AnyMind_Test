import React from 'react';

function NewsCard({ news }) {
  return (
    <div className="card news-card">
      <h2>Latest News</h2>
      <div className="card-content">
        <h3>{news.title}</h3>
        <p>Source: {news.source}</p>
        <a href={news.url} target="_blank" rel="noopener noreferrer">
          Read more
        </a>
      </div>
    </div>
  );
}

export default NewsCard;