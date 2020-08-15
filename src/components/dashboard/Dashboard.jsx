import React, { Fragment } from "react";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import PropTypes from "prop-types";
import { useEffect } from "react";
import Spinner from "../layout/Spinner";
import { Link, withRouter } from "react-router-dom";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";
import { Fade, Button } from "@material-ui/core";

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
      <div className="text-center m-4">
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Welcome {user && user.name}
        </p>

        {profile != null ? (
          <Fragment>
            <DashboardActions />
          </Fragment>
        ) : (
          <Fragment>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className=" my-1">
              <Button color="primary" variant="contained">
                Create profile
              </Button>
            </Link>
          </Fragment>
        )}
        {profile && <Experience experience={"" || profile.experience} />}
        {profile && <Education education={"" || profile.education} />}

        <div className="mt-4">
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
