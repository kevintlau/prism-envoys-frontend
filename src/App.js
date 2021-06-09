// import methods
import { useState, useEffect } from "react";
import { auth } from "./services/firebase";
import { fetchChars } from "./services/char-service";

// import stylesheets
import "./App.css";

// import components
import Header from "./components/Header/Header";
import Welcome from "./components/Welcome/Welcome";
import CharacterSelect from "./components/CharacterSelect/CharacterSelect";
import Game from "./components/Game/Game";

export default function App() {
  // ------- STATES -----------------------------------------------------------
  // state used to store logged-in user and active page on app
  const [userState, setUserState] = useState({
    user: null,
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
    character: null,
  });

  // store the components into an object so they can be rendered based on state
  const componentsObj = {
    Welcome: <Welcome />,
    CharacterSelect: (
      <CharacterSelect
        chars={charState.characters.data}
        newChar={charState.newChar}
        setCharState={setCharState}
        userState={userState}
        playerState={playerState}
        setPlayerState={setPlayerState}
      />
    ),
    Game: <Game playerState={playerState} setPlayerState={setPlayerState} />,
  };

  useEffect(() => {
    const getAppData = async () => {
      if (!userState.user) return;
      try {
        const characters = await fetchChars(userState.user.uid);
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
    // user becomes user object on login, or null on logout
    const unsubscribe = auth.onAuthStateChanged((user) =>
      setUserState({ user })
    );
    // function to clean up subscriptions
    return () => unsubscribe();
  }, [userState.user]);

  return (
    <>
      <Header user={userState.user} setPlayerState={setPlayerState} />
      {/* render app based on whether user's status */}
      {!userState.user // not logged in
        ? componentsObj.Welcome
        : ""}
      {userState.user && !playerState.character // logged in but not in game
        ? componentsObj.CharacterSelect
        : ""}
      {userState.user && playerState.character // logged in and in game
        ? componentsObj.Game
        : ""}
    </>
  );
}
