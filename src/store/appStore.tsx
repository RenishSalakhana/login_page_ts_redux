import { configureStore } from "@reduxjs/toolkit";
import AllReducers from "../reducers/allReducers";

const store = configureStore({ reducer: AllReducers });

export default store;
