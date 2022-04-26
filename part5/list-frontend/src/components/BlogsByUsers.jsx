import React from "react";

function BlogsByUsers({ user }) {
  return (
    <div>
      {user && (
        <div>
          <h1>Blogs by: {user.name}</h1>
          {user.blogs.map((ele) => {
            return <p>{ele.title}</p>;
          })}
        </div>
      )}
    </div>
  );
}

export default BlogsByUsers;
