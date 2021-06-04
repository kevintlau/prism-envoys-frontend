import axios from "axios";

const BASE_URL = "http://localhost:3001/api/characters";

const fetchChars = () => {
  const results = axios.get(BASE_URL);
  console.log(results);
  return results;
}

export {
  fetchChars
} 