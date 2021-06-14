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
      <h5>Actions</h5>
      {props.character.currentHp <= 0 ? (
        <h6>You are defeated.</h6>
      ) : (
        props.actionsState.map((action, idx) => (
          <Row>
            <Col>
              <Button
                key={idx}
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
    // <div className="actions-panel">
    //   <h3>Actions</h3>
    //   {props.character.currentHp <= 0 ? (
    //     <p>You are defeated.</p>
    //   ) : (
    //     props.actionsState.map((action, idx) => (
    //       <button
    //         key={idx}
    //         onClick={() => {
    //           console.log(action[1]);
    //           handleAction(
    //             action[1],
    //             props.character,
    //             props.setPlayerState,
    //             props.enemy,
    //             props.setEnemyState,
    //             props.setResultState,
    //             props.setActionsState
    //           );
    //         }}
    //       >
    //         {action[1]}
    //       </button>
    //     ))
    //   )}
    // </div>
  );
}
