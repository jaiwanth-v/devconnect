import React from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Fade } from "@material-ui/core";

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Fade in={true}>
      <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1
              style={{ color: "", fontFamily: "Montserrat" }}
              className="x-large"
            >
              <i className="fas fa-code mr-1"> </i> Dev Connect
            </h1>
            <h4 style={{ fontFamily: "PT Sans" }} className="mb-4">
              ● Connect ● Learn ● Grow
            </h4>
            <div className="buttons mb-4">
              <Link to="/register" className="mr-2">
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "rgb(0,100,255)",
                    color: "#fff",
                    borderRadius: "8%",
                  }}
                >
                  Sign up
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  style={{
                    backgroundColor: "rgba(255,100,0,0.9)",
                    color: "white",
                    borderRadius: "8%",
                  }}
                  variant="contained"
                >
                  Login
                </Button>
              </Link>
            </div>
            <h5 style={{ fontFamily: "PT Sans" }}>
              Sign in to share posts, create profile and get help from other
              developers
            </h5>
          </div>
        </div>
      </section>
    </Fade>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
