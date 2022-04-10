const blogsRouter = require("express").Router();
const Blog = require("../models/blogs");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", async (request, response, next) => {
  const titles = request.body.title;
  const authors = request.body.author;
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0,
  });

  blog
    .save()
    .then((savedBlog) => {
      if (titles !== undefined && authors !== undefined) {
        response.status(201).json(savedBlog);
      } else {
        response.status(400).send("Author and Title is required");
      }
    })
    .catch((err) => {
      response.json(err);
    });
});

blogsRouter.delete("/:id", async (request, response, err,next) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
});

module.exports = blogsRouter;
