import React from 'react';

import { NOT_FOUND_ERRORS } from '../constants/message';

/**
 * @memberof NotFound
 * @returns {number} Not found errors.
 */
const NotFound = () => <div>{NOT_FOUND_ERRORS.ROUTE_NOT_FOUND}</div>;

export default NotFound;
