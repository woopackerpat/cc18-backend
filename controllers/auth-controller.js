const createError = require("../utils/createError");
const prisma = require("../config/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return createError(400, "Email and password should be provided");
    }

    if (typeof email !== "string" || typeof password !== "string") {
      return createError(400, "Typeof email and password should be string");
    }

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return createError(400, "User not found");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return createError(400, "Email or password is invalid");
    }

    // access token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.json({ token });
  } catch (err) {
    next(err);
  }
};

exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return createError(400, "Email and password are required");
    }

    if (typeof email !== "string" || typeof password !== "string") {
      return createError(400, "Type of email and password should be string");
    }

    const isUserExist = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (isUserExist) {
      return createError(400, "User already exist");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        role: true,
      },
    });

    // case1 ส่ง token -> user ไม่ต้อง login ใหม่
    // case2 ส่ง message register succesful -> ใช้เคสนี้ (user ต้องไปหน้า login)

    res.json({ message: "Register succesful" });
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
