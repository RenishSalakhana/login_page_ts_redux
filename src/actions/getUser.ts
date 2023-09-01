import axios from 'axios';
import { API_URL } from '../config/api';
import { GET_USERS, REGISTER_USER_FAILURE, REGISTER_USER_SUCCESS } from './ActionTypes';

export const getUsers = () => async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
  try {
    const response = await axios.get(API_URL);
    dispatch({ type: GET_USERS, payload: response.data });
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};


// Action creator for user registration
export const registerUser = (userFormData: any) => async (dispatch: (arg0: { type: string; payload: any; }) => void) => {
  try {
    const response = await axios.post(`${API_URL}`, userFormData);
    if (response.data && response.data.success) {
      dispatch({ type: REGISTER_USER_SUCCESS, payload: userFormData });
    } else {
      dispatch({ type: REGISTER_USER_FAILURE, payload: userFormData });
    }
  } catch (error:any) {
    dispatch({ type: REGISTER_USER_FAILURE, payload: error.message });
  }
};

