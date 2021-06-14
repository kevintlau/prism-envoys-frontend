import "./ActionsPanel.css";
import handleAction from "../../gamedata/actionHandler";
import { Container, Row, Col, Button } from "reactstrap";

export default function ActionsPanel(props) {
  // const actions = generateActions(
  //   props.enemy,
  //   props.character.class,
  //   props.character.location
  // );
  return (
    <Container>
      <Row>
          <Col>
            <h3 className="text-center my-4">Actions</h3>
          </Col>
        </Row>
      {props.character.currentHp <= 0 ? (
        <h6>You are defeated.</h6>
      ) : (
        props.actionsState.map((action) => (
          <Row className="mb-2" key={action[0]}>
            <Col>
              <Button
                className="w-100"
                color={!action[0].includes("GOTO") ? "primary" : "warning"}
                onClick={() => {
                  console.log(action[1]);
                  handleAction(
                    action[1],
                    props.character,
                    props.setPlayerState,
                    props.enemy,
                    props.setEnemyState,
                    props.setResultState,
                    props.setActionsState
                  );
                }}
              >
                {action[1]}
              </Button>
            </Col>
          </Row>
        ))
      )}
    </Container>
  );
}
