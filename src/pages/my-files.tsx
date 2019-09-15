import { graphql } from "gatsby";
import React from "react";
import Layout from "../components/layout";

export interface MyFilesProps {
  data: Data;
}

export interface Data {
  allFile: AllFile;
}

export interface AllFile {
  edges: Edge[];
}

export interface Edge {
  node: Node;
}

export interface Node {
  relativePath: string;
  prettySize: string;
  extension: string;
  birthTime: string;
}

export default ({ data }: MyFilesProps) => {
  return (
    <Layout>
      <div>
        <h1>My Site's Files</h1>
        <table>
          <thead>
            <tr>
              <th>relativePath</th>
              <th>prettySize</th>
              <th>extension</th>
              <th>birthTime</th>
            </tr>
          </thead>
          <tbody>
            {data.allFile.edges.map(({ node }, index) => (
              <tr key={index}>
                <td>{node.relativePath}</td>
                <td>{node.prettySize}</td>
                <td>{node.extension}</td>
                <td>{node.birthTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query {
    allFile {
      edges {
        node {
          relativePath
          prettySize
          extension
          birthTime(fromNow: true)
        }
      }
    }
  }
`;
