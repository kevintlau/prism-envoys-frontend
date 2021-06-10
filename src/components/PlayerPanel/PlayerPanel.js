import "./PlayerPanel.css";
import { saveChar } from "../../services/char-service";

export default function PlayerPanel(props) {
  const character = props.character;

  const handleSave = async (evt) => {
    if (!props.userState.user) return;
    evt.preventDefault();
    try {
      const charactersData = await saveChar(character);
      console.log(charactersData);
      props.setCharState((prevState) => ({
        ...prevState,
        characters: charactersData.data,
      }));
      props.setPlayerState({ character: null });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="player-panel">
      <p>
        <span style={{ fontWeight: "bold" }}>{character.name}</span>
        , {character.race} {character.class}
      </p>
      <p>
        Level: {character.level} | XP: {character.xp}
      </p>
      <p>HP: {character.currentHp} / {character.maxHp}</p>
      <p>MP: {character.currentHp} / {character.maxMp}</p>
      <p>ATK: {character.atk}</p>
      <p>DEF: {character.def}</p>
      <p>Location: {character.location}</p>
      {!props.enemy ? <button onClick={handleSave}>Save and Exit</button> : ""}
    </div>
  );
}
