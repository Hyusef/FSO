import React from "react";
import { useState } from "react";

const NoteForm = ({ addBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlogHandler = (e) => {
    e.preventDefault();
    const blogObject = {
      title: title,
      author: author,
      url: url,
    };
    addBlog(blogObject);
  };

  return (
    <form onSubmit={addBlogHandler}>
      <div>
        title:{" "}
        <input
          type="text"
          value={title}
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          id="title"
        />{" "}
        <br />
        author:{" "}
        <input
          type="text"
          value={author}
          name="title"
          onChange={(e) => setAuthor(e.target.value)}
          id="author"
        />{" "}
        <br />
        url:{" "}
        <input
          type="text"
          value={url}
          name="title"
          onChange={(e) => setUrl(e.target.value)}
          id="url"
        />
      </div>

      <button id="submitBlog" type="submit">
        Create
      </button>
    </form>
  );
};

export default NoteForm;
