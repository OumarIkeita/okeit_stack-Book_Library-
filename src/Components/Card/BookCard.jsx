import React from "react";
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import "./card.css";
export default function BookCard({ Books }) {
  return (
    <Container fluid="md">
      <Row>
        {Books.map((book) => {
          const infos = book.volumeInfo;
          const access = book.accessInfo;
          if (!infos) return null;
          const thumbnail = infos.imageLinks?.thumbnail;

          const pdfLink =
            access?.pdf?.downloadLink || access?.pdf?.acsTokenLink;
          const isPdfAvailable = access?.pdf?.isAvailable && pdfLink;
          const previewLink = infos.previewLink;

          return (
            <Col key={book.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card className="h-100 shadow-sm">
                {/* Image Handling */}
                <div
                  style={{
                    height: "250px",
                    overflow: "hidden",
                    background: "#f8f9fa",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {thumbnail ? (
                    <Card.Img
                      variant="top"
                      src={thumbnail}
                      alt={infos.title}
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
                    {infos.title}
                  </Card.Title>

                  <Card.Text
                    className="text-secondary mb-2"
                    style={{ fontSize: "0.9rem" }}
                  >
                    <strong>Author:</strong>{" "}
                    {infos.authors ? infos.authors.join(", ") : "Unknown"}
                  </Card.Text>

                  <Card.Text
                    className="text-muted mb-2"
                    style={{ fontSize: "0.85rem" }}
                  >
                    <strong>Published:</strong> {infos.publishedDate || "N/A"}
                  </Card.Text>

                  {/* mt-auto pushes this text to the bottom if cards vary in height */}
                  <Card.Text
                    className="mt-auto text-muted"
                    style={{ fontSize: "0.85rem" }}
                  >
                    <small>
                      Category:{" "}
                      {infos.categories ? infos.categories[0] : "Unknown"}
                    </small>
                  </Card.Text>
                  <div className="mt-auto d-grid gap-2">
                    {/* BUTTON 1: Open in Web Reader (Always available) */}
                    <Button
                      href={previewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="primary"
                      size="sm"
                    >
                      Read Online
                    </Button>

                    {/* BUTTON 2: Download PDF (Only if available) */}
                    {isPdfAvailable && (
                      <Button
                        href={pdfLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="outline-success" // Outline style to distinguish from Read button
                        size="sm"
                      >
                        Download PDF
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
