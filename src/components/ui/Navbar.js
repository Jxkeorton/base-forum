import React from 'react'
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../../assets/logo.png'

const isActive = (navData) => ((navData.isActive ? `${styles.NavLink} ${styles.Active}` : styles.NavLink))

const NavBar = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="md" fixed='top'>
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt='logo' height='45'/>
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
          <Nav className="ml-auto">
            <NavLink className={isActive} to="/">
              <i className="fa-solid fa-location-dot"></i> Locations
            </NavLink>
            <NavLink className={isActive} to="/sign-in">
              <i className="fas fa-sign-in-alt"></i> Sign In
            </NavLink>
            <NavLink className={isActive} activeClassName={styles.Active} to="/sign-up">
              <i className="fas fa-user-plus"></i> Sign Up
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar