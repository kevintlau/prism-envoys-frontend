// import methods
import { useState, useEffect } from "react";
import { auth } from "./services/firebase";
import { fetchChars } from "./services/char-service";
import Welcome from "./components/Welcome/Welcome";
import CharacterSelect from "./components/CharacterSelect/CharacterSelect";

// import stylesheets
import "./App.css";

// import components
import Header from "./components/Header/Header";


export default function App() {

  // ------- STATES -----------------------------------------------------------
  // state used to store logged-in user and active page on app
  const [appState, setAppState] = useState({
    user: null,
    page: "Welcome",
  });

  // state used to store characters on character select
  const [charState, setCharState] = useState({
    characters: { data: [] },
    newChar: {
      name: "",
      race: "Human",
      class: "Crusader",
    },
  });
  
  // state used to store active character inside game
  const [playerState, setPlayerState] = useState({
    character: {}
  })
  
  // store the components into an object so they can be rendered based on state
  const componentsObj = {
    "Welcome": <Welcome />,
    "CharacterSelect": <CharacterSelect 
                          chars={ charState.characters.data } 
                          newChar={ charState.newChar }
                          setCharState={ setCharState }
                          user={appState.user}
                       />,
    // "Game": <Game />
  }

  useEffect(() => {
    const getAppData = async () => {
      if (!appState.user) return;
      try {
        const characters = await fetchChars(appState.user.uid);
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
    const unsubscribe = auth.onAuthStateChanged(user => {
      // user becomes user object on login, or null on logout
      if (user) {
        setAppState({ user, page: "CharacterSelect" });
      } else {
        setAppState({ user, page: "Welcome" })
      }
    });
    // function to clean up subscriptions
    return () => unsubscribe();

  }, [ appState.user ]);

  return (
    <>
      <Header
        user={ appState.user }
      />
      { componentsObj[appState.page] /* render component based on state */ }
    </>
  );
}
