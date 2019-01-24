import http from '../utils/http';
import API from '../constants/api';

/**
 * @param {String} newsType
 * @param {Number} newsId
 * @param {Number} commentId
 * Fetch news data from the api.
 */
export async function getNews(newsType, newsId = null, commentId = null) {
  const filteredNewsType = matchNewsTypeToUrl(newsType);

  if (newsId === null && commentId === null) {
    const apiData = await http.get(filteredNewsType);

    return apiData.data;
  } else if (newsId !== null && commentId === null) {
    const apiData = await http.get(`/item/${newsId}.json`);

    return apiData;
  } else if (newsId === null && commentId !== null) {
    const newsData = await http.get(`${API.COMMENTS}/${commentId}.json`);

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
}
