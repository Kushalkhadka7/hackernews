import axios from 'axios';

/**
 * Base url for our api.
 */
const http = axios.create({
  baseURL: process.env.REACT_APP_HACKER_NEWS_API
});

export default http;
