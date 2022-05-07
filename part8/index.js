const { ApolloServer, gql } = require("apollo-server");
require('dotenv').config()
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')

console.log('connecting to',process.env.MONGODB_URI)

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })



/* let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },

  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "The Demon ",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
]; */

const typeDefs = gql`
  type Books {
    title: String!
    published: Int!
    author: Authors!
    genres: [String!]
    id: ID!
  }

  type Authors {
    name: String!
    born: Int
    bookCount: Int
  }


  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(name: String, genres: String): [Books!]!
    allAuthors: [Authors!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]
    ): Books

    editAuthor(name: String!, setBorn: Int!): Authors
  }
`;

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      return args.name || args.genres
        ? books.filter(
            (e) => e.author === args.name || e.genres.includes(args.genres)
          )
        : books;
    },
    allAuthors: () => {
      return authors;
    },
  },

  Authors: {
    bookCount: (root) => {
      const booksArr = [];
      books.forEach((e) => {
        if (e.author === root.name) {
          booksArr.push(e.title);
        }
      });
      return booksArr.length;
    },
  },


  Mutation: {
    addBook: async (root, args) => {
      const myAuthor = new Author({name:args.author})
      await myAuthor.save()
      const book = new Book({...args,author:myAuthor})
      return book.save()
      /* const book = args; */
      /*   authors = authors.concat({
        books = books.concat(book);
        name: args.author,
        born: null,
      }); */
    },
    editAuthor: (root, args) => {
      const nameOfAuthor = args.name;
      const setBornToDate = args.setBorn;
      authors = authors.map((e) => {
        return e.name === nameOfAuthor
          ? { name: nameOfAuthor, born: setBornToDate }
          : e;
      });
      return { name: nameOfAuthor, born: setBornToDate };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
