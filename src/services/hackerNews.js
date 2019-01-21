import http from '../utils/http';
import API from '../constants/api';

/**
 * @param {String} newsType
 * @param {Number} newsId
 * Fetch news data from the api.
 */
export async function getNews(newsType, newsId = null) {
  if (newsId === null) {
    const filteredNewsType = matchNewsTypeToUrl(newsType);
    const apiData = await http.get(filteredNewsType);

    return apiData.data;
  } else if (newsId !== null) {
    const apiData = await http.get(`/item/${newsId}.json`);

    return apiData;
  }
}

/**
 * @param {*} newsType
 * @param {*} commentId
 * Fetch comments for specific news.
 */
export async function getComments(newsType, commentId) {
  if (newsType === 'comments') {
    const newsData = await http.get(`${API.COMMENTS}/${commentId}.json`);

    return Promise.resolve(newsData);
  }
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
