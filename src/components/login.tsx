import React, { cloneElement, ReactElement, useEffect, useState } from "react";
import styled from "styled-components";
import { AuthStatus } from "../containers/auth";
import Google from "./icons/google.component";

export const useRedirectIfNotLogged = ({
  isLoggedIn,
  navigate,
}: {
  isLoggedIn: boolean
  navigate: (path: string) => void,
}) => {
  useEffect(() => {
    if (isLoggedIn) {
      navigate(`/app/profil`);
    }
  }, []);
};
const Container = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 5px 10px;
  color: white;
  border: none;
  font-family: Roboto, sans-serif;
  font-size: 16px;
  background-color: #90a4ae;
  cursor: pointer;
  transition: color 200ms linear;
  &:hover {
    background-color: #263238;
  }
`;

export interface SignInProps {
  onClick: () => void;
  icon: ReactElement;
  text: string;
}

const SignInButton = ({ onClick, icon, text }: SignInProps) => {
  return (
    <Container onClick={onClick}>
      {icon && cloneElement(icon)}
      <span>{text}</span>
    </Container>
  );
};
export interface LoginProps {
  handleLogin: ({
    username,
    password,
  }: {
    username: string
    password: string,
  }) => void;
  navigate: (path: string) => void;
  isLoggedIn: boolean;
  authStatus: AuthStatus;
  path?: string;
  isSubmitting: boolean;
  setSubmitting: (submitting: boolean) => void;
}
export const Login = ({
  handleLogin,
  navigate,
  isLoggedIn,
  setSubmitting,
  isSubmitting,
}: LoginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit: (
    event: React.FormEvent<HTMLFormElement>,
  ) => void = () => {
    event.preventDefault();
    setSubmitting(true);
    handleLogin({ username, password });
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
  useEffect(() => {
    if (isLoggedIn === true) {
      navigate(`/app/profil`);
    }
  }, [isLoggedIn]);
  return !isLoggedIn ? (
    /*  <>
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
        <input type="submit" value="Log In" disabled={isSubmitting} />
      </form>
    </> */
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        flex: 1,
        alignContent: "center",
        alignItems: "center",
        marginTop: "50px",
      }}
    >
      <SignInButton
        icon={<Google />}
        onClick={() => {
          setSubmitting(true);
          handleLogin({ username, password });
        }}
        text="Se connecter avec Google"
      />
    </div>
  ) : null;
};

export default Login;
