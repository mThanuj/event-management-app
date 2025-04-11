import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import { thunk } from "redux-thunk";
import combinedRootReducers from "./reducers";

const store = createStore(
  combinedRootReducers,
  compose(applyMiddleware(thunk)),
);

export default store;
