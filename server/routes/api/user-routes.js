const router = require("express").Router();
const {
  createUser,
  login,
  getSingleUser,
  saveRecipe,
  deleteRecipe,
} = require("../../controllers/user-controller");

// import middleware
const { authMiddleware } = require("../../utils/auth");

// put authMiddleware anywhere we need to send a token for verification of user
router.route("/").post(createUser).put(authMiddleware, saveRecipe);

router.route("/login").post(login);

router.route("/me").get(authMiddleware, getSingleUser);

router.route("/recipes/:recipeId").delete(authMiddleware, deleteRecipe);

module.exports = router;
