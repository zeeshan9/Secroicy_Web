import React, { Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import MuiLink from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import ProfilePicture from "./ProfilePicture";
import IMAGE from "../../../img/bg.jpg";
import Avatar from "@material-ui/core/Avatar";
import { Badge } from "react-bootstrap";

const styles = {
  paper: {
    padding: 20,
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative ",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%",
      },
    },
    "& .profile-image": {
      width: 200,
      height: 70,
      marginLeft: 120,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%",
    },
    "& .profile-details": {
      textAlign: "center",
      margin: 0,
      "& span, svg": {
        verticalAlign: "top",
      },
      "& a": {
        // color: theme.palette.primary.main,
      },
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0",
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px",
    },
  },
};

const Profile = ({ classes, auth: { loading, user, isAuthenticated } }) => {
  return (
    <Fragment className={classes.profile}>
      {!loading && isAuthenticated && user !== null ? (
        <Fragment className={"profile-image"}>
          <Paper className={classes.paper}>
            <div className={classes.profile}>
              <div className={"profile-image"}>
                <Avatar
                  alt='Profile img'
                  src={user.imageUrl}
                  style={{ marginBottom: 0 }}
                />

                {/* <Badge variant='secondary' onClick={() => alert("sdfkgfdsk")}>
                  edit
                </Badge> */}
              </div>

              <hr />
              <div className='profile-details'>
                <MuiLink color='secondary' variant='h5'>
                  {user.email}
                </MuiLink>
                <hr />
                <MuiLink color='primary' variant='h6'>
                  {user.displayName}
                </MuiLink>
              </div>
            </div>
          </Paper>
          <ProfilePicture />
        </Fragment>
      ) : (
        <Fragment>
          <Paper className={classes.paper}>
            <div className={classes.profile}>
              <div className={"profile-image"}>
                <Avatar alt='Remy Sharp' src={IMAGE} />
                {/* <img src={IMAGE} alt='profile' /> */}
              </div>
              <hr />
              <div className='profile-details'>
                <MuiLink
                  component={Link}
                  to={""}
                  color='primary'
                  variant='h5'
                ></MuiLink>
                <hr />
              </div>
            </div>
          </Paper>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(withStyles(styles)(Profile));
