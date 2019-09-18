import { RouteComponentProps } from "@reach/router";
import React from "react";
import { getUser } from "../services/auth";

const Profile = (props: RouteComponentProps) => (
  <>
    <h1>Your profile</h1>
    <ul>
      <li>Name: {getUser().name}</li>
      <li>E-mail: {getUser().email}</li>
    </ul>
  </>
);
export default Profile;
