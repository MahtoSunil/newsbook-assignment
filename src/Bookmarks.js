import React from 'react';

const Bookmarks = () => {
  const bookmarkedArticles = JSON.parse(localStorage.getItem('bookmarkedArticles')) || [];

  return (
    <div>
      <h2>Bookmarks</h2>
      {bookmarkedArticles.map((article) => (
        <div key={article.id}>
          <h3>{article.title}</h3>
          <p>Author: {article.by}</p>
          <p>Score: {article.score}</p>
          <a href={article.url} target="_blank" rel="noreferrer">
            Read More
          </a>
        </div>
      ))}
    </div>
  );
};

export default Bookmarks;
