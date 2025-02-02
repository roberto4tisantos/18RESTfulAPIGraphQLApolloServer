// const typeDefs = `
//   type Class {
//     _id: ID!
//     name: String
//     building: String
//     creditHours: Int
//   }

//   type Query {
//     classes: [Class]
//   }
// `;

const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]!
    bookCount: number
  }

  type Book {
    _id: ID
  title: String
  authors: []!
  description: String
  image: String
  link: String
  } 
  
  input UserInput {
    username: String!
    email: String!
    password: String!
  }
  
  type Auth {
    token: ID!
    user: User
  }  

  type Query {
    users: [User]
    user(username: String!): User
    book: [Book]!
    book(bookId: ID!): Book
    me: User
  }  

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    addBook(input: BookInput!): Book
  }
`;  

export default typeDefs;
