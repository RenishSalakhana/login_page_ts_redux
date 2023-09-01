import { combineReducers } from "redux";
import RegisterReducer from "./reducers";

const AllReducers: any = combineReducers({
  registerReducer: RegisterReducer,
});

export default AllReducers;
