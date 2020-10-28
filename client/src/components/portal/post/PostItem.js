import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import Grid from "@material-ui/core/Grid";
import ChildPostItem from "./ChildPostItem";
import HomeProfile from "./HomeProfile";
import { connect } from "react-redux";

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

const PostItem = ({
  posts: { loading, posts },
  auth: { user, isAuthenticated },
}) => {
  return (
    <MuiThemeProvider theme={theme}>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          {!loading && posts.length > 0 ? (
            posts.map((post) => (
              <ChildPostItem
                post={post}
                userId={user !== null ? user.id : ""}
              />
            ))
          ) : (
            <div>
              <strong>No Posts found</strong>
            </div>
          )}
        </Grid>
        <Grid item xs={4}>
          <HomeProfile />

        </Grid>
      </Grid>
    </MuiThemeProvider>
  );
};

PostItem.propTypes = {
  // getallPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PostItem);
