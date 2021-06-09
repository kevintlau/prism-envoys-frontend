import ENEMIES from "./enemies";

export default function handleAction(
  action,
  location,
  playerState,
  setPlayerState,
  setActionState,
  enemyState,
  setEnemyState,
  setResultState
) {
  // helper function to handle combat steps
  function handleCombat(damageToEnemy) {
    const newEnemyHealth = enemyState.hp - damageToEnemy;
    const newPlayerHealth = playerState.hp - enemyState.atk;
    const enemy = enemyState.name;
    const enemyAtk = enemyState.atk;
    if (newEnemyHealth <= 0) {
      setResultState(
        `You hit the ${enemy} for ${damageToEnemy} damage. You defeated the ${enemy}!`
      );
      setPlayerState((prevState) => ({
        ...prevState,
        xp: prevState.xp + enemyState.xp,
      }));
      setEnemyState(null);
      setActionState(generateActions(false));
    } else if (newPlayerHealth <= 0) {
      setResultState(
        `The ${enemy} hits you for ${enemyAtk} damage. You are defeated.`
      );
    } else {
      setEnemyState((prevState) => ({
        ...prevState,
        hp: prevState.hp - damageToEnemy,
      }));
      setPlayerState((prevState) => ({
        ...prevState,
        hp: prevState.hp - enemyAtk,
      }));
      setResultState(
        `You hit the ${enemy} for ${damageToEnemy} damage! The ${enemy} hits you for ${enemyAtk} damage!`
      );
    }
  }

  switch (action) {
    case ACTIONS.REFINE_WEAPON:
      setPlayerState(prevState => ({...prevState, atk: prevState.atk + 1}));
      break;
    case ACTIONS.POKE_BEAR:
      setEnemyState(ENEMIES.BEAR);
      setResultState("The bear wakes up!");
      setActionState(generateActions(true));
      break;
    case ACTIONS.ATTACK:
      handleCombat(playerState.atk);
      break;
    case ACTIONS.SPELL: 
      if (playerState.mp < 4) return;
      setPlayerState(prevState => ({...prevState, mp: prevState.mp - 4}));
      handleCombat(playerState.atk * 2);
      break;
  }
}
