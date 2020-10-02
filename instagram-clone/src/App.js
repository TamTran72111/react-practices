import React, { useEffect, useState } from "react";
import "./App.css";
import Post from "./Post";
import { db, auth } from "./firebase";
import {
  Backdrop,
  Button,
  Fade,
  Input,
  makeStyles,
  Modal,
} from "@material-ui/core";
import InstagramEmbed from "react-instagram-embed";
import ImageUpload from "./ImageUpload";

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
    width: 400,
  },
}));

function App() {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const signUp = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: username,
        });
        console.log(username);
      })
      .catch((err) => alert(err.message));
    setOpen(false);
  };

  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((err) => alert(err.message));
    setOpenSignIn(false);
  };

  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user has logged in
        setUser(authUser);
      } else {
        // user has logged out
        setUser(null);
      }
    });

    return () => {
      unsubcribe();
    };
  }, [user]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
        );
      });
  }, []);
  return (
    <div className="App">
      <Modal
        className={classes.modal}
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openSignIn}>
          <div className={classes.paper}>
            <form className="app__signUp">
              <center>
                <img
                  src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                  alt="Instagram brand"
                  className="app__headerImage"
                />
              </center>

              <Input
                placeholder="Email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" onClick={signIn}>
                Sign In
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>

      <Modal
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <form className="app__signUp">
              <center>
                <img
                  src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                  alt="Instagram brand"
                  className="app__headerImage"
                />
              </center>

              <Input
                placeholder="Username"
                type="te</div>xt"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                placeholder="Email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" onClick={signUp}>
                Sign up
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>

      <div className="app__header">
        <img
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="Instagram brand"
          className="app__headerImage"
        />
        {user ? (
          <Button onClick={() => auth.signOut()}>Logout</Button>
        ) : (
          <div className="app__loginContainer">
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
            <Button onClick={() => setOpen(true)}>Sign up</Button>
          </div>
        )}
      </div>

      <div className="app__posts">
        <div className="app__postsLeft">
          {posts.map(({ id, post }) => (
            <Post key={id} user={user} postId={id} {...post} />
          ))}
        </div>
        <div className="app__postsRight">
          <InstagramEmbed
            url="https://instagr.am/p/Zw9o4/"
            maxWidth={320}
            hideCaption={false}
            containerTagName="div"
            protocol=""
          />
        </div>
      </div>

      {user && <ImageUpload username={user.displayName} />}
    </div>
  );
}

export default App;
