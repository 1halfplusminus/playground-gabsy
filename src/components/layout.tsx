import { css } from "@emotion/core";
import React, { PropsWithChildren } from "react";
import { rhythm } from "../utils/typography";
import Navbar from "./nav-bar";

export interface LayoutProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}
export default ({
  children,
  isLoggedIn,
  onLogout,
}: PropsWithChildren<LayoutProps>) => {
  return (
    <div
      css={css`
        margin: 0 auto;
        max-width: 700px;
        padding: ${rhythm(1)};
        padding-top: ${rhythm(1.5)};
        @media (max-width: 360px) {
          padding: ${rhythm(1)};
          padding-top: ${rhythm(0.5)};
        }
        height: 100%;
      `}
    >
      <Navbar isLoggedIn={isLoggedIn} onLogout={onLogout} />
      {children}
    </div>
  );
};
