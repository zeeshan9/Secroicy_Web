import axios from "axios";
import {
  ALL_POSTS_LOADED,
  POST_ADDED,
  POST_ERROR,
  ALL_MESSAGES_LOADED,
} from "../actions/types";
import { setAlert } from "./alert";

// Get All Posts
export const getallPost = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/posts/getallposts");

    dispatch({
      type: ALL_POSTS_LOADED,
      payload: res.data,
    });
  } catch (err) {
    console.log("Get all post exception in action/posts");
    // dispatch({
    //   type: POST_ERROR,
    //   payload: { msg: err.response ? err.response.statusText :'', 
    //   status: err.response ? err.response.status :''},
    // });
  }
};

// Create new post
export const createNewPost = (formData, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    console.log(formData);
    const res = await axios.post("/api/posts/addPostDetails", formData, config);

    dispatch({
      type: POST_ADDED,
      payload: res.data,
    });

    dispatch(setAlert("Post Added", "success"));

    history.push('/portal/posts');

  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

// Search for a post
export const searchPost = (description) => async (dispatch) => {
  try {
    console.log("imei number  " + description);
    const res = await axios.get(`/api/posts/search/${description}`);

    dispatch({
      type: ALL_POSTS_LOADED,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Message on a post
export const postMessage = (formData, id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    console.log("formData-->");
    console.log(formData);
    const res = await axios.put(
      `/api/posts/postMessage/${id}`,
      formData,
      config
    );

    dispatch({
      type: POST_ADDED,
      payload: res.data,
    });

    dispatch(setAlert("Post Added", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get All messages
export const getallmessages = (userId) => async (dispatch) => {
  try {
    console.log(" messaege id " + userId);
    const res = await axios.get(`/api/posts/getallmessages/${userId}`);

    dispatch({
      type: ALL_MESSAGES_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get All Posts
export const getuserPost = (userId) => async (dispatch) => {
  try {
    console.log("object id " + userId);
    const res = await axios.get(`/api/posts/getuserposts/${userId}`);

    dispatch({
      type: ALL_POSTS_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
