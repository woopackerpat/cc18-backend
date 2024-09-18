exports.getMe = (req, res, next) => {
  res.json({ message: "Get me" });
};

exports.addFavorite = (req, res, next) => {
  res.json({ message: "Add to my favarite" });
};
