import React, { Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import Typography from "@material-ui/core/";
import MuiLink from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import ProfilePicture from "./ProfilePicture";
import IMAGE from "../../../img/bg.jpg";
import styles from "../../../css/homeprofile/style.module.css";

const HomeProfile = ({ auth: { loading, user, isAuthenticated } }) => {
  return (
    <Fragment>
      {!loading && isAuthenticated && user !== null ? (
        <Fragment>
          <div className={styles.container}>
            <div className={styles.avatar_flip}>
              <img src={user.imageUrl} height='150' width='150' />
              <img src={user.imageUrl} height='150' width='150' />
            </div>
            <h2>{user.displayName}</h2>
            <h4> {user.email}</h4>
            <p>{user.description}</p>
            <p>{user.address}</p>
          </div>
          <div className={styles.container}>
            <ProfilePicture />
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>Loading profile...</p>
        </Fragment>
      )}
    </Fragment>
  );
};

HomeProfile.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(HomeProfile);
