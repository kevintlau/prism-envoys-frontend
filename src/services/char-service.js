import axios from "axios";

const BASE_URL = "http://localhost:3001/api/characters";

const fetchChars = () => {
  const results = axios.get(BASE_URL);
  return results;
}

const createChar = (newChar) => {
  const createdChar = axios.post(BASE_URL, newChar);
  return createdChar;
}

export {
  fetchChars,
  createChar,
} 