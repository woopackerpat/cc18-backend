const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller");

router.get("/", userController.getMe);
router.post("/favorite", userController.addFavorite);

module.exports = router;
