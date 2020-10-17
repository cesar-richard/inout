import React, { useEffect, useState } from "react";
import { Button, Card, Icon } from "semantic-ui-react";
import axios from "axios";

function App() {
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  const refreshCount = () => {
    setTimeout(() => {
      axios.get("http://37.187.114.131/").then(({ data }) => {
        const inside = data.filter(x => x._id === "in")[0].count;
        const outside = data.filter(x => x._id === "out")[0].count;
        setCount(inside - outside);
        setTotal(inside);
        refreshCount();
      });
    }, 5000);
  };
  const handleIncrement = () => {
    setCount(count + 1);
    axios
      .post("http://37.187.114.131/", { kind: "in", value: 1 })
      .then(({ data }) =>
        setCount(
          data.filter(x => x._id === "in")[0].count -
            data.filter(x => x._id === "out")[0].count
        )
      );
  };

  const handleDecrement = () => {
    setCount(count - 1);
    axios
      .post("http://37.187.114.131/", { kind: "out", value: 1 })
      .then(({ data }) => {
        setCount(
          data.filter(x => x._id === "in")[0].count -
            data.filter(x => x._id === "out")[0].count
        );
      });
  };
  useEffect(() => {
    async function fetchData() {
      axios.get("http://37.187.114.131/").then(({ data }) => {
        setCount(
          data.filter(x => x._id === "in")[0].count -
            data.filter(x => x._id === "out")[0].count
        );
        refreshCount();
      });
    }
    fetchData();
  });

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
