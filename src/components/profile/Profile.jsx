import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfilebyId } from "../../actions/profile";
import { useEffect } from "react";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";
import { Fade } from "@material-ui/core";

const Profile = ({
  getProfilebyId,
  match: {
    params: { id },
  },
  profile: { loading, profile },
  auth,
}) => {
  useEffect(() => {
    getProfilebyId(id);
  }, [getProfilebyId, id]);
  return (
    <>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <div>
          <div className="text-center">
            {auth.isAuthenticated &&
              !auth.loading &&
              auth.user._id === profile.user._id && (
                <Link to="/edit-profile" className="btn btn-dark">
                  Edit Profile
                </Link>
              )}
            <Link to="/profiles" className="btn btn-light">
              Back To Profiles
            </Link>
          </div>
          <Fade in={!loading}>
            <div className="profile-grid my-1">
              <ProfileTop profile={profile} />
              <ProfileAbout profile={profile} dashboard={false} />
              <div className="profile-exp bg-white p-2">
                <h2 className="text-primary">Experience</h2>
                {profile.experience.length > 0 ? (
                  <>
                    {profile.experience.map((exp) => (
                      <ProfileExperience key={exp._id} experience={exp} />
                    ))}
                  </>
                ) : (
                  <h4>No experience credentials</h4>
                )}
              </div>
              <div className="profile-edu bg-white p-2">
                <h2 className="text-primary">Education</h2>
                {profile.education.length > 0 ? (
                  <>
                    {profile.education.map((edu) => (
                      <ProfileEducation key={edu._id} education={edu} />
                    ))}
                  </>
                ) : (
                  <h4>No education credentials</h4>
                )}
              </div>
              {profile.githubusername && (
                <ProfileGithub githubusername={profile.githubusername} />
              )}
            </div>
          </Fade>
        </div>
      )}
    </>
  );
};

Profile.propTypes = {
  getProfilebyId: PropTypes.func,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfilebyId })(Profile);
