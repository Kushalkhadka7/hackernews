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
import { LOGIN_ERRORS } from '../constants/message';
import LOGIN_CREDENTIALS from '../constants/localStorage';

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
   * @memberof Login
   * @param {Object} loginData
   * Handles login event.
   * Validates login credentials.
   */
  handleLogin = loginData => {
    const loginCredentials = JSON.parse(
      localStorage.getItem(LOGIN_CREDENTIALS)
    );

    if (!loginCredentials) {
      this.setState({ errors: LOGIN_ERRORS.SIGNUP_ERROR });
    } else {
      if (loginCredentials.userName !== loginData.userName) {
        this.setState({ errors: LOGIN_ERRORS.USERNAME_MISMATCH_ERROR });
      } else if (loginCredentials.password !== loginData.password) {
        this.setState({
          errors: LOGIN_ERRORS.PASSWORD_MISMATCH_ERROR
        });
      } else if (
        loginCredentials.userName === loginData.userName &&
        loginCredentials.password === loginData.password
      ) {
        this.setState({ isAuthenticated: true });
        sessionStorage.setItem('isAuthenticated', true);

        return true;
      }
    }
  };

  /**
   * @param {Object} loginData
   * @memberof AppRouter
   * @returns Boolean value.
   * Sets signup data to localstorage.
   */
  handleSignup = loginData => {
    if (loginData) {
      localStorage.setItem(LOGIN_CREDENTIALS, JSON.stringify(loginData));

      return true;
    }
  };

  /**
   * @returns Routes that are used in the app.
   * @memberof AppRouternewnews
   */
  render() {
    const { isAuthenticated, errors } = this.state;

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
            {isAuthenticated && (
              <React.Fragment>
                <Header />
                <NavBar />
              </React.Fragment>
            )}
            <Switch>
              <Route
                path={ROUTES.LOGINSIGNUP}
                exact
                component={props => (
                  <Login
                    {...props}
                    errors={errors}
                    handleLogin={this.handleLogin}
                    handleSignup={this.handleSignup}
                    isAuthenticated={isAuthenticated}
                  />
                )}
              />
              <Route
                path={ROUTES.NEWNEWSSTORIES}
                exact
                component={props => (
                  <Home {...props} isAuthenticated={isAuthenticated} />
                )}
              />
              <Route
                path={ROUTES.TOPNEWSSTORIES}
                exact
                component={props => (
                  <Home {...props} isAuthenticated={isAuthenticated} />
                )}
              />
              <Route
                path={ROUTES.BESTNEWSSTORIES}
                exact
                component={props => (
                  <Home {...props} isAuthenticated={isAuthenticated} />
                )}
              />
              <Route
                path={ROUTES.COMMENTS}
                exact
                component={props => <Comments {...props} />}
              />
            </Switch>
          </div>
        </Router>
      </AuthContext.Provider>
    );
  }
}

export default AppRouter;
