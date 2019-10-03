import { Router } from "@reach/router";
import { navigate } from "gatsby";
import React, { useState } from "react";
import Login from "../components/login";
import Profile from "../components/profil";
import { Restricted } from "../components/restricted";
import ConnectedLayout from "../containers/layout";

const App = () => {
  const [submitting, setSubmitting] = useState(false);
  return (
    <ConnectedLayout
      renderChildren={({ isLoggedIn, authStatus, handleSignIn, user }) => {
        return (
          <Router>
            <Restricted
              loggedIn={isLoggedIn}
              authStatus={authStatus}
              path="/app/profil"
              render={(props) => (
                <Profile {...props} name={user.name} email={user.email} />
              )}
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
