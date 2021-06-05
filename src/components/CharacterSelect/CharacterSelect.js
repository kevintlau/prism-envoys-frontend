import "./CharacterSelect.css";

const CharacterSelect = (props) => (
  <div className="char-select">
    <h2>Character Select</h2>
    {props.chars.map((char, idx) => (
      <article key={idx}>
        <p>Character {idx + 1}</p>
        <p>Name: {char.name}</p>
        <p>Race: {char.race}</p>
        <p>Class: {char.class}</p>
      </article>
    ))}
  </div>
)

export default CharacterSelect;