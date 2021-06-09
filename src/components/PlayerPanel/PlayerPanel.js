import "./PlayerPanel.css";
import { saveChar } from "../../services/char-service";

export default function PlayerPanel(props) {
  const character = props.character;

  const handleSave = async (evt) => {
    if (!props.userState.user) return;
    evt.preventDefault();
    try {
      const characters = await saveChar(character);
      props.setCharState((prevState) => ({
        ...prevState,
        characters,
      }));
      props.setPlayerState({ character: null });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="player-panel">
      <p>Name: {character.name}</p>
      <p>
        Level {character.level} {character.race} {character.class}
      </p>
      <p>XP: {character.xp}</p>
      <button onClick={handleSave}>Save and Exit</button>
    </div>
  );
}
