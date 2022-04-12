const blogsRouter = require("express").Router();
const Blog = require("../models/blogs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { name: 1, username: 1 });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response, next) => {
  const titles = request.body.title;
  const authors = request.body.author;
  const body = request.body;

  const user = request.user;

  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0,
    user: user._id,
  });

  /*   blog
    .save()
    .then((savedBlog) => {
      if (titles !== undefined && authors !== undefined) {
        user.blogs=user.blogs.concat(savedBlog._id);
        response.status(201).json(savedBlog);
      } else {
        response.status(400).send("Author and Title is required");
      }
    })
    .catch((err) => {
      response.json(err);
    }); */

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response, next) => {
  const idOfPost = request.params.id;

  const userWhoAddedBlog = await Blog.findById(idOfPost);

  if (
    userWhoAddedBlog &&
    request.user &&
    userWhoAddedBlog.user.toString() === request.user.id.toString()
  ) {
    Blog.findByIdAndRemove(idOfPost)
      .then((resp) => {
        response.status(201).json({ sucess: "deleted it" });
      })
      .catch((err) => {
        next(err);
      });
  } else {
    response.status(400).json({ error: "not found" });
  }
});

module.exports = blogsRouter;
