import React, { useState, useEffect } from 'react';
import axios from 'axios';

const News = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json');
      const topStoryIds = response.data.slice(0, 20);
      const topStories = await Promise.all(
        topStoryIds.map(async (storyId) => {
          const storyResponse = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`);
          return storyResponse.data;
        })
      );
      setArticles(topStories);
    };

    fetchData();
  }, []);

  const handleBookmark = (article) => {
    const bookmarkedArticles = JSON.parse(localStorage.getItem('bookmarkedArticles')) || [];

    if (!bookmarkedArticles.some((a) => a.title === article.title)) {
      bookmarkedArticles.push(article);
      localStorage.setItem('bookmarkedArticles', JSON.stringify(bookmarkedArticles));
    }
  };

  return (
    <div>
      <h2>Top Stories</h2>
      {articles.map((article) => (
        <div key={article.id}>
          <h3>{article.title}</h3>
          <p>Author: {article.by}</p>
          <p>Score: {article.score}</p>
          <a href={article.url} target="_blank" rel="noreferrer">
            Read More
          </a>
          <button onClick={() => handleBookmark(article)}>Bookmark</button>
        </div>
      ))}
    </div>
  );
};

export default News;
