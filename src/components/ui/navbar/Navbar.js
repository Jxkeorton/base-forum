import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../../assets/logo.png";
import Avatar from "../avatar/Avatar";
import { useCurrentUser, useSetCurrentUser } from "../../../contexts/CurrentUserContext";
import { useModal } from "../../../contexts/ReviewModalContext";
import axios from 'axios';
import useClickOutsideToggle from "../../../hooks/useClickOutsideToggle";
import ConfirmationModal from "../ConfirmationModal";

const isActive = (navData) =>
  navData.isActive ? `${styles.NavLink} ${styles.Active}` : styles.NavLink;

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const navigate = useNavigate();

  const { expanded, setExpanded, ref } = useClickOutsideToggle();
  const { showModal } = useModal();

  const [showSignOutModal, setShowSignOutModal] = useState(false);

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      setShowSignOutModal(false);
      navigate("/"); 
    } catch (err) {
      console.log(err);
    }
  };

  const addReviewIcon = (
    <NavLink className={styles.NavLink} to="#" onClick={showModal}>
      <i className="fas fa-plus-square"></i> Add Review
    </NavLink>
  );
  const loggedInIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        to="#"
        onClick={() => setShowSignOutModal(true)}
      >
        <i className="fas fa-sign-out-alt"></i> Sign Out
      </NavLink>
      <NavLink className={isActive} to={`/profile/${currentUser?.profile_id}`}>
        <Avatar src={currentUser?.profile_image} text="Profile" height={40} />
      </NavLink>
    </>
  );
  const loggedOutIcons = (
    <>
      <NavLink className={isActive} to="/sign-in">
        <i className="fas fa-sign-in-alt"></i> Sign In
      </NavLink>
      <NavLink className={isActive} to="/sign-up">
        <i className="fas fa-user-plus"></i> Sign Up
      </NavLink>
    </>
  );

  return (
    <Navbar expanded={expanded} bg="dark" data-bs-theme="dark" expand="md" fixed="top">
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="45" />
          </Navbar.Brand>
        </NavLink>
        {currentUser && addReviewIcon}
        <Navbar.Toggle ref={ref} onClick={() => setExpanded(!expanded)} aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="ml-auto">
            <NavLink className={isActive} to="/">
              <i className="fa-solid fa-location-dot"></i> Locations
            </NavLink>
            <NavLink className={isActive} to="/reviews">
              <i className="fa-solid fa-location-dot"></i> Reviews
            </NavLink>
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>

      <ConfirmationModal
        show={showSignOutModal}
        handleClose={() => setShowSignOutModal(false)}
        handleAction={handleSignOut}
        title="Confirm Sign Out"
        bodyText="Are you sure you want to sign out?"
        actionLabel="Sign Out"
        cancelLabel="Cancel"
      />
    </Navbar>
  );
};

export default NavBar;