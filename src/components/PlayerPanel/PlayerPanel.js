import "./PlayerPanel.css";
import { saveChar, deleteChar } from "../../services/char-backend-service";
import { Container, Row, Col, Card, CardText, Button } from "reactstrap";

export default function PlayerPanel(props) {
  const character = props.character;

  const handleSave = async (evt) => {
    if (!props.userState.user) return;
    evt.preventDefault();
    try {
      const charactersData = await saveChar(character);
      props.setCharState((prevState) => ({
        ...prevState,
        characters: charactersData.data,
      }));
      // go back to character select
      props.setPlayerState({ character: null });
    } catch (error) {
      console.error(error);
    }
  };

  // same as handleDelete function in
  // TODO: refactor code to make it more DRY
  const handleDie = async (charId) => {
    if (!props.userState.user) return;
    try {
      const charactersData = await deleteChar(charId, props.userState.user.uid);
      props.setCharState((prevState) => ({
        ...prevState,
        characters: charactersData.data,
      }));
      props.setPlayerState({ character: null });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="player-panel">
      <Row>
        <Col>
          <h4 className="text-center my-4">
            <strong>{character.name}</strong>,{" "}
            {character.race} {character.class}
          </h4>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card body>
            <CardText className="mb-1">
              <strong>Level:</strong> {character.level}
            </CardText>
            <CardText className="mb-1">
              <strong>Experience:</strong> {character.xp}
            </CardText>
            <CardText className="mb-1">
              <strong>Health:</strong> {character.currentHp} / {character.maxHp}
            </CardText>
            <CardText className="mb-1">
              <strong>Energy:</strong> {character.currentMp} / {character.maxMp}
            </CardText>
            <CardText className="mb-1">
              <strong>Attack Strength:</strong> {character.atk}
            </CardText>
            <CardText className="mb-1">
              <strong>Armor Rating:</strong> {character.def}
            </CardText>
            <CardText>
              <strong>Location:</strong> <u>{character.location}</u>
            </CardText>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          {props.character.currentHp <= 0 && (
            <Button
              className="w-100"
              color="danger"
              onClick={() => handleDie(props.character._id)}
            >
              Delete and Exit
            </Button>
          )}
          {!props.enemy && (
            <Button className="w-100" color="success" onClick={handleSave}>
              Save and Exit
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
}
