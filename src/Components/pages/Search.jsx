//import React, { useEffect } from "react";
import { useState } from "react";
import BookCard from "../Card/BookCard";
import {
  Container,
  Form,
  Button,
  Alert,
  Row,
  Col,
  InputGroup,
} from "react-bootstrap";
export default function Search() {
  const [books, setBooks] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  // Helper function to save search to LocalStorage
  const saveToHistory = (searchTerm) => {
    const cleanTerm = searchTerm.trim().toLowerCase();
    // Get existing history
    const history = JSON.parse(localStorage.getItem("bookSearchHistory")) || {};
    // Increment count
    history[cleanTerm] = (history[cleanTerm] || 0) + 1;
    // Save back
    localStorage.setItem("bookSearchHistory", JSON.stringify(history));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) {
      setError("Please type your book name");
      return;
    }
    setError("");
    //save the book search
    saveToHistory(input);
    //fetch(`https://gutendex.com/books?search=${input}`)
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${input}`)
      .then((dt) => dt.json())
      .then((data) => {
        setBooks(data.items || []);
      })
      .catch((err) => console.error("Error fetching books:", err));
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    if (error) {
      setError("");
    }
  };

  return (
    <>
      <Container className="my-5">
        <h2 className="text-center mb-4">Find Your Book</h2>
        <Form onSubmit={handleSubmit}>
          <Row className="justify-content-center">
            <Col xs={12} md={8} lg={6}>
              {error && (
                <Alert
                  variant="danger"
                  onClose={() => setError("")}
                  dismissible
                >
                  {error}
                </Alert>
              )}
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Search your favorite book..."
                  aria-label="Search your favorite book"
                  value={input}
                  onChange={handleInputChange}
                  size="lg"
                  isInvalid={!!error}
                />
                <Button type="submit" variant="primary" size="lg">
                  Search
                </Button>
              </InputGroup>
            </Col>
          </Row>
        </Form>
      </Container>
      <BookCard Books={books} />
    </>
  );
}
