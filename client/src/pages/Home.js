import React, { useState, useEffect } from "react";
import {
  Jumbotron,
  Container,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { GET_API_KEYS } from '../utils/queries';
import { searchSpoonacular } from "../utils/API";
import { saveRecipeIds, getSavedRecipeIds } from "../utils/localStorage";
import { SAVE_RECIPE } from "../utils/mutations";
// import { GET_QUERY } from "../utils/queries";
import { useQuery, useMutation } from "@apollo/client";

const SearchRecipes = () => {

  let spoonacularApiKey='';

  // create state for holding returned google api data
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState("");

  // const [spoonacularApiKey, setSpoonacularApiKey] = useState("");

  // create state to hold saved RecipeId values
  const [savedRecipeIds, setSavedRecipeIds] = useState(getSavedRecipeIds());

  // create a saveRecipe mutation
  const [saveRecipe, { error }] = useMutation(SAVE_RECIPE);
  // const { loading, data } = useQuery(GET_QUERY);

  const { loadingApiKeys, data } = useQuery(GET_API_KEYS);

  // set up useEffect hook to save `savedRecipeIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveRecipeIds(savedRecipeIds);
  });

  // create method to search for Recipes and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // console.log(data)

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchSpoonacular(spoonacularApiKey,searchInput);

      const { results } = await response.json();

      console.log( `handleFormSubmit() results:`)
      console.log(results)
      
      const recipeData = results.map((recipe) => ({
        recipeId: recipe.id,
        title: recipe.title,
        image: recipe.image || "",
      }));

      setSearchedRecipes(recipeData);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a Recipe to our database
  const handleSaveRecipe = async (recipeId) => {
    // find the Recipe in `searchedRecipes` state by the matching id
    const recipeToSave = searchedRecipes.find(
      (recipe) => recipe.recipeId === recipeId
    );

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    // console.log(recipeToSave);
    try {
      const response = await saveRecipe({
        variables: {
          input: recipeToSave,
        },
      });

      if (!response) {
        throw new Error("something went wrong!");
      }

      // if Recipe successfully saves to user's account, save Recipe id to state
      setSavedRecipeIds([...savedRecipeIds, recipeToSave.recipeId]);
    } catch (err) {
      console.error(err);
    }
  };

  // if (loading) {
  //       return <div>Loading...</div>;
  //     }

  if (loadingApiKeys) {
    console.log( `SearchRecipes(): Loading...` );
    return <h2>LOADING...</h2>;
  }

  const apiInfo = data?.getApiKeys || [];
  if ( apiInfo.length === 0 )
  {
    // console.log( 'Waiting for apiKeys...' );
  } else {
    // console.log( `SearchRecipes(): Recieved API-KEY info:` );
    for( var i=0; i < apiInfo.length; i++ ) {
      if ( apiInfo[i].apiName === 'spoonacular' ) {
        // console.log( `Found SPOONACULAR apiKey: [${apiInfo[i].apiKey}]` );
        // setSpoonacularApiKey(apiInfo[i].apiKey);
        spoonacularApiKey = apiInfo[i].apiKey;
      }
    }
  }

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Search for Recipes!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for a Recipe"
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg">
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2>
          {searchedRecipes.length
            ? `Viewing ${searchedRecipes.length} results:`
            : "Search for a Recipe to begin"}
        </h2>
        <CardColumns>
          {searchedRecipes.map((recipe) => {
            return (
              <Link to={`/${recipe.recipeId}`}>
                <Card key={recipe.recipeId} border="dark">
                  {recipe.image ? (
                    <Card.Img
                      src={recipe.image}
                      alt={`The cover for ${recipe.title}`}
                      variant="top"
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{recipe.title}</Card.Title>
                    {Auth.loggedIn() && (
                      <Button
                        disabled={savedRecipeIds?.some(
                          (savedRecipeId) => savedRecipeId === recipe.recipeId
                        )}
                        className="btn-block btn-info"
                        onClick={() => handleSaveRecipe(recipe.recipeId)}
                      >
                        {savedRecipeIds?.some(
                          (savedRecipeId) => savedRecipeId === recipe.recipeId
                        )
                          ? "This recipe has already been saved!"
                          : "Save this Recipe!"}
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Link>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SearchRecipes;
