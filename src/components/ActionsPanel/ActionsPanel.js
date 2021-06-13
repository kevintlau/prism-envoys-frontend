import "./ActionsPanel.css";
import generateActions from "../../gamedata/actions";
import handleAction from "../../gamedata/actionHandler";

export default function ActionsPanel(props) {
  const actions = generateActions(
    props.enemy,
    props.character.class,
    props.character.location
  );
  return (
    <div className="actions-panel">
      <h3>Actions</h3>
      {props.character.currentHp <= 0 ? (
        <p>You are defeated.</p>
      ) : (
        actions.map((action, idx) => (
          <button
            key={idx}
            onClick={() => {
              console.log(action[1]);
              handleAction(
                action[1],
                props.character,
                props.setPlayerState,
                props.enemy,
                props.setEnemyState,
                props.setResultState
              );
            }}
          >
            {action[1]}
          </button>
        ))
      )}
    </div>
  );
}
