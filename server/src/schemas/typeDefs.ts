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
    bookCount: Int
  }

  type Book {
    _id: ID
    title: String
    authors: [String]!
    description: String
    image: String
    link: String
    bookId: String!    
  } 

  type Auth {
  token: String
  user: User
  }
  
  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  input BookInput {
    title: String!
    authors: [String]!
    description: String
    image: String
    link: String
    bookId: String!
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
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookData: BookInput!): User
    removeBook(bookId: ID!): User
  }
`;  

export default typeDefs;
