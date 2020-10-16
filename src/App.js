import React, { useState } from "react";
import { Button, Card, Icon } from "semantic-ui-react";

function App() {
  const [count, setCount] = useState(0);
  const handleIncrement = () => {
    setCount(count + 1);
  };
  const handleDecrement = () => {
    setCount(count - 1);
  };
  return (
    <Card style={{ width: "100%", height: "100%" }}>
      <Card.Content style={{ width: "100%" }}>
        <Card.Header
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            fontSize: "xx-large"
          }}
        >
          {count}
        </Card.Header>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Button.Group style={{ width: "100%" }}>
            <Button negative onClick={handleDecrement}>
              <Icon name="minus circle" />
            </Button>
            <Button.Or />
            <Button positive onClick={handleIncrement}>
              <Icon name="plus circle" />
            </Button>
          </Button.Group>
        </div>
      </Card.Content>
    </Card>
  );
}

export default App;
