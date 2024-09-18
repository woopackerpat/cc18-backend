const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurant-controller");

router.get("/restaurant/all", restaurantController.getAllRestaurants);
router.get(
  "/restaurant/:restaurantId/menu/all",
  restaurantController.getAllMenus
);
router.get("/restaurant/menu/:menuId", restaurantController.getMenuDetail);

module.exports = router;
