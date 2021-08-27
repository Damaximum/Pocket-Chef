import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
// import SavedRecipes from "./pages/SavedRecipes";
import Navbar from "../src/components/Navbar";
import Recipe from "./components/Recipe";
import Login from './pages/Login';
import Profile from './pages/Profile';
import SavedRecipe from './pages/SavedRecipe';
import SearchRecipe from './pages/SearchRecipes';
import CreateRecipe from './pages/CreateRecipe';

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/SavedRecipes" component={SavedRecipe} />
            <Route exact path="/recipe/:recipeId" component={Recipe} />
            {/* <Route render={() => <h1 className="display-2">Wrong page!</h1>} /> */}
            <Route exact path='/Login' component={Login} />
            <Route exact path="/Logout" component={Home} />
            <Route exact path='/Profile' component={Profile} />
            {/* <Route exact path='/SavedRecipe' component={SavedRecipe} /> */}
            <Route exact path='/SearchRecipes' component={SearchRecipe} />
            <Route exact path='/CreateRecipe' component={CreateRecipe} />
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
