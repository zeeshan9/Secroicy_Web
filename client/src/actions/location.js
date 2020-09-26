import axios from "axios";
import { GET_LOCATION, LOCATION_ERROR } from "../actions/types";
import { setAlert } from "./alert";

// Get pusher
export const getlocation = (email) => async (dispatch) => {
  try {
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };

    const res = await axios.get(`/poll/${email}`);

    dispatch({
      type: GET_LOCATION,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOCATION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
