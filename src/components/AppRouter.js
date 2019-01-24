import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './Home';
import Login from './Login';
import NavBar from './NavBar';
import Header from './Header';
import '../assets/css/App.css';
import Comments from './Comments';
import ROUTES from '../constants/routes';
import { AuthContext } from './AuthContext';

/**
 * @class AppRouter
 * @extends {React.Component}
 */
class AppRouter extends React.Component {
  /**
   * Creates an instance of AppRouter.
   *
   * @param {any} props
   */
  constructor(props) {
    super(props);
    this.state = {
      errors: '',
      isAuthenticated: false
    };
  }

  /**
   * @param {*} props Data from parent component.
   * @param {*} state Current state of the component.
   * @returns {number} The sum of the two numbers.
   */
  static getDerivedStateFromProps(props, state) {
    return {
      ...state,
      isAuthenticated: sessionStorage.getItem('isAuthenticated')
    };
  }

  /**
   * @param {Object} dataToLogin Login Credentials.
   * @returns {boolean} Boolean value.
   */
  handleLogin = dataToLogin => {
    const dataAtLocalStorage = JSON.parse(
      localStorage.getItem('loginCredentials')
    );

    if (dataAtLocalStorage === 'undefined' || dataAtLocalStorage === null) {
      this.setState({ errors: 'please sign up to login' });
    } else {
      if (dataAtLocalStorage.userName !== dataToLogin.userName) {
        this.setState({ errors: 'user name doesnt match' });
      } else if (dataAtLocalStorage.password !== dataToLogin.password) {
        this.setState({
          errors: 'password doesnt match'
        });
      } else if (
        dataAtLocalStorage.userName === dataToLogin.userName &&
        dataAtLocalStorage.password === dataToLogin.password
      ) {
        this.setState({ isAuthenticated: true });
        sessionStorage.setItem('isAuthenticated', true);

        return true;
      }
    }
  };

  /**
   * @param {*} dataToBeStored
   * @memberof AppRouter
   * @returns Boolean value.
   * Sets signup data to localstorage.
   */
  handleSignup = dataToBeStored => {
    if (dataToBeStored) {
      localStorage.setItem('loginCredentials', JSON.stringify(dataToBeStored));

      return true;
    }
  };

  /**
   * @returns Routes that are used in the app.
   * @memberof AppRouternewnews
   */
  render() {
    const { isAuthenticated } = this.state;
    return (
      <AuthContext.Provider
        value={{
          errors: this.state.errors,
          isAuthenticated: isAuthenticated,
          handleLogin: this.handleLogin,
          handleSignup: this.handleSignup
        }}
      >
        <Router>
          <div>
            {isAuthenticated ? (
              <div className="header-container">
                <Header />
                <NavBar />
              </div>
            ) : (
              <div />
            )}
            <Switch>
              <Route
                path={ROUTES.LOGINSIGNUP}
                exact
                component={props => <Login {...props} />}
              />
              <Route
                path={ROUTES.NEWNEWSSTORIES}
                exact
                component={props => <Home {...props} />}
              />
              <Route
                path={ROUTES.TOPNEWSSTORIES}
                exact
                component={props => (
                  <Home
                    {...props}
                    isAuthenticated={this.state.isAuthenticated}
                  />
                )}
              />
              <Route
                path={ROUTES.BESTNEWSSTORIES}
                exact
                component={props => (
                  <Home
                    {...props}
                    isAuthenticated={this.state.isAuthenticated}
                  />
                )}
              />
              <Route
                path={ROUTES.COMMENTS}
                exact
                component={props => (
                  <Comments {...props} goToPrevPage={this.goToPrevPage} />
                )}
              />
            </Switch>
          </div>
        </Router>
        >
      </AuthContext.Provider>
    );
  }
}

export default AppRouter;
