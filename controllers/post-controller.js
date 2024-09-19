const createError = require("../utils/createError");
const prisma = require("../config/prisma");

exports.createPost = async (req, res, next) => {
  try {
    const { title, userId, categoryId } = req.body;

    // if title exist
    if (!title) {
      return createError(400, "Title to be provided");
    }
    // typeof title string?

    if (typeof title !== "string") {
      return createError(400, "Title should be string");
    }

    // is userId exist

    if (!userId) {
      return createError(400, "User id to provided");
    }

    // typeof userId number

    if (typeof userId !== "number") {
      return createError(400, "User id should be number");
    }

    // is user exist

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return createError(400, "User not found");
    }
    // is categoryId exist

    if (!categoryId) {
      return createError(400, "Category to be provided");
    }
    // typeof categoryid number?

    if (typeof categoryId !== "number") {
      return createError(400, "Category id should be number");
    }
    // is category exist

    const category = await prisma.category.findFirst({
      where: {
        id: categoryId,
      },
    });

    if (!category) {
      return createError(400, "Category not found");
    }

    const post = await prisma.post.create({
      data: {
        title,
        categories: {
          connect: {
            id: categoryId,
          },
        },
        authorId: userId,
      },
      include: {
        categories: true,
      },
    });
    res.json({ post });
  } catch (err) {
    next(err);
  }
};


exports.getAllPosts = (req, res, next) => {
  try {
    
  } catch (err) {
    next(err)
  }
}