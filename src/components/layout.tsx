import { css } from "@emotion/core";
import { graphql, Link, useStaticQuery } from "gatsby";
import React from "react";
import { rhythm } from "../utils/typography";
export default ({ children }) => {
  const data = useStaticQuery<{ site: { siteMetadata: { title: string } } }>(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `,
  );
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
      <Link to={`/`}>
        <h3
          css={css`
            margin-bottom: ${rhythm(2)};
            display: inline-block;
            font-style: normal;
          `}
        >
          {data.site.siteMetadata.title}
        </h3>
      </Link>
      <Link
        to={`/about/`}
        css={css`
          float: right;
        `}
      >
        À propos
      </Link>
      {children}
    </div>
  );
};
