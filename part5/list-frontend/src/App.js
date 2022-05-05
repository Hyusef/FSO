import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginsService from "./services/login";
import Noteform from "./components/Noteform";
import LoginForm from "./components/Loginform";
import Toggleable from "./components/Toggleable";
import { useDispatch, useSelector } from "react-redux";
import UserblogInfo from "./components/UserblogInfo";
import axios from "axios";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";

import {
  BrowserRouter as Router,
  Link,
  Routes,
  Route,
  useMatch,
} from "react-router-dom";
import BlogsByUsers from "./components/BlogsByUsers";
import Bloglinks from "./components/Bloglinks";
import styled from "styled-components";

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const StyledNav = styled.ul`
  display: flex;
  background: gray;
  padding: 2px;
  margin: 4px;
  list-style-type: none;
  li {
    margin: 4px;
  }
`;

const App = () => {
  /*   const [user, setUser] = useState(null); */
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);

  const handleLogin = async (username, password) => {
    try {
      const user = await loginsService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch({ type: "LOGGEDUSER", payload: user });
    } catch (exp) {
      console.log("error");
      dispatch({ type: "ERROR" });
      setTimeout(() => dispatch({ type: "CLEAR" }), 3000);
    }
    blogService
      .getAll()
      .then((blogs) => dispatch({ type: "SAVEBLOG", payload: blogs }));
  };
  const handleLogout = (e) => {
    e.preventDefault();
    window.localStorage.removeItem("loggedBlogUser");
    dispatch({ type: "LOGOUT" });
  };
  const state = useSelector((state) => state);

  const addBlog = (blogObject) => {
    blogService.create(blogObject).then((resp) => {
      blogService.getAll().then((blogs) => {
        console.log(resp);
        dispatch({ type: "SAVEBLOG", payload: blogs });
        dispatch({
          type: "SUCCESS",
          payload: `Sucessfully added ${blogs[blogs.length - 1].title} by ${
            blogs[blogs.length - 1].author
          }`,
        });
        setTimeout(() => dispatch({ type: "CLEAR" }), 3000);
      });
    });
  };

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => dispatch({ type: "SAVEBLOG", payload: blogs }));
    const loggedBlogUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedBlogUserJSON) {
      const user = JSON.parse(loggedBlogUserJSON);
      dispatch({ type: "LOGGEDUSER", payload: user });
    }
    const request = axios.get("/api/users");
    request.then((response) => setUsers(response.data));
  }, []);

  const handleUpdate = () => {
    blogService
      .getAll()
      .then((blogs) => dispatch({ type: "SAVEBLOG", payload: blogs }));
  };
  const handleComment = (comment, id) => {
    console.log(comment, id);
    blogService
      .makeComment(comment, id)
      .then((resp) => {
        handleUpdate();
      })
      .catch((err) => {
        console.log(err);
      });

    return;
  };

  const myBlogs = state.blogs;
  const user = state.user;
  const blogsArr = [...myBlogs].sort((a, b) => b.likes > a.likes);
  const idMatch = useMatch("/:id");
  const userWithId = idMatch
    ? users.find((e) => e.id === idMatch.params.id)
    : null;

  const blogMatch = useMatch("/blogs/:id");

  const blogWithId = blogMatch
    ? myBlogs.find((e) => e.id === blogMatch.params.id)
    : null;

  if (user) {
    console.log(user.token);
  }

  return (
    <div>
      <StyledNav>
        <li>
          <StyledLink to={`/blogs/`}>Blogs</StyledLink>
        </li>
        <li>
          <StyledLink to={`/users/`}>Users</StyledLink>
        </li>
        <li>{user && <p> {user.username} currently logged in</p>}</li>
        <li>
          {user !== null && <button onClick={handleLogout}>Logout</button>}
        </li>
      </StyledNav>
      {state.messages && <h2>{state.messages}</h2>}
      {/* Link to all the blogs. */}
      {user === null && (
        <Toggleable buttonLabel={"Login"}>
          <LoginForm handleLogin={handleLogin} />
        </Toggleable>
      )}

      <Routes>
        <Route path="/:id" element={<BlogsByUsers user={userWithId} />} />
        <Route
          path="/blogs"
          element={
            user &&
            user !== null && (
              <List>
                {blogsArr.map((blog) => (
                  <ListItem button>
                    {" "}
                    <Bloglinks key={blog.id} blog={blog} />
                    <Divider />
                  </ListItem>
                ))}
              </List>
            )
          }
        />
        <Route
          path="/users"
          element={
            user !== null && (
              <>
                <Toggleable buttonLabel={"Create Blog"}>
                  <Noteform addBlog={addBlog} />
                </Toggleable>
                <UserblogInfo />
              </>
            )
          }
        />

        {user && myBlogs && (
          <Route
            path="/blogs/:id"
            element={
              <Blog
                handleUpdate={handleUpdate}
                blog={blogWithId}
                user={user}
                token={user.token}
                handleComment={handleComment}
              />
            }
          />
        )}
      </Routes>
    </div>
  );
};

export default App;
