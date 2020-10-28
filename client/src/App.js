import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import Landing from "./components/layout/Landing";
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./components/routing/PrivateRoute";
import PortalRoutes from "./components/routing/PortalRoutes";
import BasicRoutes from "./components/routing/BasicRoutes";
import Navbar from "./components/layout/Navbar";
import "./App.css";
import store from "./store";


if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {

  return (
    <div className='container-app' style={{ marginTop: 50 }}>
      <Provider store={store}>
        <Router>
          <Fragment>
            <Navbar />
            <Route exact path='/' component={Landing} />
            <Switch>

              <Route path='/portal' component={PortalRoutes} />
              <Route component={BasicRoutes} />
            </Switch>
          </Fragment>
        </Router>
      </Provider>
    </div>
  );
};

export default App;
