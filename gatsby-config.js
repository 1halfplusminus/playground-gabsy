"use strict"
/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
module.exports = {
  siteMetadata: {
    title: "Mon chiot et moi",
  },
  /* Your site config here */
  plugins: [
    "gatsby-plugin-typescript",
    "gatsby-plugin-tslint",
    "gatsby-plugin-emotion",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    "gatsby-transformer-remark",
    {
      resolve: "gatsby-plugin-typography",
      options: {
        pathToConfigModule: "src/utils/typography",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "src",
        path: __dirname + "/src/",
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "LeBraz",
        short_name: "LeBraz",
        start_url: "/",
        background_color: "#6b37bf",
        theme_color: "#6b37bf",
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: "standalone",
        icon: "src/images/icon.png",
      },
    },
    `gatsby-plugin-remove-serviceworker`,
    "gatsby-plugin-react-helmet",
  ],
}
