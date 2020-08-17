import React from "react";
import Loader from "react-loader-spinner";
import { useEffect } from "react";
import { useState } from "react";
import PropTypes from "prop-types";

const Spinner = ({ profilePage }) => {
  const [hidden, setHidden] = useState(true);
  useEffect(() => {
    if (profilePage)
      setTimeout(() => {
        setHidden(false);
      }, 1500);
  });
  return (
    <div className="text-center mt-5 pt-5 ">
      {hidden ? (
        <Loader type="ThreeDots" color="#00bfff" height={100} width={100} />
      ) : (
        <h1 className="text-primary">There's no profile for this user</h1>
      )}
    </div>
  );
};

Spinner.propTypes = {
  profilePage: PropTypes.bool,
};

export default Spinner;
