import React from "react";
import { useState } from "react";
import axios from "axios";
const Blog = ({ blog, handleUpdate, user, token }) => {
  const [clicked, setClicked] = useState(false);

  const deleteHandler = (id) => {
    const config = {
      headers: { Authorization: token, "Cache-Control": "no-cache" },
    };
    axios
      .delete(`/api/blogs/${id}`, config)
      .then((resp) => {
        handleUpdate();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const likeHandler = () => {
    const blogObject = {
      author: blog.title,
      id: blog.id,
      likes: blog.likes + 1,
      title: blog.title,
      url: blog.url,
      user: blog.user.id,
    };
    axios
      .put(`/api/blogs/${blog.id}`, blogObject)
      .then((resp) => {
        handleUpdate();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <p>{blog.title}</p> <p>{blog.author}</p>
      <button onClick={() => setClicked(!clicked)}>
        {clicked ? "Hide" : "View"}
      </button>
      {clicked && (
        <div>
          <p>{blog.url}</p>
          <p>
            Likes: {blog.likes} <button onClick={likeHandler}>Like</button>{" "}
          </p>
          
        </div>
      )}
      {user.username === blog.author && (
        <button onClick={() => deleteHandler(blog.id)}>Delete</button>
      )}
    </div>
  );
};

export default Blog;
