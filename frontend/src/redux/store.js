import { legacy_createStore as createStore } from "redux";
import combinedRootReducers from "./reducers";

const store = createStore(combinedRootReducers);

export default store;
