import LOCATIONS from "./locations";
import CLASSES from "./classes";

// number of random actions in field areas
const FIELD_ACTION_COUNT = 4;

const ACTIONS = {
  [LOCATIONS.GLEAM_TOWN]: {
    REFINE_WEAPON: "Refine your weapon at the blacksmith",
    REFINE_ARMOR: "Refine your armor at the armorer",
    REST: "Rest at the inn",
    MEDITATE: "Pray at the Prism altar",
  },
  [LOCATIONS.GLIMMER_PLAINS]: {
    SEARCH_ORE: "Search for ore nearby",
    MINE_ROCKS: "Mine nearby rocks for ore",
    CHALLENGE_GOBLIN: "Challenge a goblin in a camp",
    THREATEN_OGRE: "Make threatening gestures at an ogre",
    POKE_BEAR: "Poke a sleeping bear under a tree",
    TALK_TO_ADVENTURER: "Talk to an adventurer passing by",
    TALK_TO_MERCHANT: "Talk to a merchant passing by",
    REFINE_WEAPON: "Sharpen your weapon with a stone on the ground",
    EAT_FRUIT: "Pick an apple and take a bite",
    REST: "Take a quick rest",
    MEDITATE: "Meditate to regain energy",
  },
};

// movement actions in field areas - not counted in random action limit
const MOVEMENT_ACTIONS = {
  [LOCATIONS.GLEAM_TOWN]: {
    GOTO_GLIMMER_PLAINS: "Go to Glimmer Plains",
  },
  [LOCATIONS.GLIMMER_PLAINS]: {
    GOTO_GLEAM_TOWN: "Go to Gleam Town",
    GOTO_SHADE_CAVE: "Go to Shade Cave",
  },
  [LOCATIONS.SHADE_CAVE]: {
    GOTO_GLIMMER_PLAINS: "Go to Glimmer Plains",
  },
};

const BATTLE_ACTIONS = {
  [CLASSES.CRUSADER]: {
    ATTACK: "Guarded Slash",
    SPELL: "Faithful Strike, Cost: 4 MP",
    FLEE: "Flee, 50% chance"
  },
  [CLASSES.INQUISITOR]: {
    ATTACK: "Accurate Shot",
    SPELL: "Argent Barrage, Cost: 4 MP",
    FLEE: "Flee, 50% chance"
  },
  [CLASSES.SHEPHERD]: {
    ATTACK: "Brilliant Flash",
    SPELL: "Eminence, Cost: 4 MP",
    FLEE: "Flee, 50% chance"
  },
};

export default function generateActions(inBattle, playerClass, location) {
  if (inBattle) {
    return Object.entries(BATTLE_ACTIONS[playerClass]);
  } else {
    let actions = [];
    // make a list of indices of the random actions
    let actionsIdxArray = [];
    const actionEntries = Object.entries(ACTIONS[location]);
    const movementActionEntries = Object.entries(MOVEMENT_ACTIONS[location]);
    switch(location) {
      case LOCATIONS.GLEAM_TOWN:
        actions = [
          ...actionEntries,
          ...movementActionEntries,
        ];
        break;
      case LOCATIONS.GLIMMER_PLAINS:
        while (actionsIdxArray.length < FIELD_ACTION_COUNT) {
          let idx = Math.floor(Math.random() * Object.keys(ACTIONS[location]).length);
          if (!actionsIdxArray.includes(idx)) actionsIdxArray.push(idx);
        }
        actions = [
          ...actionsIdxArray.map(idx => actionEntries[idx]),
          ...movementActionEntries,
        ];
        break;
    }
    return actions;
  }
}
