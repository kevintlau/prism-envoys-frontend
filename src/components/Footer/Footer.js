import "./Footer.css";
import { Navbar, Nav, NavbarText } from "reactstrap";

export default function Footer(props) {
  return (
    <div>
      <Navbar>
        <Nav className="mx-auto">
          <NavbarText>
            Copyright &copy; 2021 - Prism Envoys
          </NavbarText>
        </Nav>
      </Navbar>
    </div>
  );
}
