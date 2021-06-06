import axios from "axios";

const BASE_URL = "http://localhost:3001/api/characters";

const fetchChars = (userId) => {
  return axios.get(`${BASE_URL}?uid=${userId}`);
}

const createChar = (newChar) => {
  return axios.post(BASE_URL, newChar);
}

const deleteChar = (characterId, userId) => {
  return axios.delete(`${BASE_URL}/${characterId}?uid=${userId}`);
}

export {
  fetchChars,
  createChar,
  deleteChar,
} 