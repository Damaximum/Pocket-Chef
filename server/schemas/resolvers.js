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
// const apikey = "5b2110da4dc545f3b3b1ab36e6f8562f";

const resolvers = {

  Query: {
    me: async (parent, args, context) => {
      // console.log(context.user._id)
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
      let spoonacularApiInfo;
      if ( spoonacularApiKey ) {
        spoonacularInfo = {
          apiName: 'spoonacular',
          apiKey: spoonacularApiKey
        }
      }
      else {
        spoonacularInfo = {
          apiName: 'undefined',
          apiKey: ''
        }
      }
      aApiKeys.push( spoonacularInfo );
      let sApiKeys=JSON.stringify(aApiKeys)
      console.log( `getApiKeys(): ${sApiKeys}` );
      return( aApiKeys );
    },

    // apiQuery: async (parent, args, context) => {
    //   console.log( `apiQuery(${apikey}` );
    //   let query = await fetch(
    //     `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apikey}&query=${args.query}&number=20`
    //   );
    //   let {results} = await query.json();
    //   // console.log(results);

    //   return results;

    // },

    recipeQuery: async (parent, args, context) => {
      console.log( `recipeQuery(${args.recipeId})`)
      let query = await fetch(
        `https://api.spoonacular.com/recipes/${args.recipeId}/information?apiKey=${spoonacularApiKey}`
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

    saveRecipe: async ( parent, { recipeId, title, image }, context ) => {
      // console.log( 'saveRecipe()' );
      // console.log( context.user );
      if (context.user) {
        let userInfo = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: { savedRecipes: { id: recipeId, title: title, image: image } },
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
      let updatedUser;
      if ( context.user ) {
        updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { savedRecipes: { recipeId: args.recipeId } } },
            { new: true }
        );

        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    addRecipeNote: async (parent, { recipeId, noteText }) => {
      if ( context.user ) {
        const userInfo = await User.findOne( { _id: context.user._id } );
        if ( userInfo ) {
          let bFound=false;
          for ( var i=0; !bFound && i < userInfo.savedRecipes.length; i++ )
          {
            if ( userInfo.savedRecipes[i].id === recipeId ) {
              userInfo.savedRecipes[i].notes = noteText;
              bFound = true;
            }
          }
        }
        return userInfo;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    // patients.findOneAndUpdate(
    //   {_id: "5cb939a3ba1d7d693846136c"},
    //   {$set: {"myArray.$[el].value": 424214 } },
    //   { 
    //     arrayFilters: [{ "el.treatment": "beauty" }],
    //     new: true
    //   }
    // )
    // -----------
    // {
    //   "_id" : ObjectId("5cb939a3ba1d7d693846136c"),
    //   "myArray" : [
    //       {
    //           "name" : "PW6178281935-20190425",
    //           "treatment" : "beauty",
    //           "value" : 0 <- i want to update this
    //       },
    //       {
    //           "name" : "PW6178281935-24142444",
    //           "treatment" : "muscle",
    //           "value" : 0
    //       }
    //   ] 
    // },
    // -----------
    updateNote: async (parent, { recipeId, noteText }, context) => {
      let updatedUser;
      if ( context.user ) {

        console.log( `userId:[${context.user._id}], recipeId:[${recipeId}], notes:[${noteText}]` );

        // updatedUser = await User.findOneAndUpdate(
        //     { _id: context.user._id },
        //     { $set: { "savedRecipes.$[el].notes": noteText } },
        //     { 
        //       arrayFilters: [{ "el.recipeId": recipeId }],
        //       new: true
        //     }
        // );

        // updatedUser = await User.findOne( { _id: context.user._id } );
        // if ( updatedUser ) {
        //   let bFound=false;
        //   for ( var i=0; !bFound && i < userInfo.savedRecipes.length; i++ )
        //   {
        //     if ( userInfo.savedRecipes[i].recipeId === recipeId ) {
        //       updatedUser = await User.findOneAndUpdate(
        //           { _id: context.user._id },
        //           { $set: { savedRecipes[i].notes: noteText } },
        //           {
        //             new: true
        //           }
        //       );
        //       bFound = true;
        //     }
        //   }
        // }

        const noteUpd = await User.updateOne(
          { _id: context.user._id, "savedRecipes.recipeId": recipeId },
          { $set: { "savedRecipes.$.notes" : noteText } }
        )
        console.log( noteUpd );

        updatedUser = await User.findOne( { _id: context.user._id } );
        console.log( updatedUser );
        
        // if ( updatedUser ) {
        //   console.log( `POST NOTE UPDATE RESULT:` );
        //   // console.log( updatedUser );
        //   let aSavedRecipes=updatedUser.savedRecipes;
        //   let aNewRecipes=[];
        //   for( let i=0; i < aSavedRecipes.length; i++ ) {
        //     let savedReceipe=aSavedRecipes[i];
        //     console.log( `SAVED RECIPE: [${i}]: ${aSavedRecipes[i].recipeId}, ${aSavedRecipes[i].title}, "NOTES: ${aSavedRecipes[i].notes}"` );
        //     if ( savedReceipe.recipeId === recipeId ) {
        //       console.log( 'updated note...' );
        //       savedReceipe.notes = noteText;
        //     }
        //     aNewRecipes.push(savedReceipe);
        //   }
        //   console.log( aNewRecipes );
        // }

        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    }

  }

}

module.exports = resolvers;
