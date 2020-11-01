import React, { Fragment, useEffect } from "react";
import "../../../css/location/style.module.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getTrackMobileData, getlocation } from "../../../actions/location";
import PropTypes from "prop-types";
import { loadUserProfile } from "../../../actions/auth";
import styles from "../../../css/portal/profile-forms/style.module.css";
import TrackPhoneList from "./TrackPhoneList";

const Location = ({
  location: { locations, location, errors },
  getTrackMobileData,
  getlocation,
  loadUserProfile,
  auth: { user, loading, isAuthenticated },
}) => {
  useEffect(() => {
    loadUserProfile();
  }, [loadUserProfile]);

  useEffect(() => {
    if(user !== null) {
      getTrackMobileData(user.email);
    }
  },[user])
  const locationHandler = (email) => {
    getlocation(email);
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
      
      {!loading && isAuthenticated && user !== null ? (
        <Fragment>
        <button
          onClick={() => locationHandler(user.email)}
          className='btn btn-primary'
          >
          Track My Cell Phone
        </button>
        <TrackPhoneList locations={locations} loading={loading}/>
          </Fragment>
       
      ) : (
        <p>Loading...</p>
      )}
      </section>
    </Fragment>
  );
};

Location.propTypes = {
  getTrackMobileData: PropTypes.func.isRequired,
  getlocation: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  location: state.location,
  auth: state.auth,
  loadUserProfile: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, { getTrackMobileData, loadUserProfile, getlocation  })(
  Location
);
