import "./Header.css";
import { login, logout } from "../../services/firebase";

export default function Header(props) {
  const handleTitleClick = () => {
    props.setPlayerState((prevState) => ({
      ...prevState,
      character: null,
    }));
  };

  // generate a username for greeting, based on user's email
  const username = props.user ? props.user.email.split("@")[0] : "";

  return (
    <header className="header">
      <h1 onClick={handleTitleClick}>Prism Envoys</h1>
      <nav>
        <ul>
          {props.user ? (
            <>
              <li>Welcome, {username}</li>
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
