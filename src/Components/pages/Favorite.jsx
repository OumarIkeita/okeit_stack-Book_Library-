import React, { useEffect, useState } from "react";
import {
  Container,
  ListGroup,
  Badge,
  Button,
  Row,
  Col,
  Card,
} from "react-bootstrap";

export default function Favorites() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // 1. Get data from LocalStorage
    const storedHistory =
      JSON.parse(localStorage.getItem("bookSearchHistory")) || {};

    // 2. Convert object { "harry potter": 5, "react": 2 } into an array
    // 3. Sort by count (highest first)
    const sortedHistory = Object.entries(storedHistory)
      .sort((a, b) => b[1] - a[1]) // Sort Descending
      .map(([term, count]) => ({ term, count }));

    setHistory(sortedHistory);
  }, []);

  const clearHistory = () => {
    localStorage.removeItem("bookSearchHistory");
    setHistory([]);
  };

  return (
    <Container className="my-5 page-shell">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8}>
          <div className="hero-card p-4 p-md-5 mb-4">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
              <div>
                <div className="d-flex align-items-center gap-2 mb-2">
                  <span className="book-chip">Saved insights</span>
                  <span className="book-chip">Your preferences</span>
                </div>
                <h2 className="page-title mb-1">Your Top Searches</h2>
                <p className="page-subtitle mb-0 text-start">
                  A polished view of the books and topics you revisit most
                  often.
                </p>
              </div>
              {history.length > 0 && (
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={clearHistory}
                >
                  Clear History
                </Button>
              )}
            </div>

            {history.length === 0 ? (
              <Card className="text-center p-5 content-card border-0">
                <div className="mb-3">
                  <i className="bi bi-bookmarks-fill fs-1 text-primary"></i>
                </div>
                <Card.Title className="mb-2">No search history yet</Card.Title>
                <Card.Text className="text-muted mb-0">
                  Start searching for books and your favorite topics will appear
                  here.
                </Card.Text>
              </Card>
            ) : (
              <ListGroup as="ol" className="border-0">
                {history.map((item, index) => (
                  <ListGroup.Item
                    key={index}
                    as="li"
                    className="d-flex justify-content-between align-items-center rounded-3 mb-2 border-0 shadow-sm px-3 py-3"
                  >
                    <div className="ms-2 me-auto">
                      <div className="fw-bold text-capitalize mb-1">
                        {item.term}
                      </div>
                      <small className="text-muted">
                        {index === 0 ? "Most searched" : "Recently revisited"}
                      </small>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <Badge bg="light" text="dark" pill className="px-3 py-2">
                        {item.count} {item.count === 1 ? "time" : "times"}
                      </Badge>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
