import "./ActionsPanel.css";
import generateActions from "../../gamedata/actions";
import handleAction from "../../gamedata/actionHandler";

export default function ActionsPanel(props) {
  const actions = generateActions(false, "Crusader", "Glimmer Plains");
  return (
    <div className="actions-panel">
      <h1>Actions</h1>
      {actions.map((action, idx) => (
        <button
          key={idx}
          onClick={() =>
            handleAction(
              action[0],
              props.character,
              props.setPlayerState,
              props.setActionState,
              props.enemy,
              props.setEnemyState,
              props.setResultState
            )
          }
        >
          {action[1]}
        </button>
      ))}
      {JSON.stringify(actions)}
    </div>
  );
}
