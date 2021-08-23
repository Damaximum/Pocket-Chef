const { gql } = require("apollo-server-express");

// notes: [Note]
// type Note {
//   _id: ID
//   noteText: String
//   createdAt: String
// }

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    password: String!
    email: String!
    recipeCount: String!
    savedRecipes: [Recipe]
  }

  type Recipe {
    recipeId: String!
    image: String
    link: String
    title: String!
    calorie: Int
    instructions: String!
    cookTime: Int
    prepTime: Int
    servings: Int
    notes: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type ApiKeyInfo {
    apiName: String
    apiKey: String
  }

  type Query {
    me: User
    showUsers: [User]
    getApiKeys: [ApiKeyInfo]
  }

  input recipeInput {
    userId: ID!
    recipeId: String!
    title: String!
    instructions: String!
  }

  input noteInput {
    userId: ID!
    recipeId: String!
    noteText: String!
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): User
    saveRecipe(userId: String!, recipeId: String!, title: String!, instructions: String!): User
    removeRecipe(userId: String!, recipeId: String!): User
    addRecipeNote(input: noteInput): User
  }
`;
    // addNote(userId: String!, recipeId: String!, noteText: String!): User

// type Mutation {
//   removeRecipe(recipeId: String!): User
// }

module.exports = typeDefs;
