import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import Form from "../components/form";
import FooterContainer from "../containers/footer";
import HeaderContainer from "../containers/header";
import { BROWSE, SIGN_IN } from "../constants/routes";
import { FirebaseContext } from "../context/firebase";

const Signup = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isInvalid = firstName === "" || password === "" || email === "";
  const handleSignUp = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        return result.user.updateProfile({
          displayName: firstName,
          photoURL: Math.floor(Math.random() * 5) + 1,
        });
      })
      .then(() => {
        history.push(BROWSE);
      })
      .catch((err) => {
        setError(err.message);
      });
  };
  return (
    <>
      <HeaderContainer>
        <Form>
          <Form.Title>Sign Up</Form.Title>
          {error && <Form.Error>{error}</Form.Error>}

          <Form.Base onSubmit={handleSignUp} method="POST">
            <Form.Input
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Form.Input
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Input
              type="password"
              placeholder="Password"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Submit
              disabled={isInvalid}
              type="submit"
              data-testid="sign-up"
            >
              Sign Up
            </Form.Submit>
          </Form.Base>

          <Form.Text>
            Already a user? <Form.Link to={SIGN_IN}>Sign in now.</Form.Link>
          </Form.Text>

          <Form.TextSmall>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. Learn more.
          </Form.TextSmall>
        </Form>
      </HeaderContainer>
      <FooterContainer />
    </>
  );
};

export default Signup;
