import "./StatusPanel.css";
import { Container, Row, Col, Card, CardTitle, CardText } from "reactstrap";

export default function StatusPanel(props) {
  return (
    <Container className="player-panel">
      <Row>
        <Col>
          <h4 className="text-center my-4">Results</h4>
        </Col>
      </Row>
      {props.enemy && (
        <Row className="mb-3">
          <Col>
            <Card body>
              <CardTitle tag="h5" className="mb-2">
                {props.enemy.name}
              </CardTitle>
              <CardText className="mb-1">
                <strong>Health:</strong> {props.enemy.currentHp}
              </CardText>
              <CardText>
                <strong>Attack Strength:</strong> {props.enemy.atk}
              </CardText>
            </Card>
          </Col>
        </Row>
      )}
      <Row>
        <Col>
          <Card body>
            <CardText>{props.resultState}</CardText>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
