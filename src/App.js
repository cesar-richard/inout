import React, { useCallback, useEffect, useState } from "react";
import { Button, Card, Icon } from "semantic-ui-react";
import axios from "axios";

function App() {
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);

  const displayFreshCount = useCallback(() => {
    axios.get("https://inout-api.crichard.fr/").then(({ data }) => {
      handleDatas(data);
    });
  }, []);

  const handleDatas = data => {
    if (data.length === 0) return;
    const inside = data.filter(x => x._id === "in")[0].count;
    const outside = data.filter(x => x._id === "out")[0].count;
    setCount(inside - outside);
    setTotal(inside);
  };

  const handleIncrement = () => {
    setCount(count + 1);
    axios
      .post("https://inout-api.crichard.fr/", { kind: "in", value: 1 })
      .then(({ data }) => {
        handleDatas(data);
      });
  };

  const handleDecrement = () => {
    setCount(count - 1);
    axios
      .post("https://inout-api.crichard.fr/", { kind: "out", value: 1 })
      .then(({ data }) => {
        handleDatas(data);
      });
  };
  useEffect(() => {
    const refreshCount = force => {
      if (force) {
        displayFreshCount();
      }
      setTimeout(() => {
        displayFreshCount();
        refreshCount(false);
      }, 5000);
    };
    refreshCount(true);
  }, [displayFreshCount]);

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
          {count} (total {total})
        </Card.Header>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Button.Group style={{ width: "100%" }}>
            <Button key="minus" negative onClick={handleDecrement}>
              <Icon name="minus circle" />
            </Button>
            <Button.Or />
            <Button key="plus" positive onClick={handleIncrement}>
              <Icon name="plus circle" />
            </Button>
          </Button.Group>
        </div>
      </Card.Content>
    </Card>
  );
}

export default App;
