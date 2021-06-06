import "./Header.css";
import { login, logout } from "../../services/firebase";

export default function Header(props) {
  return (
    <header className="header">
      <h1>Prism Envoys</h1>
      <nav>
        <ul>
          {props.user ? (
            <>
              <li>Welcome, {props.user.displayName}</li>
              <li className="navLink" onClick={logout}>
                Logout
              </li>
            </>
          ) : (
            <li className="navLink" onClick={login}>
              Login
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
