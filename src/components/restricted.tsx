import { RouteComponentProps } from "@reach/router";
import React, { Props, ReactNode, useState } from "react";
import { useEffect } from "react";
import { isLoggedIn } from "../services/auth";

export type RestrictedProps = RouteComponentProps & {
  render: (props: RouteComponentProps) => React.ReactNode,
};
export const Restricted = function(props: RestrictedProps) {
  const { location, render, navigate } = props;
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    const noOnLoginPage = location.pathname !== `/app/login`;
    setIsLogged(isLoggedIn());
    if (!isLoggedIn() && noOnLoginPage) {
      navigate("/app/login");
    }
  }, [isLogged]);
  return isLogged ? <>{render(props)}</> : null;
};
