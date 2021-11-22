const express = require("express");
const routerGets = require("./gets");
const routerPosts = require('./posts');

module.exports = function(app) {
  app.use(express.json());

  app.use("/", routerGets);
  app.use("/", routerPosts);
};