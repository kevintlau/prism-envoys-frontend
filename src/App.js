import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [userState, setUserState] = useState({
    user: null,
    characters: { data: [] },
  });
  // user: { uid: "ABC123", name: "Lorem Ipsum", email: "a@a.com" }

  useEffect(() => {
    const getAppData = async () => {
      try {
        const characters = await axios.get(
          "http://localhost:3001/api/characters"
        );
        setUserState((prevState) => ({
          ...prevState,
          characters,
        }));
      } catch (error) {
        console.error(error);
      }
    };
    getAppData();
  }, []);

  return (
    <>
      {userState.characters.data.map((char, idx) => (
        <article key={idx}>
          <p>Character {idx + 1}</p>
          <p>Name: {char.name}</p>
          <p>Race: {char.race}</p>
          <p>Class: {char.class}</p>
        </article>
      ))}

    </>
  );
}

export default App;
