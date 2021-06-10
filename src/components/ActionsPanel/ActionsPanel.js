import "./ActionsPanel.css";
import generateActions from "../../gamedata/actions";
import handleAction from "../../gamedata/actionHandler";

export default function ActionsPanel(props) {
  const actions = generateActions(
    props.enemyState,
    props.character.class,
    props.character.location
  );
  return (
    <div className="actions-panel">
      <h3>Actions</h3>
      {actions.map((action, idx) => (
        <button
          key={idx}
          onClick={() =>
            handleAction(
              action[0],
              props.character,
              props.setPlayerState,
              props.enemy,
              props.setEnemyState,
              props.setResultState
            )
          }
        >
          {action[1]}
        </button>
      ))}
    </div>
  );
}
