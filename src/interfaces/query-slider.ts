import { FixedObject, FluidObject } from "gatsby-image";

export interface QuerySlider {
  data: Data;
}

export interface Data {
  allMarkdownRemark: SliderQuery;
}

export interface SliderQuery {
  totalCount: number;
  edges: Edge[];
}

export interface Edge {
  node: Node;
}

export interface Node {
  frontmatter: Frontmatter;
}

export interface Frontmatter {
  title: string;
  date: Date;
  featuredImage: FeaturedImage;
}

export interface FeaturedImage {
  childImageSharp: ChildImageSharp;
}

export interface ChildImageSharp {
  fixed: FixedObject;
  fluid: FluidObject;
}
