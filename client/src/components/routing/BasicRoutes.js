import React, { Fragment } from "react";
import PrivateRoute from "./PrivateRoute";
import { Route } from "react-router-dom";
import Posts from "../../components/portal/post/Posts";
import Register from "../../components/auth/Register";
import Login from "../../components/auth/Login";
// import Dashboard from '../../components/dashboard/Dashboard';

export const BasicRoutes = () => {
  return (
    <Fragment>
      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Register} />
      {/* 
      <PrivateRoute exact path='/profile/:id' component={Profile} />
      <PrivateRoute exact path='/dashboard' component={Dashboard} /> */}
    </Fragment>
  );
};

export default BasicRoutes;
