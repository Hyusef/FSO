import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { gql, useQuery } from "@apollo/client";

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

const All_BOOKS = gql`
  query {
    allBooks{
      title
      published
      author
    }
  }
`;
const App = () => {
  const [page, setPage] = useState("authors");
  const myData = useQuery(ALL_AUTHORS);
  const myDataBooks = useQuery(All_BOOKS);

  console.log(myData.data);
  if (myData.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>

      <Authors show={page === "authors"} myData={myData} />

      <Books show={page === "books"} myDataBooks={myDataBooks}/>

      <NewBook show={page === "add"} />
    </div>
  );
};

export default App;
