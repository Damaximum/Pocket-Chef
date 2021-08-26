import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      _id
      username
    }
  }
`;

export const SAVE_RECIPE = gql`
mutation saveRecipe(
  $recipeId: String!
  $title: String!
  $image: String!
<<<<<<< HEAD
)
{
  saveRecipe(
    userId: $userId
    recipeId:$recipeId
    title:$title
    image:$image
  )
  {
    username
    email
    savedRecipes{
      title
    }
  }
=======
){
saveRecipe(
  recipeId:$recipeId
  title:$title
  image:$image
) {
  username
email
savedRecipes{
  title
}
}
>>>>>>> wes
}
`;

// export const REMOVE_RECIPE = gql``;

// export const ADD_NOTE = gql``;

// export const REMOVE_NOTE = gql``;
