//import React, { useEffect } from "react";
import { useState } from "react";
import BookCard from "../Card/BookCard";
import { Container, Form, Button, Alert, Row, Col } from "react-bootstrap";
export default function Search() {
  const [books, setBooks] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  // Helper function to save search to LocalStorage
  const saveToHistory = (searchTerm) => {
    const cleanTerm = searchTerm.trim().toLowerCase();
    const history = JSON.parse(localStorage.getItem("bookSearchHistory")) || {};
    history[cleanTerm] = (history[cleanTerm] || 0) + 1;
    localStorage.setItem("bookSearchHistory", JSON.stringify(history));
  };

  const mapOpenLibraryResults = (books) =>
    (books || []).map((book, index) => ({
      id: book.key || `${book.title}-${index}`,
      volumeInfo: {
        title: book.title || "Untitled",
        authors:
          Array.isArray(book.author_name) && book.author_name.length
            ? book.author_name
            : ["Unknown"],
        publishedDate: book.first_publish_year
          ? String(book.first_publish_year)
          : "N/A",
        categories:
          Array.isArray(book.subject) && book.subject.length
            ? book.subject.slice(0, 2)
            : ["General"],
        previewLink: book.key ? `https://openlibrary.org${book.key}` : "",
        imageLinks: book.cover_i
          ? {
              thumbnail: `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`,
            }
          : {},
      },
      accessInfo: {
        pdf: {
          isAvailable: false,
          downloadLink: null,
        },
        free: {
          isAvailable: Boolean(book.has_fulltext),
          formats: book.has_fulltext ? ["epub", "txt"] : [],
          key: book.key,
        },
      },
    }));

  const buildFallbackQueries = (query) => {
    const cleanQuery = query.trim().toLowerCase();
    const baseTerms = cleanQuery.split(/\s+/).filter(Boolean);
    const fallbackQueries = new Set();

    if (baseTerms.length > 0) {
      fallbackQueries.add(baseTerms.join(" "));
      fallbackQueries.add(baseTerms.slice(0, -1).join(" "));
      fallbackQueries.add(baseTerms[0]);
      fallbackQueries.add(`${baseTerms[0]} programming`);
      fallbackQueries.add(`${baseTerms[0]} tutorial`);
    }

    return Array.from(fallbackQueries).filter(Boolean);
  };

  const fetchBooks = async (query) => {
    const queries = buildFallbackQueries(query);
    let allResults = [];

    for (const item of queries) {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(item)}&limit=8`,
      );

      if (!response.ok) {
        continue;
      }

      const data = await response.json();
      const mapped = mapOpenLibraryResults(data.docs || []);
      allResults = [...allResults, ...mapped];

      if (mapped.length >= 4) {
        break;
      }
    }

    const uniqueResults = [];
    const seen = new Set();

    allResults.forEach((book) => {
      if (!seen.has(book.id)) {
        seen.add(book.id);
        uniqueResults.push(book);
      }
    });

    return uniqueResults.slice(0, 12);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedInput = input.trim();

    if (!trimmedInput) {
      setError("Please type your book name");
      return;
    }

    setError("");
    setLoading(true);
    saveToHistory(trimmedInput);

    try {
      const mappedBooks = await fetchBooks(trimmedInput);
      setBooks(mappedBooks);

      if (mappedBooks.length === 0) {
        setError(
          `No clear book matches were found for "${trimmedInput}". Try a title, author, or a broader topic like programming, design, or history.`,
        );
      }
    } catch (err) {
      console.error("Error fetching books:", err);
      setBooks([]);
      setError(
        "The book service is temporarily unavailable. Please try again in a moment.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setInput(value);

    if (error) {
      setError("");
    }

    if (value.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(value.trim())}&limit=5`,
      );

      if (!response.ok) {
        return;
      }

      const data = await response.json();
      const nextSuggestions = (data.docs || [])
        .map((item) => item.title)
        .filter(Boolean)
        .slice(0, 5);

      setSuggestions(nextSuggestions);
    } catch {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (term) => {
    setInput(term);
    setSuggestions([]);
    handleSubmit({ preventDefault: () => {}, target: { value: term } });
  };

  return (
    <>
      <Container className="my-5">
        <div className="hero-card p-4 p-md-5 text-center mb-4">
          <h2 className="page-title mb-3">Find Your Next Favorite Book</h2>
          <p className="page-subtitle mb-4">
            Discover inspiring reads, explore new genres, and build your
            personal library with a clean, elegant search experience.
          </p>
          <Form
            onSubmit={handleSubmit}
            className="mx-auto"
            style={{ maxWidth: "720px" }}
          >
            <Row className="justify-content-center g-2">
              <Col xs={12} md={9}>
                {error && (
                  <Alert
                    variant="danger"
                    onClose={() => setError("")}
                    dismissible
                    className="text-start"
                  >
                    {error}
                  </Alert>
                )}
                <div className="d-flex gap-2 mb-3">
                  <div className="flex-grow-1 position-relative">
                    <Form.Control
                      placeholder="Search your favorite book..."
                      aria-label="Search your favorite book"
                      value={input}
                      onChange={handleInputChange}
                      size="lg"
                      isInvalid={!!error}
                      className="shadow-sm"
                    />
                    {suggestions.length > 0 && (
                      <div
                        className="position-absolute w-100 mt-1 rounded-3 shadow-sm border bg-white z-3"
                        style={{ top: "100%", left: 0 }}
                      >
                        {suggestions.map((suggestion, index) => (
                          <button
                            key={`${suggestion}-${index}`}
                            type="button"
                            className="d-block w-100 text-start px-3 py-2 border-0 bg-white hover-bg-light"
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={loading}
                    className="px-4 fw-semibold rounded-pill shadow-sm border-0 flex-shrink-0"
                    style={{
                      background:
                        "linear-gradient(135deg, #4f46e5 0%, #2563eb 100%)",
                      minWidth: "120px",
                      transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    }}
                  >
                    {loading ? "Searching..." : "Search"}
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      </Container>
      <BookCard Books={books} />
    </>
  );
}
