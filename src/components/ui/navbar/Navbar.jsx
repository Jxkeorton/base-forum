import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../../assets/logo.png";
import Avatar from "../avatar/Avatar.jsx";
import { useCurrentUser } from "../../../contexts/CurrentUserContext.jsx";
import { useProfileContext } from "../../../contexts/ProfileContext.jsx";
import { useModal } from "../../../contexts/ReviewModalContext.jsx";
import useClickOutsideToggle from "../../../hooks/useClickOutsideToggle";
import ConfirmationModal from "../ConfirmationModal.jsx";

const isActive = (navData) =>
  navData.isActive ? `${styles.NavLink} ${styles.Active}` : styles.NavLink;

const NavBar = () => {
  const { currentUser, signOut } = useCurrentUser();
  const { profile } = useProfileContext();

  const navigate = useNavigate();
  const { expanded, setExpanded, ref } = useClickOutsideToggle();
  const { showModal } = useModal();
  const [showSignOutModal, setShowSignOutModal] = useState(false);

  const handleSignOut = async () => {
    const result = await signOut();
    if (result.success) {
      setShowSignOutModal(false);
      navigate("/");
    }
  };

  const avatarSrc = profile?.image || currentUser?.profile_image;

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
        <Avatar src={avatarSrc} text="Profile" height={40} />
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
    <Navbar
      expanded={expanded}
      bg="dark"
      data-bs-theme="dark"
      expand="md"
      fixed="top"
    >
      <Container>
        <div className={styles.brandContainer}>
          <NavLink to="/" className={styles.brandLink}>
            <Navbar.Brand className={styles.brandWrapper}>
              <img src={logo} alt="logo" height="45" />
              <p className={styles.title}>Base Forum</p>
            </Navbar.Brand>
          </NavLink>
        </div>
        {currentUser && addReviewIcon}
        <Navbar.Toggle
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="ml-auto">
            <NavLink className={isActive} to="/">
              <i className="fa-solid fa-location-dot"></i> Locations
            </NavLink>
            <NavLink className={isActive} to="/reviews">
              <i className="fa-solid fa-comment"></i> Reviews
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
