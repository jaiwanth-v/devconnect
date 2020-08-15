import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProfileItem = ({
  profile: { user, status, company, location, skills },
}) => {
  return (
    user && (
      <div className="profile bg-light">
        <img className="round-img" src={user.avatar} alt="" />
        <div className="text-center">
          <h2>{user.name}</h2>
          <p>
            {status} {company && <span>at {company}</span>}{" "}
          </p>
          <p> {location && <span>{location}</span>} </p>
          <Link to={`/profile/${user._id}`} className="btn btn-primary">
            View Profile
          </Link>
        </div>

        <ul>
          {skills.slice(0, 4).map((skill, idx) => (
            <li key={idx} className="text-primary">
              <i className="fas fa-check"></i> {skill}
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
