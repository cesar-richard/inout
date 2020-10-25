import React, { useState } from "react";
import { Input } from "semantic-ui-react";
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
        Room id : {roomId}
        <Input
          name="idRoom"
          id="roomSelectorInput"
          type="text"
          placeholder="Id"
          onChange={v => setRoomId}
        />
      </label>
      <input type="submit" value="Aller à la room" />
    </form>
  );
}
