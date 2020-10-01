import {
  ListItem,
  ListItemText,
  Modal,
  Fade,
  Backdrop,
  makeStyles,
  Input,
  FormControl,
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import React, { useState } from "react";
import { db } from "./firebase";
import "./Todo.css";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Todo(props) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const handleOpen = () => {
    setOpen(true);
    setInput("");
  };
  const updateTodo = (e) => {
    e.preventDefault();
    db.collection("todos").doc(props.todo.id).set(
      {
        todo: input,
      },
      { merge: true }
    );
    setOpen(false);
  };
  return (
    <ListItem className="todo__item">
      <Modal
        open={open}
        onClose={(e) => setOpen(false)}
        className={classes.modal}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <form onSubmit={updateTodo}>
              <FormControl>
                <Input
                  className="app-input"
                  placeholder={props.todo.todo}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </FormControl>
              <EditIcon className="todo__icon" onClick={updateTodo} />
            </form>
          </div>
        </Fade>
      </Modal>
      {/* <List > */}
      <ListItemText primary={props.todo.todo} />
      <EditIcon className="todo__icon" onClick={handleOpen} />
      <DeleteForeverIcon
        className="todo__icon"
        onClick={(event) => db.collection("todos").doc(props.todo.id).delete()}
      />
    </ListItem>
  );
}

export default Todo;
