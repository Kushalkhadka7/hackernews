import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './Home';
import Login from './Login';
import Header from './Header';
import NavBar from './NavBar';
import '../assets/css/App.css';
import SingelNews from './SingleNews';
import ROUTES from '../constants/routes';
import LOGIN_CREDENTIALS from '../constants/localStorage';
import { LOGIN_ERRORS } from '../constants/message';

/**
 * Handles routing in app.
 */
class AppRouter extends React.Component {
  /**
   * Creates an instance of AppRouter.
   *
   * @param {*} props
   * @memberof AppRouter
   */
  constructor(props) {
    super(props);
    this.state = {
      errors: '',
      isAuthenticated: JSON.parse(sessionStorage.getItem('isLoggedIn'))
    };
  }
  /**
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
        sessionStorage.setItem('isLoggedIn', true);

        return true;
      }
    }
  };

  /**
   * @param {Object} loginData
   * @memberof AppRouter
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
      <Router>
        <div>
          {isAuthenticated && (
            <React.Fragment>
              <Header />
              <NavBar />
            </React.Fragment>
          )}
          ;
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
              component={props => <SingelNews {...props} />}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default AppRouter;
