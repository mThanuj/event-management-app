import axios from "axios";

export const FETCH_EVENTS_SUCCESS = "FETCH_EVENTS_SUCCESS";
export const CREATE_EVENT_SUCCESS = "CREATE_EVENT_SUCCESS";

export const createEvent = (eventData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/v1/events", eventData);
    dispatch({
      type: CREATE_EVENT_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.error("Error creating event", error);
  }
};

export const fetchEvents = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/v1/events");
    dispatch({
      type: FETCH_EVENTS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.error("Error fetching events", error);
  }
};
