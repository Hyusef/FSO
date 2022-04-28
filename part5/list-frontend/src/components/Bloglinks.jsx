import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
const StyledLink = styled(Link)`
  text-decoration: none;
  border: 1px solid black;
  padding: 10px;
`;

function Bloglinks({ blog }) {
  return (
    <div>
      <h2>
        <StyledLink to={`/blogs/${blog.id}`}>{blog.title}</StyledLink>
      </h2>
    </div>
  );
}
export default Bloglinks;
