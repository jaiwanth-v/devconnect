import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addExperience } from "../../actions/profile";
import { withRouter, Link } from "react-router-dom";
import { useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Checkbox, Fade } from "@material-ui/core";

const AddExperience = ({ addExperience, history }) => {
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const [toDateDisabled, toggleToDate] = useState(false);

  const { company, title, location, from, to, current, description } = formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    addExperience(formData, history);
  };

  return (
    <Fade in={true}>
      <>
        <h1 className="large text-primary">Add An Experience</h1>
        <p className="lead">
          <i className="fas fa-code-branch"></i> Add any developer/programming
          positions that you have had in the past
        </p>
        <ValidatorForm onSubmit={handleSubmit}>
          <div className="form-group">
            <TextValidator
              type="text"
              variant="outlined"
              fullWidth
              label="Job Title"
              validators={["required"]}
              errorMessages={["This field is required"]}
              placeholder="Job Title *"
              onChange={handleChange}
              value={title}
              name="title"
              required
            />
          </div>
          <div className="form-group">
            <TextValidator
              type="text"
              variant="outlined"
              label="Company *"
              fullWidth
              placeholder="Company"
              onChange={handleChange}
              value={company}
              name="company"
              validators={["required"]}
              errorMessages={["This field is required"]}
            />
          </div>
          <div className="form-group">
            <TextValidator
              label="Location"
              variant="outlined"
              type="text"
              fullWidth
              placeholder="Location"
              onChange={handleChange}
              value={location}
              name="location"
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
              Current Job
              <Checkbox
                type="checkbox"
                name="current"
                color="primary"
                className="mb-1"
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
              placeholder="Job Description"
              value={description}
              onChange={handleChange}
            ></TextValidator>
          </div>
          <input type="submit" className="btn btn-primary my-1" />
          <Link className="btn btn-light my-1" to="/dashboard">
            Go Back
          </Link>
        </ValidatorForm>
      </>
    </Fade>
  );
};
AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default withRouter(connect(null, { addExperience })(AddExperience));
