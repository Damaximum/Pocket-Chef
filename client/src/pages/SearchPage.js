const recipeList = document.getElementById('recipeList');
const searchBar = document.getElementById('searchBar');
let recipeArray = [];

//validates which search strings are called by the search bar
searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase(); 
    const filteredRecipes = recipeArray.filter( recipe => {
        return recipe.name.toLowerCase().includes(searchString) || 
        recipe.ingredients.toLowerCase().includes(searchString);
    });
    displayRecipe(filteredRecipes);
})

//Calls third-party API for recipes
const loadRecipes = async () => {
    try {
        const res = await fetch('refer to ThirdParty API Here');
        recipeArray = await res.json();
        displayRecipe(recipe);
        // console.log(recipe);
    } catch (err) {
        console.error(err);
    }
};

//Displays recipes                             TODO: validate all the search objects with ed and Ryan
const displayRecipe = (recipes) => {
    const htmlString = recipes
        .map((recipes) => {
            return `
            <li class = "recipe">
                <img src="${recipe.picture}></img>
                <h2>${recipe.name}</h2>
                <p>Ingredients: ${recipe.ingredients}</p>
            </li>
        `;
         })
        .join('');
    recipeList.innerHTML = htmlString;
};

loadRecipes();