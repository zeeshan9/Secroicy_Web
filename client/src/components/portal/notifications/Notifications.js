import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Form, Row, Button, Col } from "react-bootstrap";
import { connect } from "react-redux";
import styles from "../../../css/portal/posts/style.module.css";
import Alert from "../../layout/Alert";
import { getuserPost, getallmessages } from "../../../actions/posts";
import { loadUser } from "../../../actions/auth";
import ChildPostItem from "../post/ChildPostItem";

// import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import Grid from "@material-ui/core/Grid";
import NotificationItem from "./NotificationItem";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#33c9dc",
      main: "#00bcd4",
      dark: "#008394",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff6333",
      main: "#ffd300",
      dark: "#b22a00",
      contrastText: "#fff",
    },
  },
  typography: {
    useNextVariants: true,
  },
});

const Notifications = ({
  getuserPost,
  loadUser,
  auth: { user },
  posts: { loading, posts, messages },
  getallmessages,
}) => {
  useEffect(() => {
    loadUser();
    getuserPost({ userId: user !== null ? user.uid : "" });
    getallmessages({ userId: user !== null ? user.uid : "" });
  }, [loadUser, getuserPost, getallmessages]);

  return (
    <Fragment>
      <section className={styles.section}>
        <Alert />
        <div className={styles.heading} style={{ color: "blue" }}>
          <i className='fas fa-user' style={{ color: "blue" }}></i> Notice Panel
        </div>
        <div className={styles.sub_heading}>Notification about lost phone</div>
        <MuiThemeProvider theme={theme}>
          <Grid container spacing={3}>
            <Grid item xs={8}>
              {!loading && messages.length > 0 && user !== null ? (
                messages.map((message) =>
                  user.uid === message.userId ? (
                    <NotificationItem
                      // post={post}
                      messages={message}
                      // userId={user !== null ? user.uid : ""}
                    />
                  ) : (
                    <Fragment></Fragment>
                  )
                )
              ) : (
                <div>
                  <strong>No Posts found</strong>
                </div>
              )}
            </Grid>
            <Grid item xs={4}>
              {/* {!loading && posts.length > 0 ? (
                posts.map((post) => (
                  <ChildPostItem
                    post={post}
                    userId={user !== null ? user.uid : ""}
                  />
                ))
              ) : (
                <div>
                  <strong>No Posts found</strong>
                </div>
              )} */}
            </Grid>
          </Grid>
        </MuiThemeProvider>
      </section>
    </Fragment>
  );
};

Notifications.propTypes = {
  getuserPost: PropTypes.func.isRequired,
  getallmessages: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  posts: state.posts,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getuserPost,
  loadUser,
  getallmessages,
})(Notifications);
