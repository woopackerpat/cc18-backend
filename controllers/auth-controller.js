const createError = require("../utils/createError");

exports.login = (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username) {
      return createError(400, "Username should be provided");
    }

    if (password.length <= 10) {
      return createError(400, "Password length is not sufficient");
    }

    // res.json({})
  } catch (err) {
    next(err);
  }
};

exports.register = (req, res, next) => {
  res.json({ message: "Register" });
};

exports.forgetPassword = (req, res, next) => {
  res.json({ message: "forget password" });
};

exports.resetPassword = (req, res, next) => {
  res.json({ message: "reset password" });
};
