import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * Returns nav component.
 */
const NavBar = () => {
  /**
   * @returns
   * @memberof NavBar
   */
  return (
    <div className="container local-container">
      <nav className="nav-extended">
        <div className="nav-content">
          <ul className="tabs tabs-transparent">
            <NavLink to="/" className="tab nav-tabs" activeClassName="active">
              NewStories
            </NavLink>
            <NavLink
              to="/topstories"
              className="tab nav-tabs"
              activeClassName="active"
            >
              TopStories
            </NavLink>
            <NavLink
              to="/beststories"
              className="tab nav-tabs"
              activeClassName="active"
            >
              BestStories
            </NavLink>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
