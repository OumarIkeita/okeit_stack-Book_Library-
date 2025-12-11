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
      className="shadow-sm"
    >
      <Container>
        {/* Brand / Logo */}
        <Navbar.Brand
          as={Link}
          to="/"
          style={{ fontWeight: "bold", fontSize: "1.5rem" }}
        >
          <Image
            src={logo}
            alt="book"
            width="40"
            height="40"
            rounded
            className="d-inline-block align-top"
          />
        </Navbar.Brand>

        {/* Hamburger Menu Toggle (for mobile) */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/favorites">
              Favorites
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
