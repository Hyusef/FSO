import { useState, useEffect } from "react";

const Books = (props) => {
  const [showBooks, setShowBooks] = useState([]);

  /*     console.log() */
  let books;
  books = props.myDataBooks.data.allBooks;
  useEffect(() => {
    console.log(books);
    setShowBooks(books);
  }, []);

  const genresHandler = (genre) => {
    const genreFiltered = books.filter((ele) => {
      return ele.genres.includes(genre);
    });
    setShowBooks(genreFiltered);
  };

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
        .filter((v, i, a) => a.indexOf(v) == i)
        .map((e, i) => (
          <button key={e + i} onClick={() => genresHandler(e)}>
            {e}
          </button>
        ))}
      <button onClick={() => setShowBooks()}> All Genres</button>

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
              <td>{a.genres[0]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
