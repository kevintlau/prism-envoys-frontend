import ENEMIES from "./enemies";
import ACTIONS from "./actions";
import generateActions from "./actions";

export default function handleAction(
  action,
  character,
  setPlayerState,
  setActionState,
  enemy,
  setEnemyState,
  setResultState
) {
  // helper function to handle combat steps
  function handleCombat(damageToEnemy) {
    const newEnemyHealth = enemy.currentHp - damageToEnemy;
    const newCharacterHealth = character.currentHp - enemy.atk;
    const enemy = enemy.name;
    const enemyAtk = enemy.atk;
    if (newEnemyHealth <= 0) {
      setResultState(
        `You hit the ${enemy} for ${damageToEnemy} damage. You defeated the ${enemy}!`
      );
      setPlayerState((prevState) => ({
        ...prevState,
        xp: prevState.xp + enemy.xp,
      }));
      setEnemyState(null);
      setActionState(generateActions(false, character.class, character.location));
    } else if (newCharacterHealth <= 0) {
      setResultState(
        `The ${enemy} hits you for ${enemyAtk} damage. You are defeated.`
      );
    } else {
      setEnemyState((prevState) => ({
        ...prevState,
        currentHp: prevState.currentHp - damageToEnemy,
      }));
      setPlayerState((prevState) => ({
        ...prevState,
        currentHp: prevState.currentHp - enemyAtk,
      }));
      setResultState(
        `You hit the ${enemy} for ${damageToEnemy} damage! The ${enemy} hits you for ${enemyAtk} damage!`
      );
    }
  }

  const location = character.location;

  switch (action) {
    case ACTIONS.REFINE_WEAPON:
      if (location === "Gleam Town") {
        setPlayerState(prevState => ({...prevState, atk: prevState.atk + 2}));
      }
      if (location === "Glimmer Plains") {
        setPlayerState(prevState => ({...prevState, atk: prevState.atk + 1}));
      }
      break;
    case ACTIONS.TALK_TO_ADVENTURER:
      if (location === "Glimmer Plains") {
        setPlayerState(prevState => ({...prevState, xp: prevState.xp + 1}));
      }
    case ACTIONS.POKE_BEAR:
      setEnemyState(ENEMIES.BEAR);
      setResultState("The bear wakes up!");
      setActionState(generateActions(true));
      break;
    case ACTIONS.ATTACK:
      handleCombat(character.atk);
      break;
    case ACTIONS.SPELL: 
      if (character.mp < 4) return;
      setPlayerState(prevState => ({...prevState, mp: prevState.mp - 4}));
      handleCombat(character.atk * 2);
      break;
  }
}
