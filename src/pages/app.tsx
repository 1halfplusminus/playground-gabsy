import { Router } from "@reach/router";
import { navigate } from "gatsby";
import React, { useState } from "react";
import Layout from "../components/layout";
import Login from "../components/login";
import Profile from "../components/profil";
import { Restricted } from "../components/restricted";
import { useAuth } from "../containers/auth";
import ConnectedLayout from "../containers/layout";
import firebase from "../services/firebase";

const App = () => {
  const [submitting, setSubmitting] = useState(false);
  return (
    <ConnectedLayout
      renderChildren={({ isLoggedIn, authStatus, handleSignIn }) => {
        return (
          <Router>
            <Restricted
              loggedIn={isLoggedIn}
              authStatus={authStatus}
              path="/app/profil"
              render={(props) => <Profile {...props} />}
            />
            <Login
              handleLogin={async () => {
                await handleSignIn("google");
                setSubmitting(false);
              }}
              setSubmitting={setSubmitting}
              isSubmitting={submitting}
              isLoggedIn={isLoggedIn}
              authStatus={authStatus}
              navigate={navigate}
              path="/app/login"
            />
          </Router>
        );
      }}
    />
  );
};
export default App;
