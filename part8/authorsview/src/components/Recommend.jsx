import React from "react";
import { gql, useQuery, useApolloClient } from "@apollo/client";
import { useState } from "react";

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
  const LoggedinUser = useQuery(GET_lOGGED_IN_USER);
  const myGenre = LoggedinUser.data.me.favoriteGenre;

  const allBooks = props.books.data.allBooks.filter((e) => {
    return e.genres.includes(myGenre);
  });

  if (!props.show) {
    return null;
  }
  return (
    <div>
      <h1>Recommendations</h1>
      <p>
        Books in your favourite genre: <strong> {`${myGenre}`}</strong>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {allBooks.map((a) => (
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
