import {
  ALL_POSTS_LOADED,
  POST_ADDED,
  POST_ERROR,
  CLEAR_PROFILE,
  POST_IMAGE_UPLOADED,
  ALL_MESSAGES_LOADED,
  MESSAGE_ERROR,
  MESSAGE_SENT,
} from "../actions/types";

const initialState = {
  post: null,
  loading: true,
  errors: null,
  posts: [],
  messages: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ALL_POSTS_LOADED:
      return {
        ...state,
        posts: payload,
        loading: false,
        errors: null,
      };
    case ALL_MESSAGES_LOADED:
      return {
        ...state,
        messages: payload,
        loading: false,
        errors: null,
      };
      
    //   posts added nothing return in json except success in string
    case POST_ERROR:
    case MESSAGE_ERROR:
      return {
        ...state,
        loading: false,
        errors: payload,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        loading: false,
        posts: [],
        post: null,
        errors: payload,
      };
    case POST_ADDED:
    case MESSAGE_SENT:
      return {
        ...state,
        loading: false,
        post: payload,
        errors: payload,
      };
    default:
      return state;
  }
}
