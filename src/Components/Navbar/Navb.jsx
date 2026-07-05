import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Image } from "react-bootstrap";
import logo from "./Keita.png";

export default function Navb() {
  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      sticky="top"
      className="shadow-sm py-3"
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center gap-2"
        >
          <Image
            src={logo}
            alt="book"
            width="40"
            height="40"
            rounded
            className="d-inline-block align-top"
          />
          <span className="navbar-brand-text text-white">
            Okei_Stack Library
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto gap-2">
            <Nav.Link as={Link} to="/" className="text-light fw-semibold">
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/favorites"
              className="text-light fw-semibold"
            >
              Favorites
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
