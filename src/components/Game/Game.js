import generateActions from "../../gamedata/actions";

export default function Game(props) {
  const actions = generateActions(false, "Crusader", "Glimmer Plains");
  return (
    <div className="game">
      {JSON.stringify(actions)}
    </div>
  )
}