import "./CharacterSelect.css";
import generateStats from "../../gamedata/startingStats";
import { createChar, deleteChar } from "../../services/char-service";

export default function CharacterSelect(props) {
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
    if (!props.user) return;
    evt.preventDefault();
    // populate new character object with stats and user id
    const startingStats = generateStats(props.newChar.class);
    let newChar = {
      ...props.newChar,
      ...startingStats,
      uid: props.user.uid,
    };
    // create new character in database
    try {
      const createdChar = await createChar(newChar);
      props.setCharState(prevState => ({
        ...prevState,
        characters: { data: [...prevState.characters.data, createdChar]},
        // reset new character form
        newChar: {
          name: "",
          race: "Human",
          class: "Crusader"
        }
      }));
    } catch(error) {
      console.error(error);
    }
  }

  const handleDelete = async (charId) => {
    if (!props.user) return;
    try {
      const characters = await deleteChar(charId, props.user.uid);
      props.setCharState(prevState => ({
        ...prevState,
        characters,
      }));
    } catch(error) {
      console.error(error);
    }
  }

  // JSX component
  return (
    <div className="char-select">
      <h2>Character Select</h2>
      <div className="char-list">
        {props.chars.map((char, idx) => (
          <article className="char" key={idx}>
            <p>Character {idx + 1}</p>
            <p>Name: {char.name}</p>
            <p>Race: {char.race}</p>
            <p>Class: {char.class}</p>
            <button onClick={() => handleDelete(char._id)}>Delete</button>
          </article>
        ))}
        <article className="char-form">
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              value={props.newChar.name}
              onChange={handleChange}
            />
            <label htmlFor="race">Race:</label>
            <select
              name="race"
              id="race"
              value={props.newChar.race}
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
              value={props.newChar.class}
              onChange={handleChange}
            >
              <option value="Crusader">Crusader (durable fighter)</option>
              <option value="Inquisitor">Inquisitor (accurate ranger)</option>
              <option value="Shepherd">Shepherd (powerful caster)</option>
            </select>
            <button disabled={!props.user}>
              Create character
            </button>
          </form>
        </article>
      </div>
    </div>
  );
}
