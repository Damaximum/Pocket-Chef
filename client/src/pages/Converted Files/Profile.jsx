var NewComponent = React.createClass({
    render: function() {
      return (
        <div>
          <style dangerouslySetInnerHTML={{__html: "\n    \n" }} />
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Login</title>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css" />
          <link rel="stylesheet" href="app.css" />
          <img src="../Images/PocketChef-image.jpg" />
          {/* Navigation Bar*/}
          <div className="ui inverted labeled large menu">
            <a className="item" href="./Home.html">
              <i className="home icon" />
              Home
            </a>
            <div className="ui simple dropdown item">
              <i className="list ol icon" />
              Recipes
              <i className="dropdown icon" />
              <div className="menu">
                <a className="item" href="SearchRecipe.html">
                  <i className="search icon" />
                  Search Recipe
                </a>
                <a className="item" href="SavedRecipes.html">
                  <i className="bookmark outline icon" />
                  Saved Recipe
                </a>
                <a className="item" href="./CreateRecipes.html">
                  <i className="pen square icon" />
                  Create Recipe
                </a>
              </div>
            </div>
            {/* Change if logged in or guest*/}
            <div className="right menu">
              <div className="active item">
                <div className="ui icon input">
                  <input type="text" placeholder="Search..." />
                  <i className="search link icon" />
                </div>
              </div>
              <div className="ui simple dropdown item">
                <i className="user outline icon" />
                Account
                <i className="dropdown icon" />
                <div className="menu">
                  <a className="item" href="Profile.html">
                    <i className="address card outline icon" />
                    Profile
                  </a>
                  <a className="item" href="Login.html">
                    <i className="sign out alternate icon" />
                    Logout
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* Profile View */}
          <div className="ui placeholder segment container">
            <h1 className="ui center aligned header">My Profile</h1>
            {/* <div class="ui divider"> */}
            <div className="ui raised very padded text container segment">
              <img src="../Images/HungryCorgi.jpg" className="ui circular image" id="profilePic" />
              <h2 className="ui header">Hungry Boy</h2>
              <p />
              <p />
            </div>
          </div>
        </div>
      );
    }
  });