import css from "@emotion/css";
import { graphql, Link } from "gatsby";
import React from "react";
import Helmet from "react-helmet";
import Layout from "../components/layout";
import { rhythm } from "../utils/typography";

export interface IndexProps {
  data: Data;
}

export interface Data {
  allMarkdownRemark: AllMarkdownRemark;
}

export interface AllMarkdownRemark {
  totalCount: number;
  edges: Edge[];
}

export interface Edge {
  node: Node;
}

export interface Node {
  id: string;
  frontmatter: Frontmatter;
  excerpt: string;
  fields: {
    slug: string,
  };
}

export interface Frontmatter {
  title: string;
  date: string;
}

export default ({ data }: IndexProps) => (
  <Layout>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Mon chiot et moi</title>
    </Helmet>
    <div>
      <h1
        css={css`
          display: inline-block;
          border-bottom: 1px solid;
        `}
      >
        Super blog sur mon chiot
      </h1>
      <h4>{data.allMarkdownRemark.totalCount} Postes</h4>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <div key={node.id}>
          <Link
            to={node.fields.slug}
            css={css`
              text-decoration: none;
              color: inherit;
            `}
          >
            <h3
              css={css`
                margin-bottom: ${rhythm(1 / 4)};
              `}
            >
              {node.frontmatter.title}{" "}
              <span
                css={css`
                  color: #bbb;
                `}
              >
                — {node.frontmatter.date}
              </span>
            </h3>
            <p>{node.excerpt}</p>
          </Link>
        </div>
      ))}
    </div>
  </Layout>
);

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY", locale: "fr")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`;
