const prisma = require("../config/prisma");

exports.getPostById = (postId) => {
  return prisma.post.findFirst({
    where: {
      id: Number(postId),
    },
  });
};

exports.deletePostById = (postId) => {
  return prisma.post.delete({
    where: {
      id: postId,
    },
  });
};
