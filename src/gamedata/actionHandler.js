import ENEMIES from "./enemies";
import ACTIONS from "./actions";
import LOCATIONS from "./locations";

export default function handleAction(
  action,
  character,
  setPlayerState,
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
      setResultState(`
        You hit the ${enemy} for ${damageToEnemy} damage. 
        You defeated the ${enemy}!
      `);
      setPlayerState((prevState) => ({
        ...prevState,
        xp: prevState.xp + enemy.xp,
      }));
      setEnemyState(null);
    } else if (newCharacterHealth <= 0) {
      setResultState(`
        The ${enemy} hits you for ${enemyAtk} damage. 
        You are defeated.
      `);
    } else {
      setEnemyState((prevState) => ({
        ...prevState,
        currentHp: prevState.currentHp - damageToEnemy,
      }));
      setPlayerState((prevState) => ({
        ...prevState,
        currentHp: prevState.currentHp - enemyAtk,
      }));
      setResultState(`
        You hit the ${enemy} for ${damageToEnemy} damage! 
        The ${enemy} hits you for ${enemyAtk} damage!
      `);
    }
  }

  const location = character.location;

  switch (action) {
    case "GOTO_GLEAM_TOWN":
      setPlayerState((prevState) => ({
        ...prevState,
        character: { ...prevState.character, location: "Gleam Town" },
      }));
      break;
    case "GOTO_GLIMMER_PLAINS":
      setPlayerState((prevState) => ({
        ...prevState,
        character: { ...prevState.character, location: "Glimmer Plains" },
      }));
      break;
    case "GOTO_SHADE_CAVE":
      setResultState(`
        You find a sign at the entrace of the cave. It reads:
        "Cave closed off due to earthquake. Come back later."
      `);
      break;
    case "REFINE_WEAPON":
      if (location === LOCATIONS.GLEAM_TOWN) {
        setPlayerState((prevState) => ({
          ...prevState,
          character: {
            ...prevState.character,
            atk: prevState.character.atk + 2,
          },
        }));
      }
      if (location === LOCATIONS.GLIMMER_PLAINS) {
        setPlayerState((prevState) => ({
          ...prevState,
          character: {
            ...prevState.character,
            atk: prevState.character.atk + 1,
          },
        }));
      }
      break;
    case "REFINE_ARMOR":
      if (location === LOCATIONS.GLEAM_TOWN) {
        setPlayerState((prevState) => ({
          ...prevState,
          character: {
            ...prevState.character,
            def: prevState.character.def + 1,
          },
        }));
      }
      break;
    case "REST":
      if (location === LOCATIONS.GLEAM_TOWN) {
        setPlayerState((prevState) => ({
          ...prevState,
          character: {
            ...prevState.character,
            currentHp: prevState.character.maxHp,
          },
        }));
      }
      if (location === LOCATIONS.GLIMMER_PLAINS) {
        let overflow = character.currentHp + 3 > character.maxHp;
        setPlayerState((prevState) => ({
          ...prevState,
          character: {
            ...prevState.character,
            currentHp: overflow
              ? prevState.character.maxHp
              : prevState.character.currentHp + 3,
          },
        }));
      }
      break;
    case "MEDITATE":
      if (location === LOCATIONS.GLEAM_TOWN) {
        setPlayerState((prevState) => ({
          ...prevState,
          character: {
            ...prevState.character,
            currentMp: prevState.character.maxMp,
          },
        }));
      }
      if (location === LOCATIONS.GLIMMER_PLAINS) {
        let overflow = character.currentMp + 3 > character.maxMp;
        setPlayerState((prevState) => ({
          ...prevState,
          character: {
            ...prevState.character,
            currentMp: overflow
              ? prevState.character.maxMp
              : prevState.character.currentMp + 3,
          },
        }));
      }
      break;
    case ACTIONS.TALK_TO_ADVENTURER:
      if (location === LOCATIONS.GLIMMER_PLAINS) {
        setPlayerState((prevState) => ({ ...prevState, xp: prevState.xp + 1 }));
      }
    case ACTIONS.POKE_BEAR:
      setEnemyState(ENEMIES.BEAR);
      setResultState("The bear wakes up!");
      break;
    case ACTIONS.ATTACK:
      handleCombat(character.atk);
      break;
    case ACTIONS.SPELL:
      if (character.mp < 4) return;
      setPlayerState((prevState) => ({ ...prevState, mp: prevState.mp - 4 }));
      handleCombat(character.atk * 2);
      break;
  }
}
