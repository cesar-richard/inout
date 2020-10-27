import React, { useState } from "react";
import { Button, Card, Input } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

export default function Home() {
  let history = useHistory();
  const [roomId, setRoomId] = useState("");
  function handleSubmit(e) {
    history.push(`/rooms/${roomId}`);
    e.preventDefault();
  }

  return (
    <Card>
      <Card.Content>
        <form onSubmit={handleSubmit}>
          <label>
            Id du compteur :
            <Input
              name="idRoom"
              id="roomSelectorInput"
              type="text"
              placeholder="Compteur"
              onChange={(e, { value }) => setRoomId(value)}
            />
          </label>
          <Button primary>Aller au compteur</Button>
        </form>
      </Card.Content>
    </Card>
  );
}
