const { Schema } = require("mongoose");

const recipeSchema = new Schema({
  recipeId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  calories: {
    type: Number,
  },
  instructions: {
    type: String,
    required: true,
  },
  cookTime: {
    type: Number,
  },
  prepTime: {
    type: Number,
  },
  servings: {
    type: Number,
  },
});

module.exports = recipeSchema;
