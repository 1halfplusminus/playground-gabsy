import { graphql } from "gatsby";
import React from "react";
import Layout from "../components/layout";

export interface BlogPostProps {
  data: {
    markdownRemark: {
      html: string
      frontmatter: {
        title,
      },
    },
  };
}
const BlogPost = ({
  data: {
    markdownRemark: {
      html,
      frontmatter: { title },
    },
  },
}: BlogPostProps) => {
  return (
    <Layout>
      <div>
        <h1>{title}</h1>
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
      }
    }
  }
`;

export default BlogPost;
