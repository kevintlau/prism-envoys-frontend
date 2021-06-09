import "./Game.css";
import PlayerPanel from "../PlayerPanel/PlayerPanel";
import ActionsPanel from "../ActionsPanel/ActionsPanel";
import StatusPanel from "../StatusPanel/StatusPanel";

export default function Game(props) {
  return (
    <div className="game">
      <PlayerPanel character={props.playerState.character} />
      <ActionsPanel />
      <StatusPanel />
    </div>
  )
}