// implement your posts router here

//import
const expres = require("express");
const Post = require("./posts-model");

//create router
const router = expres.Router();

//diffrent routes
router.get("/", (req, res) => {
  Post.find()
    .then((found) => {
      res.json(found);
    })
    .catch((err) => {
      res.status(500).json({
        message: "The posts information could not be retrieved",
        err: { err },
      });
    });
});
router.get("/:id", async (req, res) => {
  try {
    const thePost = await Post.findById(req.params.id);
    if (!thePost)
      res.status(404).json({
        message: "The post with the specified ID does not exist",
      });
    else res.json(thePost);
  } catch (err) {
    res.status(500).json({
      message: "The post information could not be retrieved",
      err: { err },
    });
  }
});
router.post("/", async (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents)
    res.status(400).json({
      message: "Please provide title and contents for the post",
    });
  else {
    Post.insert({ title, contents })
      .then(({ id }) => {
        return Post.findById(id);
      })
      .then((newPost) => {
        res.status(201).json(newPost);
      })
      .catch((err) => {
        res.status(500).json({
          message: "The posts information could not be retrieved",
          err: { err },
        });
      });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const thePost = await Post.findById(req.params.id);
    if (!thePost)
      res.status(404).json({
        message: "The post with the specified ID does not exist",
      });
    else {
      await Post.remove(req.params.id);
      res.json(thePost);
    }
  } catch (err) {
    res.status(500).json({
      message: "The post could not be removed",
      err: { err },
    });
  }
});
router.put("/:id", (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents)
    res.status(400).json({
      message: "Please provide title and contents for the post",
    });
  else
    Post.findById(req.params.id)
      .then((editedPost) => {
        if (!editedPost)
          res.status(404).json({
            message: "The post with the specified ID does not exist",
          });
        else return Post.update(req.params.id, req.body);
      })
      .then((data) => {
        if (data) return Post.findById(req.params.id);
      })
      .then((post) => {
        if (post) res.json(post);
      })
      .catch((err) => {
        res.status(500).json({
          message: "The posts information could not be retrieved",
          err: { err },
        });
      });
});
router.get("/:id/messages", async (req, res) => {
  try {
    const theMessage = await Post.findById(req.params.id);
    if (!theMessage)
      res.status(404).json({
        message: "The post with the specified ID does not exist",
      });
    else {
      const messages = await Post.findPostComments(req.params.id);
      res.json(messages);
    }
  } catch (err) {
    res.status(500).json({
      message: "The comments information could not be retrieved",
      err: { err },
    });
  }
});

//export
module.exports = router;
