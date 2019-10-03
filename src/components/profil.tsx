import { RouteComponentProps } from "@reach/router";
import React from "react";
import { getUser } from "../services/auth";

export interface ProfileProps {
  name: string;
  email: string;
}

const Profile = ({ email, name }: RouteComponentProps<ProfileProps>) => (
  <>
    <h1>Your profile</h1>
    <ul>
      <li>Name: {name}</li>
      <li>E-mail: {email}</li>
    </ul>
  </>
);
export default Profile;
