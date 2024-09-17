const express = require("express");

const app = express();

// app.use((req, res) => {
//   res.json({ message: "Hello codecamp" });
// });

// app.get("/restaurant/:id", (req, res) => {
//   console.log(req.params);
//   const { id } = req.params;
//   res.json({ restaurantId: id });
// });

// app.get("/restaurant/all", (req, res) => {
//   res.json({ message: "Get data" });
// });

// app.get("/restaurant/:restaurantId/menu/:menuId", (req, res) => {
//   const { restaurantId, menuId } = req.params;

//   res.json({ restaurantId, menuId });
// });

// app.get("/posts", (req, res) => {
//   res.json({ message: req.method + " products" });
// });

// app.post("/posts", (req, res) => {
//   res.json({ message: req.method + " products" });
// });

// app.put("/posts", (req, res) => {
//   res.json({ message: req.method + " products" });
// });

// app.patch("/posts", (req, res) => {
//   res.json({ message: req.method + " products" });
// });

// app.delete("/posts", (req, res) => {
//   res.json({ message: req.method + " products" });
// });

// app.get("/redirect", (req, res) => {
//   res.redirect("https://google.com");
// });

// app.get("/sum/:a/:b", (req, res) => {
//   const { a, b } = req.params;

//   res.status(200).json({ a, b });
// });

// app.post("/products/:id", (req, res) => {
//   const { id } = req.params;
//   res.status(200).json({ id });
// });

// app.get("/users/:id/bookings/:bid", (req, res) => {
//   const { id, bid } = req.params;

//   res.status(200).json({ id, bid });
// });

// app.patch("/post/:postId", (req, res) => {
//   const { postId } = req.params;

//   res.status(200).json({ postId });
// });

// app.delete("/post/:postId", (req, res) => {
//   const { postId } = req.params;

//   res.status(200).json({ postId });
// });

// app.get("/post/:postId", (req, res) => {
//   const { postId } = req.params;

//   res.status(200).json({ postId });
// });

// app.get("/auth/:userId", (req, res) => {
//   const { userId } = req.params;

//   res.status(200).json({ userId });
// });

// Query

// app.get("/product", (req, res) => {
//   const { order, page, limit } = req.query;

//   res.json({ order, page, limit });
// });

// Middleware

// const middlewareA = (req, res, next) => {
//   req.user = { id: 1, username: "John", role: "admin" };
//   next();
// };

// const middlewareB = (req, res, next) => {
//   req.name = "Woody";
//   next();
// };

// app.use(middlewareA);
// app.use(middlewareB);

// app.post("/product", middlewareA, middlewareB, (req, res) => {
//   // const { title, description, price, stock } = req.body;
//   console.log(req.user);
//   console.log(req.name);
//   res.json({});
// });

// File upload multer middleware

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

app.use(express.json());

// app.post("/product", upload.single("image"), (req, res) => {
//   // const { title, description, price, stock } = req.body;
//   // res.json({ title, description, price, stock });
//   console.log(req.file);
//   res.json({});
// });

const checkCodecamp = (req, res, next) => {
  const { message } = req.body;

  // if (message === "Codecamp") {
  //   req.user = { title: "Codecamp18" };
  // } else {
  //  return res.json({ message: "Unknown" });
  // }

  if (message !== "Codecamp") {
    return res.json({ message: "Unknown" });
  }

  req.user = { title: "Codecamp18" };
  next();
};

app.use(checkCodecamp);

app.get("/product", (req, res) => {
  const { page, limit, order } = req.query;
  res.json({ page, limit, order });
});

app.post("/product", (req, res) => {
  const { name, price, description } = req.body;

  res.json({ name, price, description });
});

app.put("/product/:id", (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;

  res.json({ id, name, price, description });
});

app.delete("/product/:id", (req, res) => {
  const { id } = req.params;

  res.json({ id });
});

app.listen(8000, () => console.log("Server is running on port 8000"));
