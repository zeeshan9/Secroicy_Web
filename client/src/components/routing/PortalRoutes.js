import React, { Fragment } from "react";
import PrivateRoute from "./PrivateRoute";
import Posts from "../../components/portal/post/Posts";
import Post_forms from "../portal/PostDetail/Post_forms";
import Notifications from "../portal/notifications/Notifications";
import Profile from "../portal/profile/Profile";

export const CommunityRoutes = () => {
  return (
    <Fragment>
      <PrivateRoute exact path='/portal/posts' component={Posts} />
      <PrivateRoute exact path='/portal/posts/addpost' component={Post_forms} />
      <PrivateRoute
        exact
        path='/portal/notifications'
        component={Notifications}
      />
      <PrivateRoute exact path='/portal/profile' component={Profile} />
    </Fragment>
  );
};

export default CommunityRoutes;
