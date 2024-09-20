const createError = require("../utils/createError");
const prisma = require("../config/prisma");
const postService = require("../services/post-service");

exports.createPost = async (req, res, next) => {
  try {
    const { title } = req.body;

    if (!title || typeof title !== "string") {
      return createError(400, "Title is incorrect");
    }

    const post = await prisma.post.create({
      data: {
        title,
        authorId: req.user.id,
      },
    });

    res.json({ post });
  } catch (err) {
    next(err);
  }
};

exports.getAllPosts = async (req, res, next) => {
  try {
    const { page, limit, order, search } = req.query;
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

    if (typeof search !== "string") {
      return createError(400, "Search text should be string");
    }

    //Page 1 -> 0 - 10
    // Page 2 -> 11 -20
    // limit 10

    const skipPost = (Number(page) - 1) * Number(limit);

    const posts = await prisma.post.findMany({
      where: {
        title: {
          contains: search,
        },
      },
      skip: skipPost,
      take: Number(limit),
      orderBy: {
        createdAt: order,
      },
      include: {
        categories: {
          select: {
            name: true,
          },
        },
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
