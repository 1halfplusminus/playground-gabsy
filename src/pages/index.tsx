import css from "@emotion/css";
import { graphql, Link } from "gatsby";
import React from "react";
import Helmet from "react-helmet";
import HomeSlider from "../components/homeslider.component";
import Layout from "../components/layout";
import { SliderQuery } from "../interfaces/query-slider";
import { rhythm } from "../utils/typography";

export interface IndexProps {
  data: Data;
}

export interface Data {
  blogs: AllMarkdownRemark;
  sliders: SliderQuery;
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

export default ({
  data: {
    blogs: { totalCount, edges },
    sliders,
  },
}: IndexProps) => (
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
          margin-bottom: px;
        `}
      >
        Super blog sur mon chiot
      </h1>
      <HomeSlider
        images={sliders.edges.map(
          (e) => e.node.frontmatter.featuredImage.childImageSharp.fluid,
        )}
      />
      <h4
        css={css`
          display: inline-block;
          margin-top: 15px;
          margin-bottom: 15px;
        `}
      >
        {totalCount} Postes
      </h4>
      {edges.map(({ node }) => (
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
                margin-bottom: ${rhythm(1)};
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
    blogs: allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
    ) {
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
    sliders: allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            featuredImage {
              childImageSharp {
                fixed(height: 400) {
                  ...GatsbyImageSharpFixed
                }
                fluid(maxWidth: 700, maxHeight: 800, cropFocus: CENTER) {
                  ...GatsbyImageSharpFluid
                  presentationWidth
                  presentationHeight
                }
              }
            }
            title
            date(formatString: "DD MMMM, YYYY", locale: "fr")
          }
        }
      }
    }
  }
`;
