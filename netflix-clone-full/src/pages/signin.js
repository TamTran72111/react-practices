import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import Form from "../components/form";
import FooterContainer from "../containers/footer";
import HeaderContainer from "../containers/header";
import { SIGN_UP, BROWSE } from "../constants/routes";
import { FirebaseContext } from "../context/firebase";

const Signin = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isInvalid = password === "" || email === "";
  const handleSignIn = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
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
          <Form.Title>Sign In</Form.Title>
          {error && <Form.Error>{error}</Form.Error>}

          <Form.Base onSubmit={handleSignIn} method="POST">
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
              data-testid="sign-in"
            >
              Sign In
            </Form.Submit>
          </Form.Base>

          <Form.Text>
            New to Netflix? <Form.Link to={SIGN_UP}>Sign up now.</Form.Link>
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

export default Signin;
