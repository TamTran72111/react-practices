import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";

import * as ROUTES from "./constants/routes";
import { IsUserRedirect, ProtectedRoute } from "./helpers/routes";
import useAuthListener from "./hooks/user-auth-listener";
import Browse from "./pages/browse";
import Home from "./pages/home";
import Signin from "./pages/signin";
import Signup from "./pages/signup";

function App() {
  const { user } = useAuthListener();

  return (
    <BrowserRouter>
      <Switch>
        <IsUserRedirect
          exact
          path={ROUTES.SIGN_IN}
          loggedInPath={ROUTES.BROWSE}
          user={user}
        >
          <Signin />
        </IsUserRedirect>
        <IsUserRedirect
          exact
          path={ROUTES.SIGN_UP}
          loggedInPath={ROUTES.BROWSE}
          user={user}
        >
          <Signup />
        </IsUserRedirect>
        <ProtectedRoute exact path={ROUTES.BROWSE} user={user}>
          <Browse />
        </ProtectedRoute>
        <IsUserRedirect
          exact
          loggedInPath={ROUTES.BROWSE}
          user={user}
          path={ROUTES.HOME}
        >
          <Home />
        </IsUserRedirect>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
