import styled from "@emotion/styled";
import { graphql } from "gatsby";
import Img, { FluidObject } from "gatsby-image";
import React from "react";
import Layout from "../components/layout";

const StyledImage = styled(Img)`
  margin-bottom: 10px;
`;
export interface BlogPostProps {
  data: {
    markdownRemark: {
      html: string
      frontmatter: {
        title: string
        featuredImage: {
          childImageSharp: {
            fluid: FluidObject,
          },
        },
      },
    },
  };
}
const BlogPost = ({
  data: {
    markdownRemark: {
      html,
      frontmatter: {
        title,
        featuredImage: {
          childImageSharp: { fluid },
        },
      },
    },
  },
}: BlogPostProps) => {
  return (
    <Layout>
      <div>
        <h1>{title}</h1>
        <StyledImage fluid={fluid} />
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </Layout>
  );
};
export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 700, maxHeight: 800, cropFocus: CENTER) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;

export default BlogPost;
