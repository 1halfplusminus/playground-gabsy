import { Router } from "@reach/router";
import React from "react";
import Layout from "../components/layout";
import Login from "../components/login";
import Profile from "../components/profil";
import { Restricted } from "../components/restricted";
import { useAuth } from "../containers/auth";
import firebase from "../services/firebase";

const App = () => {
  const { handleSignIn, handleSignOut, uid, authStatus } = useAuth(firebase);
  return (
    <Layout>
      <Router>
        <Restricted
          loggedIn={authStatus === "logged"}
          path="/app/profil"
          render={(props) => <Profile {...props} />}
        />
        <Login path="/app/login" />
      </Router>
    </Layout>
  );
};
export default App;
