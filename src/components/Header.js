import React from 'react';

import { AppContext } from './AppContext';

/**
 * @returns {number} Header title.
 */
class Header extends React.Component {
  static contextType = AppContext;

  /**
   * @memberof Header
   * @returns {string} Header.
   */
  render() {
    const { handleLogout } = this.context;

    return (
      <div className="container app-header local-container clearfix">
        <span className="header">Hacker News</span>
        <span className="logout" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt" />
        </span>
      </div>
    );
  }
}

export default Header;
