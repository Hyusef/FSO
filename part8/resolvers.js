const { UserInputError, AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const JWT_SECRET = "mySecret";

const resolvers = {
  Query: {
    bookCount: async (root, args) => {
      return Book.collection.countDocuments();
    },
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      return Book.find({}).populate("author");
    },
    allAuthors: async () => {
      return Author.find({});
    },
    me: (_, __, context) => {
      return context.currentUser;
    },
    filteredBook: async (root, args, context) => {
      if (!context.currentUser)
        throw new UserInputError("Login before this operation");
      const selectedBook = args.selectedBook;
      const books = await Book.find({}).populate("author");
      if (selectedBook === "All") {
        return books;
      }
      const booksWithGenre = books.filter((b) =>
        b.genres.includes(selectedBook)
      );
      return booksWithGenre;
    },
  },

  Authors: {
    bookCount: async (root) => {
      const booksArr = [];
      const books = await Book.find({});
      books.forEach((e) => {
        if (e.author.toString() === root.id.toString()) {
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
        pubsub.publish("BOOK_ADDED", { bookAdded: book });
        return book;
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
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });
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
  Subscription: {
    bookAdded: { subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]) },
  },
};

module.exports = resolvers;
