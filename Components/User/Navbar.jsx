import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

const AppNavbar = () => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-brand">Zidio Task Management</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto"> {/* Right aligned nav items */}
            <Nav.Link as={Link} to="/home-user" className="nav-item nav-link-hover text-white">Home</Nav.Link>
            <Nav.Link as={Link} to="/user-dashboard" className="nav-item nav-link-hover text-white">Tasks</Nav.Link>
            <Nav.Link as={Link} to="/profile" className="nav-item nav-link-hover text-white">Profile</Nav.Link>
            <Nav.Link as={Link} to="/join-meet" className="nav-item nav-link-hover text-white">Create Meeting</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
