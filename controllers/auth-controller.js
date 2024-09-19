const createError = require("../utils/createError");
const prisma = require("../config/prisma");

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

exports.register = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return createError(400, "Email to be provided");
    }

    if (typeof email !== "string") {
      return createError(400, "Email should be string");
    }

    if (!email.includes("@")) {
      return createError(400, "Incorrect format");
    }

    const isEmailExist = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (isEmailExist) {
      return createError(400, "Email already exist");
    }

    const newUser = await prisma.user.create({
      data: {
        email,
      },
    });

    res.json({ user: newUser });
  } catch (err) {
    next(err);
  }
};

exports.forgetPassword = (req, res, next) => {
  res.json({ message: "forget password" });
};

exports.resetPassword = (req, res, next) => {
  res.json({ message: "reset password" });
};

exports.updateProfile = async (req, res, nex) => {
  const { userId, bio } = req.body;

  if (!userId) {
    return createError(400, "User id to be provided");
  }

  if (typeof userId !== "number") {
    return createError(400, "User id should be number");
  }

  if (isNaN(userId)) {
    return createError(400, "User id cannot be NaN");
  }

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      profile: true,
    },
  });

  if (!user) {
    return createError(400, "User not found");
  }

  if (!user.profile) {
    await prisma.profile.create({
      data: {
        bio,
        userId,
      },
    });
  } else {
    await prisma.profile.update({
      where: {
        userId,
      },
      data: {
        bio,
      },
    });
  }

  const updatedUser = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      profile: true,
    },
  });

  res.json({ user: updatedUser });
};
