import { combineReducers } from "redux";
import authReducer from "./auth.slice";
import usersReducer from "./users.slice";
import loadingReducer from "./loading.slice";

export const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  loading: loadingReducer,
});
