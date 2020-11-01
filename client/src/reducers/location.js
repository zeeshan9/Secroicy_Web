import { GET_LOCATION, LOCATION_ERROR,INITIAT_CELL_TRACKING } from "../actions/types";

const initialState = {
  location: null,
  loading: true,
  errors: null,
  locations: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_LOCATION:
      return {
        ...state,
        locations: payload,
        loading: false,
        errors: null,
      };
      case INITIAT_CELL_TRACKING:
        return {
          ...state,
          location: payload,
          loading: false,
          errors: null,
        };
    case LOCATION_ERROR:
      return {
        ...state,
        loading: false,
        errors: payload,
      };
    default:
      return state;
  }
}
