import React from "react";
import { useSelector } from "react-redux";

export default function Info() {
  const users: any = useSelector((state: any) => state.registerReducer);

  React.useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(users.users));
  }, [users.users]);

  const persistedUsers = JSON.parse(localStorage.getItem("userData") || "[]");

  return (
    <>
      <div className="table-responsive-md">
        <table className="table table-bordered table-hover table-striped table-info">
          <thead>
            <tr className="tr">
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            {persistedUsers.map((item: any, i: number) => {
              console.log(item, i);
              return (
                <tr key={i}>
                  <td>{item.fname}</td>
                  <td>{item.lname}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
