const BASE_STATS = {
  level: 1,
  xp: 0,
  maxHp: 15,
  currentHp: 15,
  maxMp: 15,
  currentMp: 15,
  atk: 5,
  dex: 5,
  def: 5,
  luk: 5,
  location: "Gleam Town",
  inventory: [],
};

// crusader starting stat changes
const CRUSADER_STATS = {
  maxHp: 25,
  currentHp: 25,
  dex: 8,
  def: 10,
};

// inquisitor starting stat changes
const INQUISITOR_STATS = {
  maxHp: 20,
  currentHp: 20,
  atk: 7,
  dex: 10,
  def: 6,
  luk: 6,
};

// shepherd starting stat changes
const SHEPHERD_STATS = {
  maxMp: 25,
  currentMp: 25,
  atk: 10,
  luk: 8,
};

const generateStats = (charClass) => {
  switch (charClass) {
    case "Crusader":
      return { ...BASE_STATS, ...CRUSADER_STATS };
    case "Inquisitor":
      return { ...BASE_STATS, ...INQUISITOR_STATS };
    case "Shepherd":
      return { ...BASE_STATS, ...SHEPHERD_STATS };
  }
};

export { generateStats };
