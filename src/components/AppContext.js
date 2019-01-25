import React from 'react';

/**
 * Context data used in allover the app.
 */
export const AppContext = React.createContext({
  errors: '',
  success: '',
  isAuthenticated: false,
  /** Handles Login in the app.*/
  handleLogin() {},
  /** Handles Signup in the app.*/
  handleSignup() {},
  /** Haneles logout in app.*/
  handleLogout() {}
});
