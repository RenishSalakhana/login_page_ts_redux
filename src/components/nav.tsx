import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <ul className="navbar-nav">
        <li className="nav-item active">
          <Link className="nav-link" to="/">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Register
          </Link>
        </li>
      </ul>
    </nav>
  );
}
