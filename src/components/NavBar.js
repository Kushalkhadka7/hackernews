import React from 'react';
import { NavLink } from 'react-router-dom';

import ROUTES from '../constants/routes';

const navigationLinks = [
  {
    to: ROUTES.NEWNEWSSTORIES,
    name: 'New Stories'
  },
  {
    to: ROUTES.BESTNEWSSTORIES,
    name: 'Best Stories'
  },
  {
    to: ROUTES.TOPNEWSSTORIES,
    name: 'Top Stories'
  }
];

/**
 * @memberof Navbar
 * @returns {number} Nav component.
 */
const NavBar = () => (
  <div className="container local-container">
    <nav className="nav-extended">
      <div className="nav-content">
        <ul className="tabs tabs-transparent">
          {navigationLinks.map(navigationLink => (
            <NavLink
              exact
              activeClassName="activeNavBar"
              className="tab nav-tabs"
              to={navigationLink.to}
              key={navigationLink.to}
            >
              {navigationLink.name}
            </NavLink>
          ))}
        </ul>
      </div>
    </nav>
  </div>
);

export default NavBar;
