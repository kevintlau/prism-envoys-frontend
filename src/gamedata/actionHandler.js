import ENEMIES from "./enemies";
import { ACTIONS, MOVEMENT_ACTIONS, BATTLE_ACTIONS } from "./actions";
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
  function handleCombat(move, damageToEnemy) {
    let damageToCharacter = enemy.atk - character.def;
    if (damageToCharacter < 1) damageToCharacter = 1;
    const newEnemyHealth = enemy.currentHp - damageToEnemy;
    const newCharacterHealth = character.currentHp - damageToCharacter;
    if (newEnemyHealth <= 0) {
      setResultState(`
        Your ${move} hits the ${enemy.name} for ${damageToEnemy} damage. 
        You defeated the ${enemy.name}!
      `);
      setPlayerState((prevState) => ({
        ...prevState,
        character: {
          ...prevState.character,
          xp: prevState.character.xp + enemy.xp,
        },
      }));
      setEnemyState(null);
    } else if (newCharacterHealth <= 0) {
      setPlayerState((prevState) => ({
        ...prevState,
        character: {
          ...prevState.character,
          currentHp: 0,
        },
      }));
      setResultState(`
        The ${enemy.name} hits you for ${damageToCharacter} damage. 
        You are defeated.
      `);
    } else {
      setEnemyState((prevState) => ({
        ...prevState,
        currentHp: prevState.currentHp - damageToEnemy,
      }));
      setPlayerState((prevState) => ({
        ...prevState,
        character: {
          ...prevState.character,
          currentHp: prevState.character.currentHp - damageToCharacter,
        },
      }));
      setResultState(`
        Your ${move} hits the ${enemy.name} for ${damageToEnemy} damage! 
        The ${enemy.name} hits you for ${damageToCharacter} damage!
      `);
    }
  }

  const location = character.location;

  switch (action) {
    // ----- MOVEMENT ACTIONS -------------------------------------------------
    case MOVEMENT_ACTIONS[location].GOTO_GLEAM_TOWN:
      setPlayerState((prevState) => ({
        ...prevState,
        character: { ...prevState.character, location: "Gleam Town" },
      }));
      setResultState("You traveled to Gleam Town.");
      break;
    case MOVEMENT_ACTIONS[location].GOTO_GLIMMER_PLAINS:
      setPlayerState((prevState) => ({
        ...prevState,
        character: { ...prevState.character, location: "Glimmer Plains" },
      }));
      setResultState("You traveled to Glimmer Plains.");
      break;
    case MOVEMENT_ACTIONS[location].GOTO_SHADE_CAVE:
      setResultState(`
        You find a sign at the entrace of the cave. It reads:
        "Cave closed off due to earthquake. Come back later."
      `);
      break;

    // ----- BASIC ACTIONS ----------------------------------------------------
    case ACTIONS[location].REFINE_WEAPON:
      if (location === LOCATIONS.GLEAM_TOWN) {
        setPlayerState((prevState) => ({
          ...prevState,
          character: {
            ...prevState.character,
            atk: prevState.character.atk + 2,
          },
        }));
        setResultState(`
          The blacksmith hammers your weapon three times, and...
          SUCCESS!~
          Your ATK has increased by 2!
        `);
      }
      if (location === LOCATIONS.GLIMMER_PLAINS) {
        setPlayerState((prevState) => ({
          ...prevState,
          character: {
            ...prevState.character,
            atk: prevState.character.atk + 1,
          },
        }));
        setResultState(`
          You find a rough stone on the ground.
          You start to rub it against your weapon, and...
          SUCCESS!~
          Your ATK has increased by 1!
        `);
      }
      break;
    case ACTIONS[location].REFINE_ARMOR:
      if (location === LOCATIONS.GLEAM_TOWN) {
        setPlayerState((prevState) => ({
          ...prevState,
          character: {
            ...prevState.character,
            def: prevState.character.def + 1,
          },
        }));
        setResultState(`
          The blacksmith hammers your armor three times, and...
          SUCCESS!~
          Your DEF has increased by 1!
        `);
      }
      break;
    case ACTIONS[location].REST:
      if (location === LOCATIONS.GLEAM_TOWN) {
        setPlayerState((prevState) => ({
          ...prevState,
          character: {
            ...prevState.character,
            currentHp: prevState.character.maxHp,
          },
        }));
        setResultState(`
          You stop by the inn and take a long nap.
          Your HP has recovered fully!
        `);
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
        setResultState(`
          You find an inviting patch of grass in the shade beneath a large tree.
          You take a quick rest and patch your wounds.
          Your HP has recovered by 3!
        `);
      }
      break;
    case ACTIONS[location].MEDITATE:
      if (location === LOCATIONS.GLEAM_TOWN) {
        setPlayerState((prevState) => ({
          ...prevState,
          character: {
            ...prevState.character,
            currentMp: prevState.character.maxMp,
          },
        }));
        setResultState(`
          You walk into the Prism temple to the altar.
          You close your eyes and clasp your hands. Your mind clears.
          Your MP has recovered fully!
        `);
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
        setResultState(`
          You sit down on a rock, close your eyes, and clasp your hands.
          Your focus comes back slowly.
          Your MP has recovered by 3!
        `);
      }
      break;
    case ACTIONS[location].EAT_FRUIT:
      if (location === LOCATIONS.GLIMMER_PLAINS) {
        let overflowHp = character.currentHp + 1 > character.maxHp;
        let overflowMp = character.currentMp + 1 > character.maxMp;
        setPlayerState((prevState) => ({
          ...prevState,
          character: {
            ...prevState.character,
            currentHp: overflowHp
              ? prevState.character.maxHp
              : prevState.character.currentHp + 1,
            currentMp: overflowMp
              ? prevState.character.maxMp
              : prevState.character.currentMp + 1,
          },
        }));
        setResultState(`
            You pick an apple from a nearby tree and take a bite.
            You feel immediately invigorated.
            Your HP and MP have recovered by 1!
        `);
      }
      break;

    // ----- TALK ACTIONS -----------------------------------------------------
    case ACTIONS[location].TALKTO_ADVENTURER:
      if (location === LOCATIONS.GLIMMER_PLAINS) {
        setPlayerState((prevState) => ({
          ...prevState,
          character: {
            ...prevState.character,
            xp: prevState.character.xp + 1,
          },
        }));
        setResultState(`
          You see a fellow adventurer and ask them about the surrounding area.
          They tell you about a new way to block ogre attacks.
          You gained 1 XP!
        `);
      }
      break;

    // ----- ENGAGE ACTIONS ---------------------------------------------------
    case ACTIONS[location].ENGAGE_BEAR:
      setEnemyState(ENEMIES[location].BEAR);
      setResultState(`
        You walk up to a bear and poke it with a stick. The bear keeps sleeping.
        Angrily, you throw a rock at the bear and hit it.
        The bear wakes up!
      `);
      break;
    case ACTIONS[location].ENGAGE_OGRE:
      setEnemyState(ENEMIES[location].OGRE);
      setResultState(`
        You walk up to an ogre and make some threatening gestures.
        Even though it doesn't know your language, some actions are just 
          universally understood.
        The ogre approaches you!
      `);
      break;
    case ACTIONS[location].ENGAGE_GOBLIN:
      setEnemyState(ENEMIES[location].GOBLIN);
      setResultState(`
        You see a goblin and approach it. It doesn't seem too happy to see you.
        The goblin gets ready to fight!
      `);
      break;

    // ----- BATTLE ACTIONS ---------------------------------------------------
    case BATTLE_ACTIONS[character.class].ATTACK:
      handleCombat(BATTLE_ACTIONS[character.class].ATTACK, character.atk);
      break;
    case BATTLE_ACTIONS[character.class].SPELL:
      if (character.mp < 4) return;
      setPlayerState((prevState) => ({
        ...prevState,
        character: {
          ...prevState.character,
          currentMp: prevState.character.currentMp - 4,
        },
      }));
      const skillName = BATTLE_ACTIONS[character.class].SPELL.split(",")[0];
      handleCombat(skillName, character.atk * 2);
      break;
  }
}
