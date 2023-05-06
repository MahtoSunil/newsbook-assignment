import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

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
    <Container>
      <h2 className="my-4">Top Stories</h2>
      <Row>
        {articles.map((article) => (
          <Col key={article.id} xs={12} md={6} lg={4}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <Card.Text>
                  <small>Author: {article.by}</small>
                  <br />
                  <small>Score: {article.score}</small>
                </Card.Text>
                <Button variant="primary" href={article.url} target="_blank" rel="noreferrer">
                  Read More
                </Button>{' '}
                <Button variant="outline-secondary" onClick={() => handleBookmark(article)}>
                  Bookmark
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default News;
