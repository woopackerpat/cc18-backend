const express = require("express");
const router = express.Router();
const postController = require("../controllers/post-controller");

router.post("/", postController.createPost);
router.get("/all", postController.getAllPosts);
router.delete("/:postId", postController.deletePost);

module.exports = router;
