import React, { useState } from "react";
import { Button, Input } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

export default function Home() {
  let history = useHistory();
  const [roomId, setRoomId] = useState("");
  function handleSubmit(e) {
    history.push(`/rooms/${roomId}`);
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Room id :
        <Input
          name="idRoom"
          id="roomSelectorInput"
          type="text"
          placeholder="Id"
          onChange={(e, { value }) => setRoomId(value)}
        />
      </label>
      <Button primary>Aller à la room</Button>
    </form>
  );
}
