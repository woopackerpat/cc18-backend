require("dotenv").config();
const express = require("express");
const authRoutes = require("./routes/auth-route");
const userRoutes = require("./routes/user-route");
const restaurantRoutes = require("./routes/restaurant-route");
const postRoutes = require("./routes/post-route");
const handlerError = require("./middlewares/error");
const notFoundHanlder = require("./middlewares/not-found");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/restaurant", restaurantRoutes);
app.use("/post", postRoutes);

app.use(handlerError);
app.use("*", notFoundHanlder);

app.listen(8000, () => console.log("Server is running on port 8000"));
