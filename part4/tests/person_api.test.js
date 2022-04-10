const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blogs");

const initialBlogs = [
  {
    title: "HTML is easy",
    author: "mr binbinb",
    url: "hello.com",
    likes: 0,
  },
  {
    content: "Browser can execute only Javascript",
    author: "mr ninja",
    url: "mrbinbinb.com",
    likes: 100,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
}, 10000);

const api = supertest(app);

test("that correct amount of blogs being fetched", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 100000);

test("there are two blogs", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(2);
}, 100000);

test("the first note is about HTTP methods", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body[0].title).toBe("HTML is easy");
}, 100000);

test("for id", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body[0].id).toBeDefined();
});

test("if post creates new blog", async () => {
  const newBlog = {
    title: "Post-lineal regression",
    author: "Allen T. Hurst",
    url: "ucd.ta.com",
    likes: 100,
  };
  await api.post("/api/blogs").send(newBlog).expect(201);
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(initialBlogs.length + 1);
}, 10000);

test("likes default to 0", async () => {
  const newBlog = {
    title: "Post-lineal regression",
    author: "Allen T. Hurst",
    url: "ucd.tp.com",
  };
  await api.post("/api/blogs").send(newBlog).expect(201);
  const response = await api.get("/api/blogs");
  expect(response.body[2].likes).toBe(0);
}, 10000);

test("for author and title", async () => {
  const newBlog = {
    url: "ucd.tp.com",
  };

  await api.post("/api/blogs").send(newBlog).expect(400);
}, 100000);

test("if delete works", async () => {
  const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map((blog) => blog.toJSON());
  };

  const blogsAtStart = await blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(404);
  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

  const contents = blogsAtEnd.map((r) => r.content);

  expect(contents).not.toContain(blogToDelete.content);
}, 100000);

afterAll(() => {
  mongoose.connection.close();
});
