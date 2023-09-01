//for register user 
export interface IUserFormData {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    cnfpassword: string;
  }

  //for login user
export interface LoginProps {
    username: string;
    password?: string;
  }

  //for routes info :
export interface RoutesArrays {
    arrUsers: any[];
    loginUserIndex: number;
  }