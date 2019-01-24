import React from 'react';

import { NOT_FOUND_ERRORS } from '../constants/message';

/**
 * Returns error component .
 */
const NotFound = () => <div>{NOT_FOUND_ERRORS.ROUTE_NOT_FOUND}</div>;

export default NotFound;
