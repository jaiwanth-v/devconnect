import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import { connect } from "react-redux";
import { getProfiles } from "../../actions/profile";
import { useEffect } from "react";
import ProfileItem from "./ProfileItem";
import { Fade } from "@material-ui/core";
const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);
  return (
    <Fragment>
      <div>
        <h1 className="large  text-center text-primary">Developers</h1>
        <p className="lead text-center ">
          <i className="fab fa-connectdevelop"></i> Browse and connect with
          developers
        </p>
        {loading || profiles.length === 0 ? (
          <Spinner />
        ) : (
          <Fade in={profiles.length > 0}>
            <div className="profiles">
              {profiles.length > 0
                ? [...profiles]
                    .reverse()
                    .map((profile) => (
                      <ProfileItem key={profile._id} profile={profile} />
                    ))
                : null}
            </div>
          </Fade>
        )}
      </div>
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
