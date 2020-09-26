import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
// import { loadUser } from './actions/auth';
import Landing from "./components/layout/Landing";
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./components/routing/PrivateRoute";
import PortalRoutes from "./components/routing/PortalRoutes";
import BasicRoutes from "./components/routing/BasicRoutes";
import Navbar from "./components/layout/Navbar";
import "./App.css";
import store from "./store";

// import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
// import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       light: "#33c9dc",
//       main: "#00bcd4",
//       dark: "#008394",
//       contrastText: "#fff",
//     },
//     secondary: {
//       light: "#ff6333",
//       main: "#ffd300",
//       dark: "#b22a00",
//       contrastText: "#fff",
//     },
//   },
// });

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  //   useEffect(() => {
  //     store.dispatch(loadUser());
  //   }, []);

  return (
    // <MuiThemeProvider theme={theme}>
    <div className='container-app' style={{ marginTop: 50 }}>
      <Provider store={store}>
        <Router>
          <Fragment>
            <Navbar />
            <Route exact path='/' component={Landing} />
            <Switch>
              {/* MyConversations App Routes */}
              {/* <PortalRoutes exact path='/portal' component={PortalRoutes} /> */}
              <Route path='/portal' component={PortalRoutes} />
              <Route component={BasicRoutes} />
            </Switch>
          </Fragment>
        </Router>
      </Provider>
    </div>
    // </MuiThemeProvider>
  );
};

export default App;
