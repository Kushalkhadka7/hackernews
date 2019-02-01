import React from 'react';
import { Redirect } from 'react-router-dom';

import News from './News';
import ROUTES from '../constants/routes';
import { AppContext } from './AppContext';
import NEWSTYPE from '../constants/newsType';
import * as hackerNewsServices from '../services/hackerNews';

/**
 * @class Home
 * @extends {React.PureComponent}
 */
class Home extends React.PureComponent {
  static contextType = AppContext;
  /**
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      newsType: '',
      currentPage: 0,
      newsStories: [],
      goToNextPage: 1,
      maxNewsItems: 0,
      newsPerPage: 10,
      isLoading: false,
      newsStoriesIds: [],
      goToPreviousPage: -1
    };
  }

  /**
   * @memberof Home
   * Calls fetchNewsStories to fetch news data from api.
   */
  componentDidMount() {
    this.fetchNewsStories();
  }

  /**
   * @memberof Home
   * Fetch news from api.
   * Pass the data from api to function setDataToState.
   */
  fetchNewsStories = async () => {
    const newsType = await this.checkRoutes();

    this.setState({ newsType, isLoading: true });

    if (this.state.isLoading) {
      const newsStoriesIds = await hackerNewsServices.getNews(
        this.state.newsType
      );
      const maxNewsItems = newsStoriesIds.length / 10;

      this.setState({ newsStoriesIds, maxNewsItems });
      this.loadNewsFromIds();
    }
  };

  /**
   * Loads news headlines using the ids that have been fetched in first api call.
   * Sets the news data to array newsStories in state.
   *
   * @memberof Home
   */
  loadNewsFromIds = () => {
    const { newsPerPage, currentPage } = this.state;

    this.setState({
      newsStories: []
    });
    const initialRenderState = currentPage * newsPerPage;

    for (
      let i = initialRenderState;
      i < initialRenderState + newsPerPage;
      i++
    ) {
      const newsData = hackerNewsServices.getNews(
        this.state.newsType,
        this.state.newsStoriesIds[i]
      );

      newsData
        .then(({ data }) =>
          this.setState({
            newsStories: [...this.state.newsStories, data]
          })
        )
        .catch(error => error);
    }
  };

  /**
   * @memberof Home
   * @returns {string} News type .
   * Checks news type based on the incoming routes.
   */
  checkRoutes = () => {
    const { pathname } = this.props.location;

    switch (pathname) {
      case ROUTES.NEWNEWSSTORIES:
        return NEWSTYPE.NEWNEWS;
      case ROUTES.TOPNEWSSTORIES:
        return NEWSTYPE.TOPNEWS;
      case ROUTES.BESTNEWSSTORIES:
        return NEWSTYPE.BESTNEWS;
      default:
        return NEWSTYPE.NEWNEWS;
    }
  };

  /**
   * @memberof Home
   * Stops fetching news data.
   */
  componentWillUnmount() {
    this.setState({ isLoading: false });
  }

  /**
   * @memberof Home
   * @param {Number} pageChange
   */
  handleUpdate = pageChange => {
    this.setState({ currentPage: this.state.currentPage + pageChange });
    this.loadNewsFromIds();
  };

  /**
   * @memberof Home
   * @returns {number} Jsx to display news.
   */
  render() {
    const {
      maxNewsItems,
      newsStories,
      goToNextPage,
      goToPreviousPage,
      currentPage
    } = this.state;
    const { isAuthenticated } = this.context;

    return (
      <React.Fragment>
        {isAuthenticated ? (
          <React.Fragment>
            <div className="container local-container list-container">
              <ul>
                {newsStories.map((value, index) => (
                  <div key={index}>
                    <News
                      news={value}
                      index={index}
                      newsType={this.state.newsType}
                    />
                  </div>
                ))}
              </ul>
            </div>
            <div className="news-pagination">
              <button
                disabled={currentPage <= 0}
                onClick={() => this.handleUpdate(goToPreviousPage)}
                className="btn-floating btn-large waves-effect waves-light previous-page"
              >
                <i className="fas fa-chevron-left" />
              </button>
              <button
                disabled={currentPage >= maxNewsItems - 1}
                onClick={() => this.handleUpdate(goToNextPage)}
                className="btn-floating btn-large waves-effect waves-light next-page"
              >
                <i className="fas fa-chevron-right" />
              </button>
            </div>
          </React.Fragment>
        ) : (
          <Redirect to={ROUTES.LOGINSIGNUP} />
        )}
      </React.Fragment>
    );
  }
}

export default Home;
