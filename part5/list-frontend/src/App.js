import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginsService from "./services/login";
import Noteform from "./components/Noteform";
import LoginForm from "./components/Loginform";
import Toggleable from "./components/Toggleable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(false);
  const handleLogin = async (username, password) => {
    try {
      const user = await loginsService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
    } catch (exp) {
      console.log("error");
      setMessage("Error Wrong Pass or username");
      setTimeout(() => setMessage(false), 3000);
    }
    blogService.getAll().then((blogs) => setBlogs(blogs));
  };
  const handleLogout = (e) => {
    e.preventDefault();
    window.localStorage.removeItem("loggedBlogUser");
    setUser(null);
  };

  const addBlog = (blogObject) => {
    blogService.create(blogObject).then((resp) => {
      blogService.getAll().then((blogs) => {
        setBlogs(blogs);
        setMessage(
          `Sucessfully added ${blogs[blogs.length - 1].title} by ${
            blogs[blogs.length - 1].author
          }`
        );
        setTimeout(() => setMessage(false), 3000);
      });
    });
  };

  useEffect(() => {
    const loggedBlogUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedBlogUserJSON) {
      const user = JSON.parse(loggedBlogUserJSON);
      setUser(user);
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleUpdate = () => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  };

  const blogsArr = blogs.sort((a, b) => b.likes > a.likes);

  return (
    <div>
      <h2>blogs</h2>
      {message && <h2>{message}</h2>}
      {user &&
        blogsArr.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleUpdate={handleUpdate}
            user={user}
            token={user.token}
          />
        ))}
      {user !== null && <button onClick={handleLogout}>Logout</button>}
      {user && <p> {user.username} currently logged in</p>}
      {user === null && (
        <Toggleable buttonLabel={"Login"}>
          <LoginForm handleLogin={handleLogin} />
        </Toggleable>
      )}

      {user !== null && (
        <Toggleable buttonLabel={"Create Blog"}>
          <Noteform addBlog={addBlog} />
        </Toggleable>
      )}
    </div>
  );
};

export default App;
