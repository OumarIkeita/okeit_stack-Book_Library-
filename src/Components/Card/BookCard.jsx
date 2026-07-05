import React from "react";
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import "./card.css";

export default function BookCard({ Books = [] }) {
  const handleDownload = (bookKey, format = "epub") => {
    const downloadUrl = `https://openlibrary.org${bookKey}/${format}`;
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = true;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!Array.isArray(Books) || Books.length === 0) {
    return (
      <Container fluid="md" className="pb-5">
        <div className="hero-card p-4 text-center">
          <p className="text-muted mb-0">Search for a book to see results.</p>
        </div>
      </Container>
    );
  }

  return (
    <Container fluid="md" className="pb-5">
      <Row>
        {Books.map((book, index) => {
          const infos = book.volumeInfo || {};
          const access = book.accessInfo || {};
          const isFreeAvailable = access?.free?.isAvailable;
          const bookKey = access?.free?.key;
          const title = infos.title || "Untitled";
          const authors = infos.authors?.length ? infos.authors : ["Unknown"];
          const thumbnail = infos.imageLinks?.thumbnail || null;
          const previewLink = infos.previewLink || "";
          const pdfLink =
            access?.pdf?.downloadLink || access?.pdf?.acsTokenLink || "";
          const isPdfAvailable = Boolean(pdfLink);

          return (
            <Col
              key={book.id || `${title}-${index}`}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              className="mb-4"
            >
              <Card className="h-100 shadow-sm book-card">
                <div
                  className="book-cover"
                  style={{
                    height: "250px",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {thumbnail ? (
                    <Card.Img
                      variant="top"
                      src={thumbnail}
                      alt={title}
                      style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "contain",
                        padding: "10px",
                      }}
                    />
                  ) : (
                    <div className="text-muted text-center p-3">
                      No Cover Available
                    </div>
                  )}
                </div>

                <Card.Body className="d-flex flex-column">
                  <Card.Title
                    style={{ fontSize: "1.1rem", fontWeight: "bold" }}
                  >
                    {title}
                  </Card.Title>

                  <Card.Text
                    className="text-secondary mb-2"
                    style={{ fontSize: "0.9rem" }}
                  >
                    <strong>Author:</strong> {authors.join(", ")}
                  </Card.Text>

                  <div className="d-flex flex-wrap gap-2 mb-3">
                    <span className="book-chip">
                      {infos.categories?.[0] || "General"}
                    </span>
                    <span className="book-chip">
                      {infos.publishedDate || "Unknown"}
                    </span>
                    {isFreeAvailable && (
                      <span
                        className="book-chip"
                        style={{
                          background: "#dcfce7",
                          color: "#15803d",
                          fontWeight: "800",
                        }}
                      >
                        Free Download
                      </span>
                    )}
                  </div>

                  <Card.Text
                    className="text-muted mb-2"
                    style={{ fontSize: "0.85rem" }}
                  >
                    <strong>Published:</strong> {infos.publishedDate || "N/A"}
                  </Card.Text>

                  <div className="mt-auto d-grid gap-2">
                    <Button
                      href={previewLink || undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="primary"
                      size="sm"
                      disabled={!previewLink}
                    >
                      Read Online
                    </Button>

                    {isPdfAvailable && (
                      <Button
                        href={pdfLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="outline-success"
                        size="sm"
                      >
                        Download PDF
                      </Button>
                    )}

                    {isFreeAvailable && (
                      <Button
                        onClick={() => handleDownload(bookKey, "epub")}
                        variant="success"
                        size="sm"
                        className="fw-semibold"
                      >
                        Free Download
                      </Button>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
