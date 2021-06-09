import "./ActionsPanel.css";
import generateActions from "../../gamedata/actions";

export default function ActionsPanel(props) {
  const actions = generateActions(false, "Crusader", "Glimmer Plains");
  return (
    <div className="actions-panel">
      <h1>Actions</h1>
      {JSON.stringify(actions)}
    </div>
  );
}
