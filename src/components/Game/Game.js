import "./Game.css";
import PlayerPanel from "../PlayerPanel/PlayerPanel";
import ActionsPanel from "../ActionsPanel/ActionsPanel";
import StatusPanel from "../StatusPanel/StatusPanel";

export default function Game(props) {
  return (
    <div className="game">
      <PlayerPanel
        userState={props.userState}
        character={props.playerState.character.data}
        setCharState={props.setCharState}
        setPlayerState={props.setPlayerState}
      />
      <ActionsPanel />
      <StatusPanel />
    </div>
  );
}
