const createError = require("../utils/createError");
const prisma = require("../config/prisma");
const postService = require("../services/post-service");

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

exports.getAllPosts = async (req, res, next) => {
  try {
    const { page, limit, order } = req.query;
    // are limit & page NaN?
    if (isNaN(Number(page)) || isNaN(Number(limit))) {
      return createError(400, "Page or limit is incorrect type");
    }

    // check if 0
    if (page === "0" || limit === "0") {
      return createError(400, "Page or limit should not be zero");
    }

    // order desc asc

    if (order !== "desc" && order !== "asc") {
      return createError(400, "Order is incorrect type");
    }
    //Page 1 -> 0 - 10
    // Page 2 -> 11 -20
    // limit 10

    const skipPost = (Number(page) - 1) * Number(limit);

    const posts = await prisma.post.findMany({
      skip: skipPost,
      take: Number(limit),
      orderBy: {
        createdAt: order,
      },
      include: {
        categories: true,
      },
    });

    res.json({ posts });
  } catch (err) {
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    // if postId exist
    if (!postId) {
      return createError(400, "Post id to be provided");
    }
    // if postId number

    if (isNaN(Number(postId))) {
      return createError(400, "Post id is incorrect type");
    }

    const post = await postService.getPostById(postId);

    if (!post) {
      return createError(400, "Post not found");
    }

    await postService.deletePostById(post.id);

    res.json({ message: "Post is deleted" });
  } catch (err) {
    next(err);
  }
};
