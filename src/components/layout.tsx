import { css } from "@emotion/core";
import React from "react";
import { rhythm } from "../utils/typography";
import Navbar from "./nav-bar";

export default ({ children }) => {
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
      `}
    >
      <Navbar />
      {children}
    </div>
  );
};
