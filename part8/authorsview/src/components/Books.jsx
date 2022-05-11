import { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";

const FILTERED_BOOK = gql`
  query FilteredBook($selectedBook: String!) {
    filteredBook(selectedBook: $selectedBook) {
      title
      published
      genres
      author {
        name
        born
      }
    }
  }
`;

const Books = (props) => {
  const [showBooks, setShowBooks] = useState([]);
  const [theOneBook, setTheOneBook] = useState([]);
  const [genre, setGenre] = useState(null);

  let books;
  if (props.myDataBooks.data) books = props.myDataBooks.data.allBooks;
  useEffect(() => {
    setShowBooks(books);
    if (!data.loading && data && data.data) {
      setTheOneBook(data.data.filteredBook);
    }
  }, [genre]);

  const genresHandler = (genre) => {
    setGenre(genre);
  };

  const data = useQuery(FILTERED_BOOK, {
    variables: { selectedBook: genre },
  });

  if (data.loading) {
    return "Loading..";
  }

  let myArr = [];
  if (!props.show) {
    return null;
  }
  return (
    <div>
      <h2>books</h2>
      {books &&
        books.map((a) =>
          a.genres.forEach((b) => {
            myArr.push(b);
          })
        )}

      {myArr
        .filter((v, i, a) => a.indexOf(v) === i)
        .map((e, i) => (
          <button key={e + i} onClick={() => genresHandler(e)}>
            {e}
          </button>
        ))}
      <button onClick={() => setGenre("All")}> All Genres</button>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {theOneBook &&
            theOneBook.map((a) => (
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
};

export default Books;
