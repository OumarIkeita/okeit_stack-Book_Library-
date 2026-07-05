import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <Container>
        <Row>
          <Col md={4} className="mb-4">
            <h5 className="text-uppercase fw-bold">Okei_Stack</h5>
            <p className="text-light opacity-75">
              Discover books, organize your reading interests, and enjoy a
              cleaner, more thoughtful library experience.
            </p>
          </Col>

          <Col md={4} className="mb-4">
            <h5 className="text-uppercase fw-bold">Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link
                  to="/"
                  className="text-light text-decoration-none footer-link"
                >
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/favorites"
                  className="text-light text-decoration-none footer-link"
                >
                  Favorites
                </Link>
              </li>
            </ul>
          </Col>

          <Col md={4} className="mb-4">
            <h5 className="text-uppercase fw-bold">Contact</h5>
            <p className="mb-1 text-light opacity-75">
              <i className="bi bi-geo-alt-fill me-2"></i> Library Okei_Stack
            </p>
            <p className="mb-1 text-light opacity-75">
              <i className="bi bi-envelope-fill me-2"></i>{" "}
              keitaumar122499@gmail.com
            </p>
            <p className="text-light opacity-75">
              <i className="bi bi-telephone-fill me-2"></i> +90 5488792412
            </p>
          </Col>
        </Row>

        <hr className="bg-light" />

        <Row>
          <Col className="text-center">
            <p className="mb-0 text-light opacity-75">
              &copy; {new Date().getFullYear()} Okei_Stack Library. All rights
              reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
