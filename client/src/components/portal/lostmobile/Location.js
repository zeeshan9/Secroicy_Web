import React, { Fragment, useEffect } from "react";
import "../../../css/location/style.module.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getlocation } from "../../../actions/location";
import PropTypes from "prop-types";
import { loadUserProfile } from "../../../actions/auth";
import styles from "../../../css/portal/profile-forms/style.module.css";
import TrackPhoneList from "./TrackPhoneList";

const Location = ({
  location: { locations, errors },
  getlocation,
  loadUserProfile,
  auth: { user, loading, isAuthenticated },
}) => {
  useEffect(() => {
    loadUserProfile();
    getlocation("email@gmail.com");
  }, [loadUserProfile, getlocation]);

  var flag = false;

  const locationHandler = (email) => {
    getlocation(email);
    flag=true;
  };
  return (
    <Fragment>
      <section className={styles.section}>
        <div>
          <div className={styles.heading}>
            <i className='fab fa-black-tie'></i> Track Cell Phone
          </div>
          <div className={styles.sub_heading}>
            You can start your service from here to track your phone
          </div>
        </div>
      </section>
      {!loading && isAuthenticated && user !== null ? (
        <Fragment>
        <button
          onClick={() => locationHandler(user.email)}
          className='btn btn-primary'
          >
          Get Location
        </button>
        <TrackPhoneList locations={locations} loading={loading}/>
        {/* {flag ? <TrackPhoneList locations={locations} loading={loading}/>: false } */}
          </Fragment>
       
      ) : (
        <p>Loading...</p>
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
