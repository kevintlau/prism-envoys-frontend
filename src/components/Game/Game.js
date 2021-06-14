import "./Game.css";
import PlayerPanel from "../PlayerPanel/PlayerPanel";
import ActionsPanel from "../ActionsPanel/ActionsPanel";
import StatusPanel from "../StatusPanel/StatusPanel";
import { useState } from "react";
import generateActions from "../../gamedata/actions";
import { Container, Row, Col } from "reactstrap";

export default function Game(props) {
  const character = props.playerState.character;

  const [enemyState, setEnemyState] = useState(null);
  const [resultState, setResultState] = useState(
    "Welcome!~ You wake up from a long nap."
  );
  const [actionsState, setActionsState] = useState(
    generateActions(false, character.class, character.location)
  );

  return (
    <Container>
      <Row>
        <Col>
          <PlayerPanel
            userState={props.userState}
            character={character}
            setCharState={props.setCharState}
            setPlayerState={props.setPlayerState}
            enemy={enemyState}
          />
        </Col>
        <Col>
          <ActionsPanel
            character={character}
            setPlayerState={props.setPlayerState}
            enemy={enemyState}
            setEnemyState={setEnemyState}
            setResultState={setResultState}
            actionsState={actionsState}
            setActionsState={setActionsState}
          />
        </Col>
        <Col>
          <StatusPanel
            userState={props.userState}
            resultState={resultState}
            enemy={enemyState}
            character={character}
          />
        </Col>
      </Row>
    </Container>
  );
}
