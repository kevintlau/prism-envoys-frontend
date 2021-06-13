import LOCATIONS from "./locations";

const BASE_STATS = {
  level: 1,
  xp: 0,
  maxHp: 15,
  currentHp: 15,
  maxMp: 15,
  currentMp: 15,
  atk: 3,
  dex: 5,
  def: 3,
  luk: 5,
  location: LOCATIONS.GLEAM_TOWN,
  inventory: [],
};

// crusader starting stat changes
const CRUSADER_STATS = {
  maxHp: 25,
  currentHp: 25,
  dex: 8,
  def: 8,
};

// inquisitor starting stat changes
const INQUISITOR_STATS = {
  maxHp: 20,
  currentHp: 20,
  atk: 5,
  dex: 10,
  def: 5,
  luk: 6,
};

// shepherd starting stat changes
const SHEPHERD_STATS = {
  maxMp: 25,
  currentMp: 25,
  atk: 4,
  luk: 8,
};

export default function generateStats(charClass) {
  switch (charClass) {
    case "Crusader":
      return { ...BASE_STATS, ...CRUSADER_STATS };
    case "Inquisitor":
      return { ...BASE_STATS, ...INQUISITOR_STATS };
    case "Shepherd":
      return { ...BASE_STATS, ...SHEPHERD_STATS };
    default:
      return BASE_STATS;
  }
};

