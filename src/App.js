// import methods
import { useState, useEffect } from "react";
import { auth } from "./services/firebase";
import { fetchChars } from "./services/char-service";

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
      if (!userState) return;
      try {
        console.log("calling fetchChars");
        const characters = await fetchChars();
        setCharState((prevState) => ({
          ...prevState,
          characters,
        }));
      } catch (error) {
        console.error(error);
      }
    };
    console.log("calling getAppData");
    getAppData();

    // set up auth observer
    const unsubscribe = auth.onAuthStateChanged(user => setUserState(user));
    // function to clean up subscriptions
    return () => unsubscribe();

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
