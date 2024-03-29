// import methods
import { useState, useEffect } from "react";
import { auth } from "./services/firebase";
import { fetchChars } from "./services/char-backend-service";
import { Container, Row, Col } from "reactstrap";

// import components
import Header from "./components/Header/Header";
import Welcome from "./components/Welcome/Welcome";
import CharacterSelect from "./components/CharacterSelect/CharacterSelect";
import Game from "./components/Game/Game";
import Footer from "./components/Footer/Footer"

import "./App.css";

export default function App() {
  // ------- STATES -----------------------------------------------------------
  // state used to store logged-in user and active page on app
  const [userState, setUserState] = useState({
    user: null,
  });
  // state used to store characters on character select
  const [charState, setCharState] = useState({
    characters: [],
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
        charState={charState}
        setCharState={setCharState}
        userState={userState}
        playerState={playerState}
        setPlayerState={setPlayerState}
      />
    ),
    Game: (
      <Game
        userState={userState}
        playerState={playerState}
        setPlayerState={setPlayerState}
        setCharState={setCharState}
      />
    ),
  };

  // grab character select list on login / logout
  useEffect(() => {
    const getAppData = async () => {
      if (!userState.user) return;
      try {
        const charactersData = await fetchChars(userState.user.uid);
        setCharState((prevState) => ({
          ...prevState,
          characters: charactersData.data,
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
    <div className="body">
      <Header user={userState.user} setPlayerState={setPlayerState} />
      <Container className="main">
        <Row>
          <Col>
            {/* render app based on whether user's status */}
            {!userState.user && componentsObj.Welcome}
            {userState.user &&
              !playerState.character &&
              componentsObj.CharacterSelect}
            {userState.user && playerState.character && componentsObj.Game}
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}
