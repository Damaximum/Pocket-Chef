import React from "react";
import { Jumbotron, Container, Card } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { GET_RECIPE } from "../utils/queries";

const Recipe = (props) => {
  //   console.log(props.match.params.recipeId);

  const recId = props.match.params.recipeId;

  const { loading, data } = useQuery(GET_RECIPE, {
    variables: { recipeId: recId },
  });

  console.log(data);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Jumbotron>
        <Container>
          <h1> {data.recipeQuery.title} </h1>
        </Container>
      </Jumbotron>

      <Container>
        <img
          src={data.recipeQuery.image}
          alt={`The cover for ${data.recipeQuery.title}`}
        ></img>

        <a href={data.recipeQuery.sourceUrl}> Link to the original recipe </a>

        <ul>
          <li> Cook Time: {data.recipeQuery.readyInMinutes} </li>
          <li> Serving Size: {data.recipeQuery.servings} </li>
        </ul>

        <Card>
          {data.recipeQuery.extendedIngredients.map((ingre) => {
            return <Card.Body>{ingre.original}</Card.Body>;
          })}
          ;
        </Card>

        <p>{data.recipeQuery.instructions}</p>
      </Container>
    </>
  );
};

export default Recipe;
