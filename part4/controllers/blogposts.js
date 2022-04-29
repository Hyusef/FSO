const blogsRouter = require("express").Router();
const Blog = require("../models/blogs");
const User = require("../models/user");
const { tokenExtractor, userExtractor } = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  try {
    const blogs = await Blog.find({}).populate("user", {
      name: 1,
      username: 1,
    });
    response.json(blogs);
  } catch (error) {
    response.status(400);
  }
});
blogsRouter.put("/:id", (request, response) => {
  Blog.findByIdAndUpdate(request.params.id.toString(), request.body)
    .then((resp) => {
      response.status(200).json({ sucess: "sucess" });
      return resp.data;
    })
    .catch((err) => {
      console.log(err);
    });
});

blogsRouter.post(
  "/",
  tokenExtractor,
  userExtractor,
  async (request, response, next) => {
    const user = request.user;
    const blog = new Blog({
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: request.body.likes || 0,
      user: user._id || 0,
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
  }
);

blogsRouter.delete(
  "/:id",
  async (request, response, next) => {
    const idOfPost = request.params.id;

      Blog.findByIdAndRemove(idOfPost)
        .then((resp) => {
          response.status(201).json({ sucess: "deleted it" });
          return resp.data;
        })
        .catch((err) => {
          next(err);
        });

  }
);

blogsRouter.post(
  "api/blogs/:id/comments",
  async (request, response, next) => {
 

  }
);





module.exports = blogsRouter;
