import React, { useState, useEffect } from "react";
import {
  Jumbotron,
  Container,
  Card,
} from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { GET_RECIPE } from "../utils/queries";

const Recipe = async (props) => {
    console.log(props.match.params.recipeId);

    const { loading, error, data } = useQuery(GET_RECIPE);

    return (
        <>
        <Jumbotron>
            <Container>
                <h1> {data.title} </h1>
            </Container>
        </Jumbotron>

        <Container>
                <img src={data.image} alt={`The cover for ${data.title}`}></img>
                
                <a src={data.sourceUrl}> Link to the original recipe </a>

                <ul>
                    <li>Cook Time: {data.readyInMinutes} </li>
                    <li> Serving Size: {data.servings} </li>
                </ul>

                <Card>
                    {data.extendedIngredients.map((ingre) => {
                        return (
                        <Card.Body>
                            { ingre.original }
                        </Card.Body>
                        )
                        })
                    };
                </Card>
        </Container>
        </>
    );
};

export default Recipe;