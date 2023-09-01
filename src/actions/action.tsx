export interface IUserFormData {
  fname: string;
  lname: string;
  username: string;
  gender: string;
  role: string;
  address: string;
  email: string;
  password: string;
  repass: string;
}

export interface IActionType {
  type: string;
  payload?: any;
}

const ActionTypes: any = {
  ADD_CONTACT: "ADD_CONTACT",
  GET_CONTACT: "GET_CONTACTS",
};

export default ActionTypes;
