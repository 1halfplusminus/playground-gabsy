import { Actions, CreateNodeArgs, CreatePagesArgs } from "gatsby";
import { createFilePath } from "gatsby-source-filesystem";
import { resolve } from "path";
import { Data } from "../src/interfaces";

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

export const onCreatePage = async ({
  page,
  actions,
}: {
  page: { path: string; component: string; context: {}; matchPath: string }
  actions: Actions,
}) => {
  const { createPage } = actions;
  // page.matchPath is a special key that's used for matching pages
  // only on the client
  if (page.path.match(/^\/app/)) {
    page.matchPath = "/app/*";
    // Update the page.
    createPage(page);
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
  if (allMarkdown.data) {
    allMarkdown.data.allMarkdownRemark.edges.forEach((edge) => {
      const { slug } = edge.node.fields;
      if (!slug) {
        return;
      }
      createPage({
        path: slug,
        component: resolve(__dirname, "../src/templates/blog-post.tsx"),
        context: {
          slug,
        },
      });
    });
  }
};
