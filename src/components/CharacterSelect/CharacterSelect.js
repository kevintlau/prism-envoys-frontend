import "./CharacterSelect.css";
import generateStats from "../../gamedata/startingStats";
import {
  createChar,
  selectChar,
  deleteChar,
} from "../../services/char-backend-service";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardTitle,
  CardText,
} from "reactstrap";

// props:
//   charState, setCharState,
//   userState,
//   playerState, setPlayerState

export default function CharacterSelect(props) {
  const newChar = props.charState.newChar;

  // create the new character form using controlled components
  const handleChange = (evt) => {
    props.setCharState((prevState) => ({
      ...prevState,
      newChar: {
        ...prevState.newChar,
        [evt.target.name]: evt.target.value,
      },
    }));
  };

  const handleSubmit = async (evt) => {
    if (!props.userState.user) return;
    evt.preventDefault();
    // populate new character object with stats and user id
    const startingStats = generateStats(newChar.class);
    let submittedChar = {
      ...newChar,
      ...startingStats,
      uid: props.userState.user.uid,
    };
    // create new character in database
    try {
      const createdChar = await createChar(submittedChar);
      props.setCharState((prevState) => ({
        ...prevState,
        characters: [...prevState.characters, createdChar.data],
        // reset new character form
        newChar: {
          name: "",
          race: "Human",
          class: "Crusader",
        },
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelect = async (charId) => {
    if (!props.userState.user) return;
    try {
      // load character into playerState
      const characterData = await selectChar(charId, props.userState.user.uid);
      props.setPlayerState((prevState) => ({
        ...prevState,
        character: characterData.data,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (charId) => {
    if (!props.userState.user) return;
    try {
      // delete character and update the charState without the deleted character
      const charactersData = await deleteChar(charId, props.userState.user.uid);
      props.setCharState((prevState) => ({
        ...prevState,
        characters: charactersData.data,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="char-select">
      <Container>
        <Row>
          <Col>
            <h3 className="text-center my-4">Character Select</h3>
          </Col>
        </Row>

        <Row className="char-list">
          {props.charState.characters.map((char) => (
            <Col sm="4" className="mb-4" key={char._id}>
              <Card body>
                <CardTitle tag="h5" className="mb-2">
                  {char.name}
                </CardTitle>
                <CardText className="mb-1">
                  Level {char.level} {char.race} {char.class}
                </CardText>
                <CardText className="mb-2">Location: {char.location}</CardText>
                <Row>
                  <Col>
                    <Button
                      className="w-100"
                      color="primary"
                      onClick={() => handleSelect(char._id)}
                    >
                      Play
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      className="w-100"
                      color="danger"
                      onClick={() => handleDelete(char._id)}
                    >
                      Delete
                    </Button>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}

          <Col sm="4" className="mb-4">
            <Card body>
              <CardTitle tag="h5" >
                Create New Character
              </CardTitle>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label htmlFor="name">Name:</Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    value={newChar.name}
                    onChange={handleChange}
                    className="mb-2"
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="race">Race:</Label>
                  <Input
                    type="select"
                    name="race"
                    id="race"
                    value={newChar.race}
                    onChange={handleChange}
                    className="mb-2"
                  >
                    <option value="Human">Human</option>
                    <option value="Giant">Giant</option>
                    <option value="Elf">Elf</option>
                    <option value="Dwarf">Dwarf</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="class">Class:</Label>
                  <Input
                    type="select"
                    name="class"
                    id="class"
                    value={newChar.class}
                    onChange={handleChange}
                    className="mb-3"
                  >
                    <option value="Crusader">Crusader (durable fighter)</option>
                    <option value="Inquisitor">
                      Inquisitor (agile ranger)
                    </option>
                    <option value="Shepherd">Shepherd (powerful caster)</option>
                  </Input>
                </FormGroup>
                <Button color="success" disabled={!props.userState.user}>
                  Create character
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
