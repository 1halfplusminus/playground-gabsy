import { CreateNodeArgs, CreatePagesArgs } from "gatsby";
import { createFilePath } from "gatsby-source-filesystem";
import { resolve } from "path";

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

export const onCreateNode = ({ node, getNode, actions }: CreateNodeArgs) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` });
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};

export const createPages = async ({
  graphql,
  boundActionCreators,
}: CreatePagesArgs) => {
  const { createPage } = boundActionCreators;

  const allMarkdown = await graphql<Data>(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `);
  console.log(allMarkdown);
  allMarkdown.data.allMarkdownRemark.edges.forEach((edge) => {
    const { slug } = edge.node.fields;
    if (!slug) {
      return;
    }

    // type safe `createPage` call
    createPage({
      path: slug,
      component: resolve(__dirname, "./src/templates/blog-post.tsx"),
      context: {
        slug,
      },
    });
  });
};
