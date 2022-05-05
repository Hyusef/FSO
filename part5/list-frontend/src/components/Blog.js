import React from "react";
import { useState } from "react";
import axios from "axios";
const Blog = ({ blog, handleUpdate, user, token, handleComment }) => {
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
  const submitHandler = (e) => {
    e.preventDefault();
    const comment = e.target.myComment.value;
    handleComment(comment,blog.id)
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
      <div>
        <p>{blog.url}</p>
        <p id="likes">
          Likes: {blog.likes}{" "}
          <button id="likeButton" onClick={likeHandler}>
            Like
          </button>
        </p>
        <h4>Comments</h4>
        <form onSubmit={submitHandler}>
          <input name="myComment" type="text" placeholder="Add comment"></input>
          <button>Add comment</button>
        </form>
        <ul>
          {blog.comments.map((ele) => {
            return <li key={ele}>{ele}</li>;
          })}
        </ul>
      </div>
      {user.username === blog.author && (
        <button onClick={() => deleteHandler(blog.id)}>Delete</button>
      )}
    </div>
  );
};

export default Blog;
