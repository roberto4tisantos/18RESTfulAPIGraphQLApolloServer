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

import { gql } from "apollo-server";
// import { gql } from "@apollo/server";

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
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
  token: ID
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
    me: User
    users: [User]  # Add this line if you need the users query
  }   

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookData: BookInput!): User
    removeBook(bookId: ID!): User
  }
`;  

export default typeDefs;
