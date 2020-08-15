import React from "react";
import { Grid, Button, AppBar, Toolbar } from "@material-ui/core";
import "./Navbar.scss";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar2 = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = () => (
    <>
      <NavLink
        activeClassName="loginButton"
        style={{ textDecoration: "none" }}
        to="/profiles"
      >
        <Button color="inherit" className="buttonFontSize ">
          Discover
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
        <Button color="inherit" className="mainLogo">
          Discover
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
      <AppBar position="static" color="default" className="AppBar">
        <Grid item sm={12} xs={12} className="container">
          <Toolbar>
            <Grid className="grow">
              <Link
                style={{
                  color: "black",
                  textDecoration: "none",
                }}
                to="/"
              >
                <Button className="mainLogo">
                  <i className="fas fa-code mr-1"> </i>dev Connect
                </Button>
              </Link>
            </Grid>

            {!loading && <> {isAuthenticated ? authLinks() : guestLinks()} </>}
          </Toolbar>
        </Grid>
      </AppBar>
    </nav>
  );
};

Navbar2.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar2);
