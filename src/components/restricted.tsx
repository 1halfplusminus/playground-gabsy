import { RouteComponentProps } from "@reach/router";
import React from "react";
import { useEffect } from "react";
import { AuthStatus } from "../containers/auth";

export type RestrictedProps = RouteComponentProps & {
  render: (props: RouteComponentProps) => React.ReactNode
  loggedIn: boolean
  authStatus: AuthStatus,
};
export const Restricted = function(props: RestrictedProps) {
  const { location, render, navigate, loggedIn, authStatus } = props;
  useEffect(() => {
    const noOnLoginPage = location.pathname !== `/app/login`;
    if (authStatus === "not_logged" && noOnLoginPage) {
      navigate("/app/login");
    }
  }, [authStatus]);
  return loggedIn ? <>{render(props)}</> : <div> Login ....</div>;
};
