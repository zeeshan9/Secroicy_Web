import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  USER_LOADED,
  LOGOUT,
  CLEAR_PROFILE,
  PROFILE_PICTURE_UPLOADED,
  POST_IMAGE_UPLOADED,
  AUTH_ERROR,
} from "../actions/types";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";
import { getallPost } from "./posts";

// Load user
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth/me");

    console.log(" user data " + res.data);
    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

// Register user
export const register = (
  name,
  email,
  password,
  mobilelost,
  contactinfo,
  address,
  description
) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({
    name,
    email,
    password,
    mobilelost,
    contactinfo,
    address,
    description,
  });
  console.log(body + " body");
  try {
    const res = await axios.post("/api/users", body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: {
        token: res.data.token,
      },
    });

    // dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors);

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: REGISTER_FAILED,
    });
  }
};

// Login user
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });
  console.log(email + " === " + password);
  try {
    const res = await axios.post("/api/auth", body, config);
    console.log("swait" + res.data.token);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        token: res.data.token,
      },
    });

    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: LOGIN_FAILED,
    });
  }
};

// Logout / Clear profile
export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};

// Upload profile picture
export const uploadProfilePicture = (file, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    // const body = JSON.stringify({ file });
    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.put(
      "/api/users/profile-picture/upload",
      formData,
      config
    );

    dispatch({
      type: PROFILE_PICTURE_UPLOADED,
      payload: res.data.avatar,
    });

    dispatch(setAlert("Profile picture uploaded", "success"));

    dispatch(loadUserProfile());
    
    //history.push('/portal/posts');
  } catch (err) {
    if (err.response ? err.response.status : 200 === 500) {
      dispatch(setAlert("There was a problem with the server", "danger"));
    } else {
      dispatch(setAlert(err.response ? err.response.data.msg: 'Pofile image exception', "danger"));
    }
  }
};

// Upload Post picture
export const uploadPostImage = (file, id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    // const body = JSON.stringify({ file });
    // const formData = new FormData();
    // formData.append("file", file);
    // const body = JSON.stringify({ file });
    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.put(
      `/api/posts/post-image/upload/${id}`,
      formData,
      config
    );

    dispatch(getallPost());

    dispatch(setAlert(`Profile picture uploaded`, "success"));
  } catch (err) {
    if (err.response.status === 500) {
      dispatch(setAlert("There was a problem with the server", "danger"));
    } else {
      dispatch(setAlert(err.response.data.msg + " danger", "danger"));
    }
  }
};

// Load user
export const loadUserProfile = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth/loaduserprofile");
    console.log("user data");
    console.log(res.data);
    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};
