import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../../assets/logo.png'

const NavBar = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="md" fixed='top'>
      <Container>
        <Navbar.Brand>
          <img src={logo} alt='logo' height='45'/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
          <Nav className="ml-auto">
            <Nav.Link>
              <i class="fa-solid fa-location-dot"></i> Locations
            </Nav.Link>
            <Nav.Link>
              <i class="fas fa-sign-in-alt"></i> Sign In
            </Nav.Link>
            <Nav.Link>
              <i class="fas fa-user-plus"></i> Sign Up
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar