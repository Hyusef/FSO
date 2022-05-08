const { ApolloServer, gql, UserInputError } = require("apollo-server");
require("dotenv").config();
const mongoose = require("mongoose");
const Book = require("./models/book");
const Author = require("./models/author");
const book = require("./models/book");
const User = require("./models/user");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "mySecret";
console.log("connecting to", process.env.MONGODB_URI);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

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
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(name: String, genres: String): [Books!]!
    allAuthors: [Authors!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]
    ): Books

    editAuthor(name: String!, setBorn: Int!): Authors
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Query: {
    bookCount: async (root, args) => {
      return Book.collection.countDocuments();
    },
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
      return args.name || args.genres
        ? books.filter(
            (e) => e.author === args.name || e.genres.includes(args.genres)
          )
        : books;
    },
    allAuthors: async () => {
      return Author.find({});
    },
    me: (root, args, context) => {
      return context.currentUser;
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
    addBook: async (root, args, context) => {
      if (!context.currentUser)
        throw new UserInputError("Login before this operation");
      try {
        const myAuthor = new Author({ name: args.author });
        await myAuthor.save();
        const book = new Book({ ...args, author: myAuthor });
        await book.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return book;
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser)
        throw new UserInputError("Login before this operation");
      const filter = { name: args.name };
      const update = { born: args.setBorn };
      return Author.findOneAndUpdate(filter, update);
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username });
      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new UserInputError("wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    } else return req;
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
