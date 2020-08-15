import React from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1
            style={{ color: "", fontFamily: "Montserrat" }}
            className="x-large"
          >
            dev Connect
          </h1>
          <h4>● Connect ● Learn ● Grow</h4>
          <p className="lead">
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <div className="buttons">
            <Link to="/register" className="mr-2">
              <Button variant="contained" color="primary">
                Sign up
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="contained">Login</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
