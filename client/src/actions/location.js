import axios from "axios";
import { GET_LOCATION, LOCATION_ERROR, INITIAT_CELL_TRACKING } from "../actions/types";
import { setAlert } from "./alert";

// Get location db data
export const getTrackMobileData = (email) => async (dispatch) => {
  try {

    const res = await axios.get(`/api/location/${email}`);

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

// Get pusher
export const getlocation = (email) => async (dispatch) => {
  try {

    const res = await axios.get(`/poll/${email}`);

    dispatch({
      type: INITIAT_CELL_TRACKING,
      payload: res.data,
    });
   dispatch(setAlert("Request has been Initiated", "success"));

  } catch (err) {
    dispatch({
      type: LOCATION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

