import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addExperience } from "../../actions/profile";
import { withRouter, Link } from "react-router-dom";
import { useState } from "react";

const AddExperience = (props) => {
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

  return (
    <>
      <h1 className="large text-primary">Add An Experience</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form">
        <div className="form-group">
          <input
            type="text"
            placeholder="* Job Title"
            onChange={handleChange}
            value={title}
            name="title"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Company"
            onChange={handleChange}
            value={company}
            name="company"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            onChange={handleChange}
            value={location}
            name="location"
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" onChange={handleChange} value={from} name="from" />
        </div>
        <div className="form-group">
          <p>
            <input type="checkbox" name="current" value="" /> Current Job
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" onChange={handleChange} value={to} name="to" />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value={description}
            onChange={handleChange}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default withRouter(connect(null, { addExperience })(AddExperience));
