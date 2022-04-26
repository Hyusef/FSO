import React from "react";
import userService from "../services/users";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function UserblogInfo() {
  const [users, setUSers] = useState([]);
  useEffect(() => {
    const request = axios.get("/api/users");
    return request.then((response) => setUSers(response.data));
  }, []);

  return (
    <div>
      {users[0] &&
        users.map((el) => {
          return (
            <div>
              <Link to={`/${el.id}`}>{el.name} </Link> number of blogs: 
              {el.blogs.length}
            </div>
          );
        })}
    </div>
  );
}

export default UserblogInfo;
