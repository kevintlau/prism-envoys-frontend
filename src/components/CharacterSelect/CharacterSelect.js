import "./CharacterSelect.css";
import generateStats from "../../gamedata/startingStats";
import {
  createChar,
  selectChar,
  deleteChar,
} from "../../services/char-service";

// props:
//   charState, setCharState,
//   userState,
//   playerState, setPlayerState

export default function CharacterSelect(props) {
  const newChar = props.charState.newChar;

  // create the new character form using controlled components
  const handleChange = (evt) => {
    props.setCharState((prevState) => ({
      ...prevState,
      newChar: {
        ...prevState.newChar,
        [evt.target.name]: evt.target.value,
      },
    }));
  };

  const handleSubmit = async (evt) => {
    if (!props.userState.user) return;
    evt.preventDefault();
    // populate new character object with stats and user id
    const startingStats = generateStats(newChar.class);
    let submittedChar = {
      ...newChar,
      ...startingStats,
      uid: props.userState.user.uid,
    };
    // create new character in database
    try {
      const createdChar = await createChar(submittedChar);
      props.setCharState((prevState) => ({
        ...prevState,
        characters: [ ...prevState.characters, createdChar ],
        // reset new character form
        newChar: {
          name: "",
          race: "Human",
          class: "Crusader",
        },
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelect = async (charId) => {
    if (!props.userState.user) return;
    try {
      const characterData = await selectChar(charId, props.userState.user.uid);
      props.setPlayerState((prevState) => ({
        ...prevState,
        character: characterData.data,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (charId) => {
    if (!props.userState.user) return;
    try {
      const charactersData = await deleteChar(charId, props.userState.user.uid);
      props.setCharState((prevState) => ({
        ...prevState,
        characters: charactersData.data,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  // JSX component
  return (
    <div className="char-select">
      <h2>Character Select</h2>
      <div className="char-list">
        {props.charState.characters.map((char, idx) => (
          <article className="char" key={idx}>
            <p>Character {idx + 1}</p>
            <p>Name: {char.name}</p>
            <p>Level {char.level} {char.race} {char.class}</p>
            <p>Location: {char.location}</p>
            <button onClick={() => handleSelect(char._id)}>Play</button>
            <button onClick={() => handleDelete(char._id)}>Delete</button>
          </article>
        ))}
        <article className="char-form">
          <h4>Create New Character</h4>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              value={newChar.name}
              onChange={handleChange}
            />
            <label htmlFor="race">Race:</label>
            <select
              name="race"
              id="race"
              value={newChar.race}
              onChange={handleChange}
            >
              <option value="Human">Human</option>
              <option value="Giant">Giant</option>
              <option value="Elf">Elf</option>
              <option value="Dwarf">Dwarf</option>
            </select>
            <label htmlFor="class">Class:</label>
            <select
              name="class"
              id="class"
              value={newChar.class}
              onChange={handleChange}
            >
              <option value="Crusader">Crusader (durable fighter)</option>
              <option value="Inquisitor">Inquisitor (accurate ranger)</option>
              <option value="Shepherd">Shepherd (powerful caster)</option>
            </select>
            <button disabled={!props.userState.user}>Create character</button>
          </form>
        </article>
      </div>
    </div>
  );
}
