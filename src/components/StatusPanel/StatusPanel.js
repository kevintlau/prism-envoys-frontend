import "./StatusPanel.css";

export default function StatusPanel(props) {
  return (
    <div className="status-panel">
      <p>Status Panel</p>
      {props.enemy && (
        <div className="enemy">
          <p>Enemy</p>
          <p>{props.enemy.name}</p>
          <p>HP: {props.enemy.currentHp}</p>
          <p>ATK: {props.enemy.atk}</p>
        </div>
      )}
      <p>{props.resultState}</p>
    </div>
  );
}
