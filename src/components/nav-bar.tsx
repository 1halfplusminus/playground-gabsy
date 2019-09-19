import { css } from "@emotion/core";
import { graphql, Link, navigate, useStaticQuery } from "gatsby";
import React from "react";
import { getUser, isLoggedIn, logout } from "../services/auth";
import { rhythm } from "../utils/typography";

const linkCss = css`
  float: right;
`;
const Navbar = () => {
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
  const content = { message: "", login: true };
  if (isLoggedIn()) {
    content.message = `Bonjour, ${getUser().name}`;
  } else {
    content.message = "Vous n'êtes pas connecté";
  }
  return (
    <div
      style={{
        display: "flex",
        flex: "1",
        justifyContent: "space-between",
        borderBottom: "1px solid #d1c1e0",
      }}
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
      <span>{content.message}</span>
      <nav>
        <Link to="/">Accueil</Link>
        {` `}
        <Link to="/about/">À propos</Link>
        {` `}
        <Link to="/app/profil/">Profil</Link>
        {` `}
        {isLoggedIn() ? (
          <a
            href="/"
            onClick={(event) => {
              event.preventDefault();
              logout(() => navigate(`/app/login`));
            }}
          >
            Se déconnecter
          </a>
        ) : null}
      </nav>
    </div>
  );
};

export default Navbar;
