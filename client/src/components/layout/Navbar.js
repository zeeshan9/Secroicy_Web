import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import {
  Navbar as CustomNavbar,
  Nav,
  NavDropdown,
  Button,
} from "react-bootstrap";

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  const authLinks = (
    <Nav className='ml-auto'>
      <Nav.Link href='/portal/notifications'>
        <i className='fas fa-envelope'></i>
      </Nav.Link>
      <Nav.Link href='/portal/profile'>Profile</Nav.Link>
      <Nav.Link href='/portal/location'>Cell-Tracking</Nav.Link>
      <Nav.Link onClick={logout} href='#'>
        Logout
      </Nav.Link>
    </Nav>
  );

  const normalLinks = (
    <Nav className='ml-auto'>
      <Nav.Link href='/register'>REGISTER</Nav.Link>
      <Nav.Link href='/login'>LOGIN</Nav.Link>
    </Nav>
  );

  return (
    <CustomNavbar bg='dark' expand='lg'>
      <CustomNavbar.Brand href='/portal/posts'>
        <i className='fab fa-cloudversify'></i> Secroicy
      </CustomNavbar.Brand>
      <CustomNavbar.Toggle aria-controls='basic-navbar-nav' />
      <CustomNavbar.Collapse id='basic-navbar-nav'>
        {loading && !isAuthenticated ? normalLinks : authLinks}
      </CustomNavbar.Collapse>
    </CustomNavbar>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
