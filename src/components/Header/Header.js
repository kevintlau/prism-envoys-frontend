import "./Header.css";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from "reactstrap";
import { login, logout } from "../../services/firebase";

export default function Header(props) {

  // clicking title drops the current character from playerState
  //   and goes back to character select
  const handleTitleClick = () => {
    props.setPlayerState((prevState) => ({
      ...prevState,
      character: null,
    }));
  };

  // generate a username for greeting, based on user's email
  const username = props.user ? props.user.email.split("@")[0] : "";

  return (
    <div>
      <Navbar>
        <NavbarBrand className="mx-3 title-text" onClick={handleTitleClick}>
          Prism Envoys
        </NavbarBrand>
        <Nav>
          {props.user ? (
            <>
              <NavbarText>Welcome, {username}</NavbarText>
              <NavItem>
                <NavLink onClick={logout}>Logout</NavLink>
              </NavItem>
            </>
          ) : (
            <NavItem>
              <NavLink onClick={login}>Login</NavLink>
            </NavItem>
          )}
        </Nav>
      </Navbar>
    </div>
  );
}
