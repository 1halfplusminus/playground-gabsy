"use strict"

require("source-map-support").install()
require("ts-node").register({
  compilerOptions: {
    module: "commonjs",
    target: "es2017",
  },
})

exports.createPages = require("./createPages").createPages

exports.onCreateNode = require("./createPages").onCreateNode

exports.onCreatePage = require("./createPages").onCreatePagesestricted
