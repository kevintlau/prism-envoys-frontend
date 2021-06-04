// import methods
import { useState, useEffect } from "react";
import axios from "axios";
import { auth } from "./services/firebase";

// import stylesheets
import "./App.css";

// import components
import Header from "./components/Header/Header";

export default function App() {
  const [userState, setUserState] = useState({ user: null });
  // user: { uid: "ABC123", name: "Lorem Ipsum", email: "a@a.com" }

  const [charState, setCharState] = useState({
    characters: { data: [] },
    ingame: null,
  });

  useEffect(() => {
    const getAppData = async () => {
      if (!userState.user) return;
      try {
        const characters = await axios.get(
          "http://localhost:3001/api/characters"
        );
        setCharState((prevState) => ({
          ...prevState,
          characters,
        }));
      } catch (error) {
        console.error(error);
      }
    };
    getAppData();

    // set up auth observer
    auth.onAuthStateChanged(user => setUserState(user));
  }, []);

  return (
    <>
      <Header user={userState} />
      {charState.characters.data.map((char, idx) => (
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
