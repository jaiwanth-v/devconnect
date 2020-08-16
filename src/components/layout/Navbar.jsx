import React, { useState } from "react";
import { Grid, Button, AppBar, Toolbar } from "@material-ui/core";
import "./Navbar.scss";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import {
  enable as enableDarkMode,
  disable as disableDarkMode,
} from "darkreader";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const [isDark, setDark] = useState(false);
  const toggleDarkMode = () => {
    !isDark
      ? enableDarkMode({
          brightness: 100,
          contrast: 100,
          sepia: 10,
        })
      : disableDarkMode();
    setDark(!isDark);
  };
  const authLinks = () => (
    <>
      <NavLink
        activeClassName="loginButton"
        style={{ textDecoration: "none" }}
        to="/profiles"
      >
        <Button color="inherit" className="buttonFontSize ">
          Developers
        </Button>
      </NavLink>
      <NavLink
        activeClassName="loginButton"
        style={{ textDecoration: "none" }}
        to="/posts"
      >
        <Button color="inherit" className="buttonFontSize ">
          Posts
        </Button>
      </NavLink>
      <NavLink
        activeClassName="loginButton"
        style={{ textDecoration: "none" }}
        to="/dashboard"
      >
        <Button color="inherit" className="buttonFontSize ">
          Dashboard
        </Button>
      </NavLink>
      <NavLink style={{ textDecoration: "none" }} to="/" onClick={logout}>
        <Button color="inherit" className="buttonFontSize ">
          Logout
        </Button>
      </NavLink>
    </>
  );
  const guestLinks = () => (
    <>
      <NavLink
        activeClassName="loginButton"
        style={{ textDecoration: "none" }}
        to="/profiles"
      >
        <Button color="inherit" className="buttonFontSize">
          Developers
        </Button>
      </NavLink>

      <NavLink
        activeClassName="loginButton"
        style={{ textDecoration: "none" }}
        to="/login"
      >
        <Button color="inherit" className="buttonFontSize">
          Login
        </Button>
      </NavLink>
      <NavLink
        activeClassName="loginButton"
        style={{ textDecoration: "none" }}
        to="/register"
      >
        <Button color="inherit" className="buttonFontSize ">
          Register
        </Button>
      </NavLink>
    </>
  );

  return (
    <nav className="mb-4">
      <AppBar position="static" className={`AppBar`}>
        <Grid item sm={12} xs={12} className="container">
          <Toolbar>
            <Grid className="grow">
              <Link
                style={{
                  color: "white",
                  textDecoration: "none",
                }}
                to="/"
              >
                <Button className="buttonFontSize">
                  <i className="fas fa-code mr-1"> </i>dev Connect
                </Button>
              </Link>
            </Grid>

            <DarkModeSwitch
              className="mr-3"
              sunColor={""}
              moonColor={"rgba(255,255,256,1)"}
              onClick={toggleDarkMode}
              checked={!isDark}
              size={window.matchMedia("(max-width: 800px)").matches ? 17 : 20}
            />
            <div className="NavLinks d-flex">
              <>{isAuthenticated ? authLinks() : guestLinks()} </>
            </div>
          </Toolbar>
        </Grid>
      </AppBar>
    </nav>
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
