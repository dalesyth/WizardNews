const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const postBank = require("./postBank");
const postList = require("./postList");
const postDetails = require("./postDetails");

dotenv.config();

const app = express();

app.use(morgan("dev"));

app.use(express.static("public"));

app.get("/", (req, res) => {
  const posts = postBank.list();

  res.send(postList(posts));
});

app.get("/posts/:id", (req, res) => {
  const post = postBank.find(req.params.id);

  if (!post.id) {
    throw new Error("Not Found");
  } else {
    res.send(postDetails(post));
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("404 - NOT FOUND");
});

const { PORT = 1337 } = process.env;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
