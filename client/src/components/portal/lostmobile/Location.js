import React, { Fragment, useEffect } from "react";
import "../../../css/location/style.module.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getlocation } from "../../../actions/location";
import PropTypes from "prop-types";
import { loadUserProfile } from "../../../actions/auth";

const Location = ({
  location: { location },
  getlocation,
  loadUserProfile,
  auth: { user, loading, isAuthenticated },
}) => {
  useEffect(() => {
    loadUserProfile();
  }, [loadUserProfile]);

  const locationHandler = (email) => {
    getlocation(email);
  };
  return (
    <Fragment>
      <h2>locaiton page working</h2>
      {!loading && isAuthenticated && user !== null ? (
        <button
          onClick={() => locationHandler(user.email)}
          className='btn btn-primary'
        >
          Get Location
        </button>
      ) : (
        <p>else tab</p>
      )}
    </Fragment>
  );
};

Location.propTypes = {
  getlocation: PropTypes.func.isRequired,
  // location: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  location: state.location,
  auth: state.auth,
  loadUserProfile: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, { getlocation, loadUserProfile })(
  Location
);
