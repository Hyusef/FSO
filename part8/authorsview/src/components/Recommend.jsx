import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";

const GET_lOGGED_IN_USER = gql`
  query Me {
    me {
      username
      favoriteGenre
    }
  }
`;
function Recommend(props) {
  const [showBooks, setShowBooks] = useState([]);
  const [genre, setGenre] = useState(null);
  const LoggedinUser = useQuery(GET_lOGGED_IN_USER);

  useEffect(() => {
    if (LoggedinUser && LoggedinUser.data && LoggedinUser.data.me) {
      setGenre(LoggedinUser.data.me.favoriteGenre);
    }
    const allBooks = props.books.data.allBooks.filter((e) => {
      return e.genres.includes(genre);
    });
    setShowBooks(allBooks);
  }, []);

  console.log(genre);

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h1>Recommendations</h1>
      <p>
        Books in your favourite genre: <strong> {`${genre}`}</strong>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {showBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Recommend;
