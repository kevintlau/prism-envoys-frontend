import "./Game.css";
import PlayerPanel from "../PlayerPanel/PlayerPanel";
import ActionsPanel from "../ActionsPanel/ActionsPanel";
import StatusPanel from "../StatusPanel/StatusPanel";
import { useState } from "react";

export default function Game(props) {
  const [enemyState, setEnemyState] = useState(null);
  const [resultState, setResultState] = useState("");

  const character = props.playerState.character;

  return (
    <div className="game">
      <PlayerPanel
        userState={props.userState}
        character={character}
        setCharState={props.setCharState}
        setPlayerState={props.setPlayerState}
        enemy={enemyState}
      />
      <ActionsPanel
        character={character}
        setPlayerState={props.setPlayerState}
        enemy={enemyState}
        setEnemyState={setEnemyState}
        setResultState={setResultState}
      />
      <StatusPanel
        userState={props.userState}
        resultState={resultState}
        enemy={enemyState}
        character={character}
      />
    </div>
  );
}
