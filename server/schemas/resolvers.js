const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");
const fetch = require('node-fetch');
const { response } = require("express");
const dotenvResult = require('dotenv').config();
// let jDotEnvResult = JSON.stringify(dotenvResult);
// console.log(`dotenvResult: ${jDotEnvResult}`);
const spoonacularApiKey=process.env.SPOONACULAR_API_KEY
// console.log( `apiKey: "${spoonacularApiKey}"` );
const apikey = "5b2110da4dc545f3b3b1ab36e6f8562f";

const resolvers = {

  Query: {
    me: async (parent, args, context) => {
      console.log(context.user._id)
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__V -password"
        );
        return userData;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    showUsers: async ( parent, args, context ) => {
      const userInfo = await User.find({})
      .populate('savedRecipes')
      return userInfo;
    },

    getApiKeys: ( parent ) => {
      let aApiKeys=[];
      if ( spoonacularApiKey ) {
        let spoonacularInfo = {
          apiName: 'spoonacular',
          apiKey: spoonacularApiKey
        }
        aApiKeys.push( spoonacularInfo );
      }
      console.log( `getApiKeys(): ${aApiKeys}` );
      return( aApiKeys );
    },

    apiQuery: async (parent, args, context) => {
      // console.log(apikey)
      let query = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apikey}&query=${args.query}&number=20`
      );
      let {results} = await query.json();
      // console.log(results);

      return results;

    },

    recipeQuery: async (parent, args, context) => {
      let query = await fetch(
        `https://api.spoonacular.com/recipes/${args.recipeId}/information?apiKey=${apikey}`
      );
      let { id, title, readyInMinutes, servings, image, extendedIngredients, instructions, sourceUrl } = await query.json();
      
      // console.log(id, title, readyInMinutes, servings, image, extendedIngredients, instructions, sourceUrl)

      return {id, title, readyInMinutes, servings, image, extendedIngredients, instructions, sourceUrl};
    }

  },

  Mutation: {

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },

    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      // const token = signToken(user);
      // return { token, user };
      return user;
    },

    saveRecipe: async ( parent, { userId, recipeId, title, instructions }, context ) => {
      // console.log( 'saveRecipe()' );
      // console.log( context.user );
      if (context.user) {
        let userInfo = await User.findOneAndUpdate(
          { _id: context.user._id },
          // { _id: userId },
          {
            $addToSet: { savedRecipes: { recipeId: recipeId, title: title, instructions: instructions } },
          },
          {
            new: true,
            runValidators: true,
          }
        );
        return userInfo;
      };
      throw new AuthenticationError("You must be lodded in!");
    },

    // removeRecipe: async ( parent, { userId, recipeId }, context ) => {
    //   // console.log( 'removeRecipe()' );
    //   // console.log( context.user );
    //   let userInfo = User.findOneAndUpdate(
    //     // { _id: context.user._id },
    //     { _id: userId },
    //     {
    //       $addToSet: { savedRecipes: { recipeId: recipeId, title: title, instructions: instructions } },
    //     },
    //     {
    //       new: true,
    //       runValidators: true,
    //     }
    //   );

    removeRecipe: async (parent, args, context) => {
      // if ( context.user ) {
        const updatedUser = await User.findOneAndUpdate(
            { _id: args.userId },
            { $pull: { savedRecipes: { recipeId: args.recipeId } } },
            { new: true }
        );

        return updatedUser;
      // }
      // throw new AuthenticationError('You need to be logged in!');
    },

    addRecipeNote: async (parent, { userId, recipeId, noteText }) => {
      let userInfo = await User.findOne( { _id: userId } );
      if ( userInfo ) {
        let bFound=false;
        for ( var i=0; !bFound && i < userInfo.savedRecipes.length; i++ )
        {
          if ( userInfo.savedRecipes[i].recipeId === recipeId ) {
            userInfo.savedRecipes[i].notes = noteText;
            bFound = true;
          }
        }
      }
      // const token = signToken(userInfo);
      // return { token, userInfo };
      return userInfo;
    }

  }

}

module.exports = resolvers;
