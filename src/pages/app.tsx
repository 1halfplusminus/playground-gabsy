import { Router } from "@reach/router";
import React from "react";
import Layout from "../components/layout";
import Login from "../components/login";
import Profile from "../components/profil";
import { Restricted } from "../components/restricted";
const App = () => (
  <Layout>
    <Router>
      <Restricted path="/app/profil" render={(props) => <Profile {...props} />} />
      <Login path="/app/login" />
    </Router>
  </Layout>
);
export default App;
