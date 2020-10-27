import React, { useCallback, useEffect, useState } from "react";
import { Button, Card, Icon } from "semantic-ui-react";
import axios from "axios";
import Home from "./Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

function Counter() {
  let { idRoom } = useParams();
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);

  var displayFreshCount = useCallback(() => {
    axios
      .get(`https://inout-api.crichard.fr/rooms/${idRoom}`)
      .then(({ data }) => {
        handleDatas(data);
      });
  }, [idRoom]);

  const handleDatas = data => {
    const inside = data.filter(x => x._id === "in")[0];
    const outside = data.filter(x => x._id === "out")[0];
    setCount((inside ? inside.count : 0) - (outside ? outside.count : 0));
    setTotal(inside ? inside.count : 0);
  };

  const handleIncrement = () => {
    setCount(count + 1);
    axios
      .post(`https://inout-api.crichard.fr/rooms/${idRoom}`, {
        kind: "in",
        value: 1
      })
      .then(({ data }) => {
        handleDatas(data);
      });
  };

  const handleDecrement = () => {
    setCount(count - 1);
    axios
      .post(`https://inout-api.crichard.fr/rooms/${idRoom}`, {
        kind: "out",
        value: 1
      })
      .then(({ data }) => {
        handleDatas(data);
      });
  };
  useEffect(() => {
    var timeout_id;
    const refreshCount = force => {
      if (force) {
        displayFreshCount();
      }
      timeout_id = setTimeout(() => {
        displayFreshCount();
        refreshCount(false);
      }, 5000);
    };
    refreshCount(true);
    return () => {
      clearTimeout(timeout_id);
      displayFreshCount();
    };
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

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Sélectionner une room</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/rooms/:idRoom" component={Counter} />
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
