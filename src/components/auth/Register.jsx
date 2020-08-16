import React from "react";
import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";
import { register } from "../../actions/auth";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Button, Fade } from "@material-ui/core";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
    if (value !== password) return false;
    return true;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    register({ name, email, password });
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fade in={true}>
      <div
        style={{
          marginTop: "10vh",
          width: "400px",
          height: "600px",
          borderRadius: "10px",
        }}
        className="container register text-center shadow p-4 mb-5 bg-white "
      >
        <h1 className="large text-primary mb-4">Sign Up</h1>

        <ValidatorForm onSubmit={handleSubmit}>
          <div className="form-group">
            <TextValidator
              label="Name"
              style={{ width: "16rem" }}
              onChange={onChange}
              name="name"
              variant="outlined"
              type="text"
              validators={["required"]}
              errorMessages={["This field is required"]}
              value={name}
            />
          </div>
          <div className="form-group">
            <TextValidator
              name="email"
              style={{ width: "16rem" }}
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
              style={{ width: "16rem" }}
              onChange={onChange}
              name="password"
              variant="outlined"
              type="password"
              validators={["required"]}
              errorMessages={["This field is required"]}
              value={password}
              minLength="6"
            />
          </div>
          <div className="form-group">
            <TextValidator
              style={{ width: "16rem" }}
              label="Confirm Password"
              onChange={onChange}
              name="password2"
              type="password"
              validators={["isPasswordMatch", "required"]}
              errorMessages={[
                "Passwords don't match",
                "this field is required",
              ]}
              value={password2}
              variant="outlined"
            />
          </div>
          <Button
            type="submit"
            variant="contained"
            style={{ backgroundColor: "rgb(26,115,232)" }}
            color="primary"
            className="m-3 w-50"
          >
            Register
          </Button>
        </ValidatorForm>
        <p className="my-1">
          Already have an account?{" "}
          <Link className="text-primary" to="/login">
            Sign In
          </Link>
        </p>
        <small>
          This website uses Gravatar so if you want <br /> a profile image, use
          a Gravatar email
        </small>
      </div>
    </Fade>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
