import { REGISTER_USER_FAILURE, REGISTER_USER_SUCCESS } from "../actions/ActionTypes";

const initialState = {
  users: [],
  registrationSuccess: false,
  registrationError: null,
};

const registerUser = (state = initialState, action: { type: any; payload: any; }) => {
  switch (action.type) {
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        registrationSuccess: true,
        registrationError: null,
        users: [...state.users, action.payload], 
      };

    case REGISTER_USER_FAILURE:
      return {
        ...state,
        registrationSuccess: false,
        registrationError: action.payload, 
      };
    default:
      return state;
  }
};

export default registerUser;
