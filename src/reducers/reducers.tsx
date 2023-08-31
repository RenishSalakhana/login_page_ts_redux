import ActionTypes, { IActionType } from "../actions/action";


export interface IAppState {
  users: any[];
  loggedInUser: number;
}
const persistedState = localStorage.getItem("appState");
const initialState: IAppState = persistedState
  ? JSON.parse(persistedState)
  : {
      users: [],
      loggedInUser: -1,
    };

const RegisterReducer = (
  state: IAppState = initialState,
  action: IActionType
) => {
  switch (action.type) {
    case ActionTypes.ADD_CONTACT:
      const newState = {
        ...state,
        users: [...state.users, action.payload],
      };
      localStorage.setItem("appState", JSON.stringify(newState));
      return newState;
    default:
      return state;
  }
};

export default RegisterReducer;
