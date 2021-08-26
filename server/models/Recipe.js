const { Schema } = require("mongoose");

const recipeSchema = new Schema({
  recipeId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
  calories: {
    type: Number,
  },
  instructions: {
    type: String,
    required: false,
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
  notes: {
    type: String,
    required: true
  }
});

module.exports = recipeSchema;
