import "./Welcome.css";
import { Jumbotron, Button } from "reactstrap";
import { login } from "../../services/firebase";

export default function Welcome(props) {
  return (
    <div className="welcome">
      <Jumbotron className="my-5 py-3 px-2 card">
        <h1 className="display-5">Welcome to Prism Envoys!</h1>
        <p className="lead mb-1">
          Prism Envoys is a text adventure set in the world of Soter.
        </p>
        <p className="lead">
          As a devotee of the Prism faith, you must wield your light magic to
          protect the realm.
        </p>
        <p className="lead">
          <Button color="primary" onClick={login}>
            Click here to get started or resume your journey!
          </Button>
        </p>
      </Jumbotron>
    </div>
  );
}
