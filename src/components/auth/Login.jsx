import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import { Button, Fade } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    login({ email, password });
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fade in={true}>
      <div
        style={{
          marginTop: "15vh",
          width: "400px",
          height: "400px",
          borderRadius: "10px",
        }}
        className="container login text-center shadow p-4 mb-md-5 mb-1 bg-white "
      >
        <h2 className="large text-primary mb-4 ">Sign In</h2>

        <ValidatorForm onSubmit={handleSubmit}>
          <div className="form-group">
            <TextValidator
              name="email"
              validators={["required", "isEmail"]}
              onChange={onChange}
              value={email}
              errorMessages={["This field is required", "Email is invalid"]}
              label="Email Address"
              variant="outlined"
            />
          </div>
          <div className="form-group">
            <TextValidator
              label="Password"
              onChange={onChange}
              name="password"
              variant="outlined"
              type="password"
              validators={["required"]}
              errorMessages={["This field is required"]}
              value={password}
            />
          </div>
          <Button
            type="submit"
            variant="contained"
            style={{ backgroundColor: "rgb(26,115,232)" }}
            color="primary"
            className="m-3 w-50"
          >
            Login
          </Button>
        </ValidatorForm>
        <p className="my-1 ">
          Don't have an account?{" "}
          <Link className="text-primary" to="/register">
            Sign Up
          </Link>
        </p>
      </div>
    </Fade>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
