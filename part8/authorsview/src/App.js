import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Loginform from "./components/Loginform";
import Recommend from "./components/Recommend";
import {
  useQuery,
  useMutation,
  useSubscription,
  useApolloClient,
  gql
} from "@apollo/client";


const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

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

const All_BOOKS = gql`
  query {
    allBooks {
      title
      published
      author {
        name
      }
      genres
    }
  }
`;
const App = () => {
  const [page, setPage] = useState("authors");
  const myData = useQuery(ALL_AUTHORS);
  const myDataBooks = useQuery(All_BOOKS);
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  if (myData.loading) {
    return <div>loading...</div>;
  }
  const mystuf = localStorage.getItem("books-user-token");

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        {mystuf && (
          <>
            <button onClick={() => setPage("books")}>books</button>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommend")}>recommendz</button>
            <button onClick={logout}>logout</button>
            {token && (
              <Recommend
                setToken={setToken}
                show={page === "recommend"}
                books={myDataBooks}
              />
            )}
          </>
        )}
        {!mystuf && <button onClick={() => setPage("login")}>Login</button>}
      </div>

      <Authors
        show={page === "authors"}
        myData={myData}
        rAuthors={ALL_AUTHORS}
      />

      <Books
        show={page === "books"}
        myDataBooks={myDataBooks}
        filter={FILTERED_BOOK}
      />
      <Loginform setToken={setToken} show={page === "login"} />

      <NewBook
        show={page === "add"}
        rBooks={All_BOOKS}
        rAuthors={ALL_AUTHORS}
        filter={FILTERED_BOOK}
      />
    </div>
  );
};

export default App;
