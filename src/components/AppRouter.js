import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './Home';
import Login from './Login';
import NavBar from './NavBar';
import Header from './Header';
import '../assets/css/App.css';
import Comments from './Comments';
import NotFound from './NotFound';
import ROUTES from '../constants/routes';
import { AppContext } from './AppContext';
import { LOGIN_ERRORS } from '../constants/message';
import { SIGNUP_SUCCESS } from '../constants/message';
import { LOGIN_CREDENTIALS } from '../constants/localStorage';
import { IS_AUTHENTICATED } from '../constants/sessionStorage';

/**
 * @class AppRouter
 * @augments {React.Component}
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
      success: '',
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
      isAuthenticated: sessionStorage.getItem(IS_AUTHENTICATED) === 'true'
    };
  }

  /**
   * @param {Object} loginData Data from Login component.
   * @returns {boolean} Boolean that indicates either logged in or not.
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
        sessionStorage.setItem(IS_AUTHENTICATED, true);

        return true;
      }
    }
  };

  /**
   * @param {Object} loginData Data from Login component.
   * @returns {boolean} Boolean that indicates either signin or not.
   */
  handleSignup = loginData => {
    if (loginData) {
      localStorage.setItem(LOGIN_CREDENTIALS, JSON.stringify(loginData));
      this.setState({
        success: SIGNUP_SUCCESS.SIGNUP_SUCCESS_MESSAGE
      });

      return true;
    }
  };

  /**
   * Handles logout function in app.
   */
  handleLogout = () => {
    this.setState({ isAuthenticated: false });
    sessionStorage.setItem('isAuthenticated', false);
  };

  /**
   * @returns {boolean} React Router.
   */
  render() {
    const { isAuthenticated, errors, success } = this.state;

    return (
      <AppContext.Provider
        value={{
          errors: errors,
          success: success,
          isAuthenticated: isAuthenticated,
          handleLogin: this.handleLogin,
          handleSignup: this.handleSignup,
          handleLogout: this.handleLogout
        }}
      >
        <Router basename={'/hackernews'}>
          <div>
            {isAuthenticated && (
              <div className="header-container">
                <Header />
                <NavBar />
              </div>
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
                component={props => <Home {...props} />}
              />
              <Route
                path={ROUTES.BESTNEWSSTORIES}
                exact
                component={props => <Home {...props} />}
              />
              <Route
                path={ROUTES.COMMENTS}
                exact
                component={props => <Comments {...props} />}
              />
              <Route component={props => <NotFound {...props} />} />
            </Switch>
          </div>
        </Router>
      </AppContext.Provider>
    );
  }
}

export default AppRouter;
