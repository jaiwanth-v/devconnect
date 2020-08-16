import React from "react";
import PropTypes from "prop-types";

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name },
  },
  dashboard = true,
}) => {
  return (
    <div className="profile-about bg-light p-2">
      {bio && (
        <>
          {dashboard ? <h2 className="text-primary">Bio</h2> : null}
          {!dashboard ? (
            <h2 className="text-primary">
              {" "}
              {name.trim().split(" ")[0]}'s Bio{" "}
            </h2>
          ) : null}
          <p>{bio}</p>
          <div className="line"></div>
        </>
      )}

      <h2 className="text-primary">Skill Set</h2>
      <div className="skills">
        {skills.map((skill, idx) => (
          <div className="p-1" key={idx}>
            <i className="fa fa-check"></i> {skill}
          </div>
        ))}
      </div>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
