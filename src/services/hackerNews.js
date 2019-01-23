import http from '../utils/http';
import API from '../constants/api';

/**
 * @param {String} newsType
 * @param {Number} commentId
 * Fetch news data from the api.
 */
export async function getNews(newsType, commentId) {
  if (!commentId) {
    const filteredNewsType = matchNewsTypeToUrl(newsType);
    const apiData = await http.get(filteredNewsType);

    return apiData.data;
  } else {
    const apiData = await http.get(`/item/${commentId}.json`);

    return apiData;
  }
}

/**
 * @param {*} newsType
 * @param {*} commentId
 * Fetch comments for specific news.
 */
export async function getComments(newsType, commentId) {
  const filteredNewsType = matchNewsTypeToUrl(newsType);
  const newsData = await http.get(`${filteredNewsType}/${commentId}.json`);

  return Promise.resolve(newsData);
}

/**
 * @param {String} newsType
 */
const matchNewsTypeToUrl = newsType => {
  switch (newsType) {
    case 'newnews':
      return API.NEWSTORIES;
    case 'topnews':
      return API.TOPSTORIES;
    case 'bestnews':
      return API.BESTSTORIES;
    case 'comments':
      return API.COMMENTS;
    default:
      return API.NEWSTORIES;
  }
};
