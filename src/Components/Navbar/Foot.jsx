import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    // 'mt-5' adds margin top to separate footer from content
    // 'py-4' adds padding on y-axis (top/bottom)
    <footer className="bg-dark text-light py-4 mt-5">
      <Container>
        <Row>
          {/* Column 1: About / Brand */}
          <Col md={4} className="mb-4">
            <h5 className="text-uppercase fw-bold">Okei_Stack </h5>
            <p>
              Your personal library tracker. Discover new books, manage your
              collection, and track your reading progress all in one place.
              Okeit_Stack Library
            </p>
          </Col>

          {/* Column 2: Quick Links */}
          <Col md={4} className="mb-4">
            <h5 className="text-uppercase fw-bold">Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-light text-decoration-none">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/favorites"
                  className="text-light text-decoration-none"
                >
                  Favorites
                </Link>
              </li>
            </ul>
          </Col>

          {/* Column 3: Contact Info */}
          <Col md={4} className="mb-4">
            <h5 className="text-uppercase fw-bold">Contact</h5>
            <p className="mb-1">
              <i className="bi bi-geo-alt-fill me-2"></i> Library Okei_Stack
            </p>
            <p className="mb-1">
              <i className="bi bi-envelope-fill me-2"></i>{" "}
              keitaumar122499@gmail.com
            </p>
            <p>
              <i className="bi bi-telephone-fill me-2"></i> +90 5488792412
            </p>
          </Col>
        </Row>

        <hr className="bg-light" />

        <Row>
          <Col className="text-center">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} Okei_Stack Library. All rights
              reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
