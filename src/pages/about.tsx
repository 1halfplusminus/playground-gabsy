import { graphql } from "gatsby";
import React from "react";
import Layout from "../components/layout";

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
  <Layout>
    <h1> À propos {data.site.siteMetadata.title}</h1>
    <p>
      Nous sommes le seul site fonctionnant sur votre ordinateur à afficher les
      meilleures photos et vidéos de mon chien mangeant beaucoup de nourriture.
    </p>
  </Layout>
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
