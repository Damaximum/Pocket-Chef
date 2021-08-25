import { gql } from "@apollo/client";

export const GET_API_KEYS = gql`
  query getApiKeys {
    getApiKeys {
      apiName
      apiKey
    }
  }
`;

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      savedRecipes {
        recipeId
        image
        title
      }
    }
  }
`;

export const GET_QUERY = gql`
  query apiQuery($query: String!) {
    apiQuery(query: $query) {
      id
      title
      image
    }
  }
`;

export const GET_RECIPE = gql`
  query recipeQuery($recipeId: ID!) {
    recipeQuery(recipeId: $recipeId) {
      id
      image
      sourceUrl
      title
      instructions
      readyInMinutes
      servings
      notes
      extendedIngredients {
        original
      }
    }
  }
`;
