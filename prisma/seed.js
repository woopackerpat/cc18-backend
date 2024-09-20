const prisma = require("../config/prisma");
const bcrypt = require("bcryptjs");

async function main() {
  const categoriesData = [
    { name: "Tectnology", name: "Lifestyle", name: "Education" },
  ];

  const categories = [];
  for (const categoryData of categoriesData) {
    const category = await prisma.category.create({ data: categoryData });
    categories.push(category);
  }

  const postsData = Array.from({ length: 10 }, (_, i) => ({
    title: `Post ${i}`,
    published: true,
  }));

  const usersData = Array.from({ length: 10 }, (_, i) => ({
    email: `user${i + 1}@mail.com`,
    password: "password",
    name: `User ${i + 1}`,
    role: "USER",
    profileBio: `Bio for user ${i + 1}`,
    posts: postsData,
  }));

  for (const userData of usersData) {
    const user = await prisma.user.create({
      data: {
        email: userData.email,
        password: await bcrypt.hash(userData.password, 5),
        posts: {
          createMany: {
            data: userData.posts.map((el) => ({
              title: el.title,
              published: true,
            })),
          },
        },
      },
    });

    console.log(user);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
