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
    email: String!
    savedRecipes: [Recipe]
  }

  type Recipe {
    recipeId: String
    image: String
    sourceUrl: String
    title: String
    instructions: String
    extendedIngredients: [Ingredient]
    readyInMinutes: Int
    servings: Int
    notes: String
  }

  type Ingredient {
    original: String!
  }

  type RecipeCard {
    id: ID
    title: String!
    image: String
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
    apiQuery(query: String!): [RecipeCard]
    recipeQuery(recipeId: ID!): Recipe
  }

  input recipeInput {
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
    addUser(username: String!, email: String!, password: String!): Auth
    saveRecipe(recipeId: String!, title: String!, image: String!): User
    removeRecipe(recipeId: String!): User
    addRecipeNote(recipeId: String!, noteText: String!): User
    updateNote(recipeId: String!, noteText: String!): User
  }
`;
// addRecipeNote(input: noteInput): User
// addRecipeNote(recipeId: String!, noteText: String!): User

// type Mutation {
//   removeRecipe(recipeId: String!): User
// }

module.exports = typeDefs;
