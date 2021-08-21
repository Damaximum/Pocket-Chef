import { gql } from "@apollo/client";

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      password
      email
      recipeCount
      savedRecipes {
        recipeId
        image
        link
        title
        // calorie
        // instructions
        // cookTime
        // prepTime
        // servings
        notes
      }
    }
  }
`;
