import { graphql } from "gatsby";
import React from "react";
import Layout from "../components/layout";
import ConnectedLayout from "../containers/layout";

export interface IndexProps {
  data: {
    site: {
      siteMetadata: {
        title: string,
      },
    },
  };
}

export default ({ data }: IndexProps) => (
  <ConnectedLayout
    renderChildren={() => (
      <>
        <h1> À propos {data.site.siteMetadata.title}</h1>
        <p>
          Nous sommes le seul site fonctionnant sur votre ordinateur à afficher
          les meilleures photos et vidéos de mon chiot mangeant beaucoup de
          nourriture.
        </p>
      </>
    )}
  />
);

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
