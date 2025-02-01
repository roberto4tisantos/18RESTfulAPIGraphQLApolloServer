const typeDefs = `
  type Class {
    _id: ID!
    name: String
    building: String
    creditHours: Int
  }

  type Query {
    classes: [Class]
  }
`;

export default typeDefs;
