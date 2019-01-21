import axios from 'axios';

/**
 * Base url for our api.
 */
const http = axios.create({
  baseURL: 'https://hacker-news.firebaseio.com/v0'
});

export default http;
