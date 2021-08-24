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
                <a className="active item" href="SavedRecipes.html">
                  <i className="bookmark outline icon" />
                  Saved Recipe
                </a>
                <a className="item" href="./CreateRecipes.html">
                  <i className="pen square icon" />
                  Create Recipe
                </a>
              </div>
            </div>
            <div className="right menu">
              <div className="item">
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
                  {/* Change if logged in or guest*/}
                  <a className="active item" href="Login.html">
                    <i className="sign out alternate icon" />
                    Logout
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/*Login / Sign Up Container*/}
          <div className="ui placeholder segment very padded container">
            <div className="ui two column very relaxed stackable grid">
              <div className="column">
                <div className="ui form">
                  <div className="field">
                    <h1>Login</h1>
                    <label>Username</label>
                    <div className="ui left icon input">
                      {/* Left Column: Register */}
                      <input type="text" placeholder="Username" />
                      <i className="user icon" />
                    </div>
                  </div>
                  <div className="field">
                    <label>Password</label>
                    <div className="ui left icon input">
                      <input type="password" />
                      <i className="lock icon" />
                    </div>
                  </div>
                  <div className="ui blue submit button">Login</div>
                  {/* Invisible Horizontal Divider for mobile view*/}
                  <div className="ui hidden divider" />
                </div>
              </div>
              <div className="middle aligned column">
                {/* Right Column: Sign up*/}
                <div className="ui form">
                  <div className="field">
                    <h1>Sign Up</h1>
                    <label>Username</label>
                    <div className="ui left icon input">
                      <input type="text" placeholder="Username" />
                      <i className="user icon" />
                    </div>
                  </div>
                  <div className="field">
                    <label>Password</label>
                    <div className="ui left icon input">
                      <input type="password" />
                      <i className="lock icon" />
                    </div>
                  </div>
                  <div className="inline field">
                    <div className="ui checkbox">
                      <input name="terms" type="checkbox" />
                      <label>I agree to make delicious food</label>
                    </div>
                  </div>
                  <div className="ui positive submit button">Register</div>
                </div>
              </div>
            </div>
          </div>
          <div className="ui placeholder segment very padded container">
            <form className="form" id="login">
              <h1 className="form__title">Login</h1>
              <div className="form__message form__message--error">Incorrect username/password combination.</div>
              <div className="form__input-group">
                <input type="text" className="form__input" autofocus placeholder="Username or email" />
                <div className="form__input-error-message">This is an error message</div>
              </div>
              <div className="form__input-group">
                <input type="password" className="form__input" autofocus placeholder="password" />
                <div className="form__input-error-message">This is an error message</div>
              </div>
              <p className="form__text">
                <a href="#" className="form__link">Forgot your password?</a>
              </p>
              <p className="form__text">
                <a id="linkCreateAccount" className="form__link">Don't have an account? Create an account</a>
              </p>
            </form>
          </div>
        </div>
      );
    }
  });