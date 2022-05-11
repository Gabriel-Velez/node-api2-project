// implement your server here
// require your posts router and connect it here

//imports
const expres = require("express");
const postsRouter = require("./posts/posts-router");

//create the server
const server = expres();

//teach express json
server.use(expres.json());

//post router
server.use("/api/posts", postsRouter);

//base not found
server.use("*", (req, res) => {
  res.status(404).json({
    message: "not found",
  });
});

//export
module.exports = server;
