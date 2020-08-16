import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { createProfile } from "../../actions/profile";
import { Button, MenuItem } from "@material-ui/core";
import {
  SelectValidator,
  TextValidator,
  ValidatorForm,
} from "react-material-ui-form-validator";

const CreateProfile = ({ history, createProfile }) => {
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
  });
  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  const [displaySocial, toggleSocialInputs] = useState(false);
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history);
  };
  return (
    <Fragment>
      <h1 className="large text-primary">Create Your Profile</h1>
      <p className="lead">
        Let's get some information to make your profile stand out
      </p>
      <ValidatorForm onSubmit={handleSubmit}>
        <div className="form-group">
          <SelectValidator
            validators={["required"]}
            errorMessages={["This field is required"]}
            fullWidth
            label="* Status"
            placeholder="* Status"
            name="status"
            labelId="selectlabel"
            value={status}
            variant="outlined"
            onChange={handleChange}
            defaultValue={0}
          >
            <MenuItem value="Developer">Developer</MenuItem>
            <MenuItem value="Junior Developer">Junior Developer</MenuItem>
            <MenuItem value="Senior Developer">Senior Developer</MenuItem>
            <MenuItem value="Manager">Manager</MenuItem>
            <MenuItem value="Instructor">Instructor or Teacher</MenuItem>
            <MenuItem value="Intern">Intern</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </SelectValidator>
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className="form-group">
          <TextValidator
            type="text"
            variant="outlined"
            label="Company"
            fullWidth
            placeholder="Company"
            value={company}
            name="company"
            onChange={handleChange}
          />
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </div>
        <div className="form-group">
          <TextValidator
            fullWidth
            label="Website"
            variant="outlined"
            type="text"
            placeholder="Website"
            value={website}
            onChange={handleChange}
            name="website"
          />
          <small className="form-text">
            Could be your own or a company website
          </small>
        </div>
        <div className="form-group">
          <TextValidator
            fullWidth
            label="Location"
            variant="outlined"
            type="text"
            placeholder="Location"
            name="location"
            onChange={handleChange}
            value={location}
          />
          <small className="form-text">
            City & state suggested (eg. Hyderabad, TS)
          </small>
        </div>
        <div className="form-group">
          <TextValidator
            fullWidth
            label="* Skills"
            validators={["required"]}
            errorMessages={["This field is required"]}
            variant="outlined"
            type="text"
            placeholder="Skills"
            name="skills"
            value={skills}
            onChange={handleChange}
          />
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className="form-group">
          <TextValidator
            fullWidth
            label="Github Username"
            variant="outlined"
            type="text"
            value={githubusername}
            onChange={handleChange}
            placeholder="Github Username"
            name="githubusername"
          />
          <small className="form-text">
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className="form-group">
          <TextValidator
            multiline
            rows={3}
            label="Bio"
            fullWidth
            variant="outlined"
            placeholder="A short bio of yourself"
            name="bio"
            onChange={handleChange}
            value={bio}
          ></TextValidator>

          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <Button
            onClick={() => toggleSocialInputs(!displaySocial)}
            variant="contained"
          >
            Add Social Network Links
          </Button>
          <span> (Optional) </span>
        </div>

        {displaySocial && (
          <>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <TextValidator
                fullWidth
                label="Twitter"
                variant="outlined"
                type="text"
                placeholder="Twitter URL"
                value={twitter}
                onChange={handleChange}
                name="twitter"
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <TextValidator
                fullWidth
                variant="outlined"
                type="text"
                label="Facebook"
                placeholder="Facebook URL"
                value={facebook}
                onChange={handleChange}
                name="facebook"
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <TextValidator
                fullWidth
                variant="outlined"
                type="text"
                label="YouTube"
                placeholder="YouTube URL"
                value={youtube}
                onChange={handleChange}
                name="youtube"
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <TextValidator
                fullWidth
                label="LinkedIn"
                variant="outlined"
                type="text"
                placeholder="Linkedin URL"
                value={linkedin}
                onChange={handleChange}
                name="linkedin"
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <TextValidator
                fullWidth
                variant="outlined"
                type="text"
                label="Instagram"
                placeholder="Instagram URL"
                value={instagram}
                onChange={handleChange}
                name="instagram"
              />
            </div>
          </>
        )}

        <Button
          type="submit"
          variant="outlined"
          color="primary"
          className="btn my-1"
        >
          Submit
        </Button>
        <Link className=" ml-2 my-1" to="/dashboard">
          <Button variant="outlined" color="primary" className="btn my-1">
            Go Back
          </Button>
        </Link>
      </ValidatorForm>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
};

export default withRouter(connect(null, { createProfile })(CreateProfile));
