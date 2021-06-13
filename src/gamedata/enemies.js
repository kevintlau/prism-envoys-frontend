import LOCATIONS from "./locations";

const ENEMIES = {
  [LOCATIONS.GLIMMER_PLAINS]: {
    GOBLIN: {
      name: "Goblin Scout",
      atk: 2,
      currentHp: 6,
      maxHp: 6,
      xp: 1,
    },
    OGRE: {
      name: "Provoked Ogre",
      atk: 4,
      currentHp: 10,
      maxHp: 10,
      xp: 3,
    },
    BEAR: {
      name: "Brown Bear",
      atk: 3,
      currentHp: 8,
      maxHp: 8,
      xp: 2,
    },
  },
};

export default ENEMIES;
