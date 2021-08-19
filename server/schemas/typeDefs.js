const { gql } = require("apollo-server-express");

const typeDefs = gql`
type User {
    _id: ID
    username: String!
    email: String!
    savedRecipes: [Recipe]
}

type Recipe {

}

type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  input recipeInput {

  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveRecipe(input: recipeInput): User
    removeRecipe(recipeId: String!): User
  }
`;

module.exports = typeDefs;
