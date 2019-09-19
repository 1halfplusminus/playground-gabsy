import { RouteComponentProps } from "@reach/router";
import React, { Props, ReactNode, useState } from "react";
import { useEffect } from "react";
import { isLoggedIn } from "../services/auth";

export type RestrictedProps = RouteComponentProps & {
  render: (props: RouteComponentProps) => React.ReactNode
  loggedIn: boolean,
};
export const Restricted = function(props: RestrictedProps) {
  const { location, render, navigate, loggedIn } = props;
  useEffect(() => {
    const noOnLoginPage = location.pathname !== `/app/login`;
    if (!loggedIn && noOnLoginPage) {
      navigate("/app/login");
    }
  }, [loggedIn]);
  return loggedIn ? <>{render(props)}</> : null;
};
