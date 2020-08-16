import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addEducation } from "../../actions/profile";
import { withRouter, Link } from "react-router-dom";
import { useState } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Checkbox, Fade } from "@material-ui/core";

const AddEducation = ({ addEducation, history }) => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const [toDateDisabled, toggleToDate] = useState(false);

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  } = formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    addEducation(formData, history);
  };

  return (
    <Fade in={true}>
      <>
        <h1 className="large text-primary">Add Your Education</h1>
        <p className="lead">
          <i className="fas fa-code-branch"></i> Add any school or bootcamp that
          you have attended in the past
        </p>
        <ValidatorForm onSubmit={handleSubmit}>
          <div className="form-group">
            <TextValidator
              type="text"
              variant="outlined"
              fullWidth
              label="School or College"
              validators={["required"]}
              errorMessages={["This field is required"]}
              placeholder="* School or College"
              onChange={handleChange}
              value={school}
              name="school"
              required
            />
          </div>
          <div className="form-group">
            <TextValidator
              type="text"
              variant="outlined"
              label="Degree *"
              fullWidth
              placeholder="Degree"
              onChange={handleChange}
              value={degree}
              name="degree"
              validators={["required"]}
              errorMessages={["This field is required"]}
            />
          </div>
          <div className="form-group">
            <TextValidator
              label="Field of Study"
              variant="outlined"
              type="text"
              fullWidth
              placeholder="Field of Study"
              onChange={handleChange}
              value={fieldofstudy}
              name="fieldofstudy"
            />
          </div>
          <div className="form-group">
            <TextValidator
              label="From"
              variant="outlined"
              fullWidth
              type="date"
              validators={["required"]}
              errorMessages={["This field is required"]}
              onChange={handleChange}
              value={from}
              name="from"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className="form-group">
            <p>
              Currently Studying
              <Checkbox
                type="checkbox"
                name="current"
                className="mb-1"
                color="primary"
                value={current}
                checked={current}
                onChange={(e) => {
                  setFormData({ ...formData, current: !current });
                  toggleToDate(!toDateDisabled);
                }}
              />
            </p>
          </div>
          <div className="form-group">
            <TextValidator
              label="To"
              type="date"
              id="date"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              variant="outlined"
              onChange={handleChange}
              value={to}
              name="to"
              disabled={toDateDisabled ? true : false}
            />
          </div>
          <div className="form-group">
            <TextValidator
              multiline
              fullWidth
              variant="outlined"
              label="Description"
              name="description"
              rows={3}
              placeholder="Program Description"
              value={description}
              onChange={handleChange}
            ></TextValidator>
          </div>
          <input type="submit" className="btn btn-primary my-1" />
          <Link className="btn btn-light my-1" to="/dashboard">
            Go Back
          </Link>
        </ValidatorForm>
        <small className="my-2">(Note: You can't edit this later)</small>
      </>
    </Fade>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default withRouter(connect(null, { addEducation })(AddEducation));
