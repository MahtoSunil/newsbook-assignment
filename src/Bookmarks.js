import React from 'react';
import { Container, Card } from 'react-bootstrap';

const Bookmarks = () => {
  const bookmarkedArticles = JSON.parse(localStorage.getItem('bookmarkedArticles')) || [];

  return (
    <Container>
      <h2 className="my-4">Bookmarks</h2>
      {bookmarkedArticles.map((article) => (
        <Card key={article.id} className="mb-4" border="dark">
          <Card.Body>
            <Card.Title>{article.title}</Card.Title>
            <Card.Text>
              <small>Author: {article.by}</small>
              <br />
              <small>Score: {article.score}</small>
            </Card.Text>
            <a href={article.url} target="_blank" rel="noreferrer" className="btn btn-primary mr-2">
              Read More
            </a>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default Bookmarks;
