import React, { Fragment } from "react";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import PropTypes from "prop-types";
import { useEffect } from "react";
import Spinner from "../layout/Spinner";
import { Link, withRouter } from "react-router-dom";
import DashboardActions from "./DashboardActions";
import { Fade, Button } from "@material-ui/core";
import ProfileTop from "../profile/ProfileTop";
import ProfileAbout from "../profile/ProfileAbout";
import ProfileExperience from "../profile/ProfileExperience";
import ProfileEducation from "../profile/ProfileEducation";
import ProfileGithub from "../profile/ProfileGithub";

const Dashboard = ({
  history,
  deleteAccount,
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return loading && profile == null && user === null ? (
    <Spinner />
  ) : (
    <Fade in={!loading}>
      <div className=" m-4">
        <h1 className="large text-center text-primary">Dashboard</h1>
        <p className="lead text-center">
          <i className="fas fa-user"></i> Welcome{" "}
          {user && user.name.charAt(0).toUpperCase() + user.name.slice(1)}
        </p>

        {profile != null ? (
          <Fragment>
            <div className="text-center">
              <DashboardActions />
              <h2 className="my-3 text-primary">Your Profile: </h2>
            </div>
            <div>
              <Fade in={!loading}>
                <div className="profile-grid my-1">
                  <ProfileTop profile={profile} />
                  <ProfileAbout profile={profile} />
                  <div className="profile-exp bg-white p-2">
                    <h2 className="text-primary">Experience</h2>
                    {profile && profile.experience.length > 0 ? (
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
          </Fragment>
        ) : (
          <div className="text-center">
            <p>
              You haven't setup a profile yet, please create one to get started.
            </p>
            <Link to="/create-profile" className=" my-1">
              <Button color="primary" variant="contained">
                Create profile
              </Button>
            </Link>
          </div>
        )}

        <div className={`mt-4 ${!profile && "text-center"}`}>
          <Button
            style={{ backgroundColor: "rgb(230,0,1)", color: "white" }}
            variant="contained"
            onClick={() => deleteAccount(history)}
          >
            Delete My Account
          </Button>
        </div>
      </div>
    </Fade>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

export default withRouter(
  connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard)
);
