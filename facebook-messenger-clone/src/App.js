import { FormControl, IconButton, Input } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import SendIcon from "@material-ui/icons/Send";
import "./App.css";
import db from "./firebase";
import Message from "./Message";

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    setUsername(prompt("Please enter your name"));
  }, []);

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      });
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("messages").add({
      username,
      message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setMessage("");
  };
  return (
    <div className="App">
      <img
        src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100"
        alt="Messenger logo"
      />
      <h1>Welcome to a clone of Facebook Messenger</h1>
      <form className="app__form">
        <FormControl className="app__formControl">
          <Input
            placeholder="Enter a message"
            value={message}
            className="app__input"
            onChange={(e) => setMessage(e.target.value)}
          />
          <IconButton
            variant="contained"
            color="primary"
            type="submit"
            onClick={sendMessage}
            disabled={!message}
            className="app__iconButton"
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>
      <FlipMove>
        {messages.map((message) => (
          <Message key={message.id} username={username} message={message} />
        ))}
      </FlipMove>
    </div>
  );
}

export default App;
