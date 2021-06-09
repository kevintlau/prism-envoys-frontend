import "./PlayerPanel.css";

export default function PlayerPanel(props) {
  const character = props.character.data;

  return (
    <div className="player-panel">
      <p>Name: {character.name}</p>
      <p>Level {character.level} {character.race} {character.class}</p>
      <p>XP: {character.xp}</p>
      <button>Save and Exit</button>
    </div>
  );
}