exports.getAllRestaurants = (req, res, next) => {
  res.json({ message: "Get all restaurant" });
};

exports.getAllMenus = (req, res, next) => {
  res.json({ message: "Get all menus" });
};

exports.getMenuDetail = (req, res, next) => {
  res.json({ message: "Get menu detail" });
};
