import { combineReducers } from "redux";
import UserReducer from "./reducer-user";

const allReducers = combineReducers({
  user: UserReducer,
});

export default allReducers;
