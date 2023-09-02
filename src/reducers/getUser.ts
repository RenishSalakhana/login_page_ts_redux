import { ADD_CONTACT, GET_USERS } from "../actions/ActionTypes";

const initialState = {
  users: [],
  loggedInUser: -1,
};

const getUser = (state = initialState, action: { type: any; payload: any; }) => {
  switch (action.type) {
    case ADD_CONTACT:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
};

export default getUser;
