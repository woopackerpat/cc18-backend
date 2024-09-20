const express = require("express");
const router = express.Router();
const postController = require("../controllers/post-controller");
const authenticate = require("../middlewares/authenticate");

router.post("/", authenticate, postController.createPost);
router.get("/all", postController.getAllPosts);
router.delete("/:postId", authenticate, postController.deletePost);

module.exports = router;
