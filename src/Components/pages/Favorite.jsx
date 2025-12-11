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
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Your Top Searches</h2>
            {history.length > 0 && (
              <Button variant="danger" size="sm" onClick={clearHistory}>
                Clear History
              </Button>
            )}
          </div>

          {history.length === 0 ? (
            <Card className="text-center p-5 shadow-sm">
              <Card.Text className="text-muted">
                You haven't searched for any books yet.
              </Card.Text>
            </Card>
          ) : (
            <ListGroup as="ol" numbered shadow>
              {history.map((item, index) => (
                <ListGroup.Item
                  key={index}
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold text-capitalize">{item.term}</div>
                    <small className="text-muted">
                      {index === 0 ? "Most searched!" : "Previously searched"}
                    </small>
                  </div>
                  <Badge bg="primary" pill>
                    {item.count} times
                  </Badge>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
      </Row>
    </Container>
  );
}
