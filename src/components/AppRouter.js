import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './Home';
import Login from './Login';
import Header from './Header';
import NavBar from './NavBar';
import '../assets/css/App.css';
import Comments from './Comments';
import ROUTES from '../constants/routes';

/**
 * @class AppRouter
 * @extends {React.Component}
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
      isAuthenticated: false
    };
  }

  /**
   * @static
   * @param {*} props
   * @param {*} state
   * @returns Changed state.
   * @memberof AppRouter
   */
  static getDerivedStateFromProps(props, state) {
    return {
      ...state,
      isAuthenticated: sessionStorage.getItem('isAuthenticated')
    };
  }

  /**
   * @memberof Login
   * @param {Object} dataToLogin
   * Handles login event.
   * Validates login credentials.
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
   * @param {Object} dataToBeStored
   * @memberof AppRouter
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
    const { isAuthenticated, isCommentPage } = this.state;

    return (
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
              component={props => (
                <Login
                  {...props}
                  errors={this.state.errors}
                  handleLogin={this.handleLogin}
                  handleSignup={this.handleSignup}
                  isAuthenticated={this.state.isAuthenticated}
                />
              )}
            />
            <Route
              path={ROUTES.NEWNEWSSTORIES}
              exact
              component={props => (
                <Home {...props} isAuthenticated={this.state.isAuthenticated} />
              )}
            />
            <Route
              path={ROUTES.TOPNEWSSTORIES}
              exact
              component={props => (
                <Home {...props} isAuthenticated={this.state.isAuthenticated} />
              )}
            />
            <Route
              path={ROUTES.BESTNEWSSTORIES}
              exact
              component={props => (
                <Home {...props} isAuthenticated={this.state.isAuthenticated} />
              )}
            />
            <Route
              path={ROUTES.COMMENTS}
              exact
              component={props => (
                <Comments
                  {...props}
                  isCommentPage={isCommentPage}
                  goToPrevPage={this.goToPrevPage}
                />
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default AppRouter;
