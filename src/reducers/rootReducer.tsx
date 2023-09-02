import { combineReducers } from "redux";
import getUser from "./getUser";
import registerUser from "./registerUser";

const rootReducer = combineReducers({
  users: getUser,
  registerUser:registerUser
});

export default rootReducer;
