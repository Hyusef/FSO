const { ApolloServer, gql, UserInputError } = require("apollo-server");

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

  type Subscription {
    bookAdded: Books!
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
    filteredBook(selectedBook: String!): [Books!]!
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
module.exports = typeDefs;
