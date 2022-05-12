import { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";

const CREATE_BOOK = gql`
  mutation AddBook(
    $title: String!
    $published: Int!
    $author: String!
    $genres: [String!]
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      title
      published
      genres
    }
  }
`;

const NewBook = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);
  const [addBook, { data, loading, error }] = useMutation(CREATE_BOOK, {
    refetchQueries: [
      { query: props.rBooks },
      { query: props.rAuthors },
      { query: props.filter },
    ],
  });

  if (!props.show) {
    return null;
  }

  if (loading) return "Submitting...";

  if (error && error.networkError) {
    console.log(error.networkError.result.errors);
  }

  const submit = async (event) => {
    event.preventDefault();

    addBook({
      variables: { title, published: parseInt(published), author, genres },
    });
    console.log("add book...");
    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
