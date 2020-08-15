import React, { Fragment } from "react";
import spinner from "./spinner.gif";
import Loader from "react-loader-spinner";
export default () => (
  <Fragment>
    <Loader type="Puff" color="#00bfff" height={100} width={100} />
  </Fragment>
);
