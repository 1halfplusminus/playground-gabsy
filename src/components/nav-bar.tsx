import { css } from "@emotion/core";
import { graphql, Link, navigate, useStaticQuery } from "gatsby";
import React from "react";
import { rhythm } from "../utils/typography";

export interface NavbarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}
const Navbar = ({ isLoggedIn, onLogout }: NavbarProps) => {
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
        <Link to="/app/profil/">Espace membre </Link>
        {` `}
        {isLoggedIn ? (
          <a
            href="/"
            onClick={(event) => {
              event.preventDefault();
              onLogout();
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
