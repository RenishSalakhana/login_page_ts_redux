import { useContext, useState } from "react";
import ActionsTypes, { IUserFormData } from "../actions/action";
import { useSelector } from "react-redux";

export default function Profile() {
  const users: any = useSelector((state: any) => state.registerReducer);
  const userLogin = users.users[users.loggedInUser];
  const [state, setState] = useState<IUserFormData>(userLogin);
  console.log(users.users[users.loggedInUser]);

  function handleFormOnChange(e: React.FormEvent) {
    let name = e.target as HTMLInputElement;
    let val = e.target as HTMLInputElement;
    setState((prevState) => {
      return {
        ...prevState,
        [name.name]: val.value,
      };
    });
  }

  function userInfo(e: React.FormEvent) {
    e.preventDefault();
    users.users[users.loggedInUser] = state;
  }

  return (
    <div className="container border border-dark my-5">
      <div className="row my-5 justify-content-center">
        <div className="col-lg-2">
          <form onSubmit={userInfo}>
            <label className="form-label">
              Name:
              <input
                type="text"
                name="fname"
                onChange={handleFormOnChange}
                value={state.fname}
              />
            </label>
            <label className="form-label">
              Email:
              <input
                type="email"
                name="email"
                value={state.email}
                onChange={handleFormOnChange}
              />
            </label>
            <label className="form-label">
              Role:
              <input
                type="text"
                name="role"
                onChange={handleFormOnChange}
                value={state.role}
              />
            </label>
            <button type="submit" className="btn btn-primary">
              Edit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
