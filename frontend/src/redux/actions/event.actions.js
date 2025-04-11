import axios from "axios";

export const FETCH_EVENTS_REQUEST = "FETCH_EVENTS_REQUEST";
export const FETCH_EVENTS_SUCCESS = "FETCH_EVENTS_SUCCESS";
export const FETCH_EVENTS_FAILURE = "FETCH_EVENTS_FAILURE";

export const CREATE_EVENT_REQUEST = "CREATE_EVENT_REQUEST";
export const CREATE_EVENT_SUCCESS = "CREATE_EVENT_SUCCESS";
export const CREATE_EVENT_FAILURE = "CREATE_EVENT_FAILURE";

export const UPDATE_EVENTS_REQUEST = "UPDATE_EVENTS_REQUEST";
export const UPDATE_EVENTS_FAILURE = "UPDATE_EVENTS_FAILURE";
export const UPDATE_EVENTS_SUCCESS = "UPDATE_EVENTS_SUCCESS";

export const DELETE_EVENT_REQUEST = "DELETE_EVENT_REQUEST";
export const DELETE_EVENT_FAILURE = "DELETE_EVENT_FAILURE";
export const DELETE_EVENT_SUCCESS = "DELETE_EVENT_SUCCESS";

export const createEvent = (eventData) => async (dispatch) => {
  dispatch({ type: CREATE_EVENT_REQUEST });
  try {
    const res = await axios.post(
      "http://localhost:3000/api/v1/events",
      eventData,
    );
    dispatch({
      type: CREATE_EVENT_SUCCESS,
      payload: res.data.event,
    });
  } catch (error) {
    dispatch({
      type: CREATE_EVENT_FAILURE,
      payload: error.message || "Something went wrong",
    });
  }
};

export const fetchEvents = (category) => async (dispatch) => {
  dispatch({ type: FETCH_EVENTS_REQUEST });
  try {
    const res = await axios.get("http://localhost:3000/api/v1/events", {
      params: {
        category,
      },
    });
    dispatch({
      type: FETCH_EVENTS_SUCCESS,
      payload: res.data.events,
    });
  } catch (error) {
    dispatch({
      type: FETCH_EVENTS_FAILURE,
      payload: error.message || "Something went wrong",
    });
  }
};

export const updateEvent = (eventId, eventData) => async (dispatch) => {
  dispatch({ type: UPDATE_EVENTS_REQUEST });
  try {
    const res = await axios.put(
      `http://localhost:3000/api/v1/events/${eventId}`,
      eventData,
    );
    dispatch({
      type: UPDATE_EVENTS_SUCCESS,
      payload: res.data.event,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_EVENTS_FAILURE,
      payload: error.message || "Something went wrong",
    });
  }
};

export const deleteEvent = (eventId) => async (dispatch) => {
  dispatch({ type: DELETE_EVENT_REQUEST });
  try {
    const res = await axios.delete(
      `http://localhost:3000/api/v1/events/${eventId}`,
    );
    dispatch({
      type: DELETE_EVENT_SUCCESS,
      payload: res.data.event,
    });
  } catch (error) {
    dispatch({
      type: DELETE_EVENT_FAILURE,
      payload: error.message || "Something went wrong",
    });
  }
};
