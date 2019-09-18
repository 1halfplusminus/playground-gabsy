import { RouteComponentProps } from "@reach/router";
import { navigate } from "gatsby";
import React, { useEffect, useState } from "react";
import { handleLogin, isLoggedIn } from "../services/auth";

export const useRedirectIfNotLogged = () => {
  useEffect(() => {
    if (isLoggedIn()) {
      navigate(`/app/profil`);
    }
  }, []);
};

export const Login = (props: RouteComponentProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit: (
    event: React.FormEvent<HTMLFormElement>,
  ) => void = () => {
    event.preventDefault();
    handleLogin({ username, password });
    navigate(`/app/profil`);
  };
  const changeUsername: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void = (e) => {
    setUsername(e.target.value);
  };
  const changePassword: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void = (e) => {
    setPassword(e.target.value);
  };
  return (
    <>
      <h1>Log in</h1>
      <form method="post" onSubmit={handleSubmit}>
        <label>
          Username
          <input
            type="text"
            name="username"
            onChange={changeUsername}
            value={username}
          />
        </label>
        <label>
          Password
          <input
            value={password}
            type="password"
            name="password"
            onChange={changePassword}
          />
        </label>
        <input type="submit" value="Log In" />
      </form>
    </>
  );
};

export default Login;
