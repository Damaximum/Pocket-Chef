const dotenvResult = require("dotenv").config();
const spoonacularApiKey = process.env.SPOONACULAR_API_KEY;

// route to get logged in user's info (needs the token)
export const getMe = (token) => {
  return fetch("/api/users/me", {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

export const createUser = (userData) => {
  return fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};

export const loginUser = (userData) => {
  return fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};

// save recipe data for a logged in user
export const saveRecipe = (recipeData, token) => {
  return fetch("/api/users", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(recipeData),
  });
};

// remove saved recipe data for a logged in user
export const deleteRecipe = (recipeId, token) => {
  return fetch(`/api/users/recipes/${recipeId}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

// make a search to spoonacular api
export const searchSpoonacular = (query) => {
  console.log(`searchSpoonacular(${spoonacularApiKey},${query})`);
  return fetch(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${spoonacularApiKey}&query=${query}&number=20`
  );
};

// export const searchRecipeSpoonacular = (query) => {
//   return fetch(
//     `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apikey}`
//   );
// };
