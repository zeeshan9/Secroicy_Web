import React, { Fragment, useEffect } from 'react'
import PropTypes from "prop-types";
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import Grid from "@material-ui/core/Grid";
import CellPhoneDataList from './CellPhoneDataList';

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

 const TrackPhoneList = ({locations, loading}) => {
   
    return (
    <MuiThemeProvider theme={theme}>
      <Grid container spacing={3}>
        <Grid item xs={8}>

          { locations.length > 0  ? (
            locations.map((location) => (
              <CellPhoneDataList
              location={location}
              />
            ))
          ) : (
            <div>
              <strong>No Cell Phone Data found</strong>
            </div>
          )}
        </Grid>

      </Grid>
    </MuiThemeProvider>
    )
}

TrackPhoneList.propTypes = {
    // getallPost: PropTypes.func.isRequired,
    // auth: PropTypes.object.isRequired,
  };
  
  const mapStateToProps = (state) => ({
    //auth: state.auth,
  });
  export default TrackPhoneList;
  //export default connect(mapStateToProps)(TrackPhoneList);
  