import "./ActionsPanel.css";
import handleAction from "../../gamedata/actionHandler";
import { Container, Row, Col, Button, Card, CardText } from "reactstrap";

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
          <h4 className="text-center my-4">Actions</h4>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card body>
            {props.character.currentHp <= 0 ? (
              <CardText>You are defeated.</CardText>
            ) : (
              props.actionsState.map((action) => (
                <Row className="my-1" key={action[0]}>
                  <Col>
                    <Button
                      className="w-100"
                      color={
                        !action[0].includes("GOTO") ? "primary" : "warning"
                      }
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
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
