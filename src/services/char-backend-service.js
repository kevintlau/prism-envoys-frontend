import axios from "axios";

const BASE_URL = "http://localhost:3001/api/characters";

const fetchChars = (userId) => {
  return axios.get(`${BASE_URL}?uid=${userId}`);
}

const createChar = (newChar) => {
  return axios.post(BASE_URL, newChar);
}

const selectChar = (charId, userId) => {
  return axios.get(`${BASE_URL}/${charId}?uid=${userId}`)
}

const saveChar = (char, userId) => {
  const charId = char._id;
  return axios.put(`${BASE_URL}/${charId}?uid=${userId}`, char);
}

const deleteChar = (charId, userId) => {
  return axios.delete(`${BASE_URL}/${charId}?uid=${userId}`);
}

export {
  fetchChars,
  createChar,
  selectChar,
  saveChar,
  deleteChar,
} 