import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './Home';
import Login from './Login';
import Header from './Header';
import NavBar from './NavBar';
import '../assets/css/App.css';
import SingelNews from './SingleNews';
import ROUTES from '../constants/routes';

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
        sessionStorage.setItem('isLoggedIn', true);

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
    const { isAuthenticated } = this.state;

    return (
      <Router>
        <div>
          {isAuthenticated ? (
            <React.Fragment>
              <Header />
              <NavBar />
            </React.Fragment>
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
              component={props => <SingelNews {...props} />}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default AppRouter;
