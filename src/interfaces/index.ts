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
  