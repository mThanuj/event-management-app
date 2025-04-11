import {
  FETCH_EVENTS_REQUEST,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_FAILURE,
  CREATE_EVENT_SUCCESS,
  UPDATE_EVENTS_REQUEST,
  UPDATE_EVENTS_SUCCESS,
  UPDATE_EVENTS_FAILURE,
} from "../actions/event.actions";

const initialState = {
  events: [],
  loading: false,
  error: null,
  success: false,
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EVENTS_REQUEST:
      return { ...state, loading: true, error: null, success: false };

    case FETCH_EVENTS_SUCCESS:
      return {
        ...state,
        events: action.payload,
        loading: false,
        success: true,
      };

    case FETCH_EVENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };

    case CREATE_EVENT_SUCCESS:
      return {
        ...state,
        events: [...state.events, action.payload],
        success: true,
      };

    case UPDATE_EVENTS_REQUEST:
      return { ...state, loading: true, error: null, success: false };

    case UPDATE_EVENTS_SUCCESS: {
      const updatedEvents = state.events.map((event) =>
        event.id === action.payload.id ? action.payload : event,
      );
      return { ...state, events: updatedEvents, loading: false, success: true };
    }

    case UPDATE_EVENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };

    default:
      return state;
  }
};

export default eventReducer;
