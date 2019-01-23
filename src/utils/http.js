import axios from 'axios';

/**
 * Base url for our api.
 */
const http = axios.create({
  baseURL: process.env.REACT_APP_HACKERNEWS_API
});

export default http;
