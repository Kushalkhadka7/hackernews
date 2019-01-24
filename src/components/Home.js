import React from 'react';
import { Redirect } from 'react-router-dom';

import News from './News';
import { AuthContext } from './AuthContext';
import ROUTES from '../constants/routes';
import * as services from '../services/hackerNews';

/**
 * @class Home
 * @extends {React.PureComponent}
 */
class Home extends React.PureComponent {
  static contextType = AuthContext;
  /**
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      newsType: '',
      NEXT_PAGE: 1,
      currentPage: 0,
      newsStories: [],
      isLoading: false,
      NEWS_PER_PAGE: 10,
      PREVIOUS_PAGE: -1,
      newsStoriesIds: []
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
      const newsStoriesIds = await services.getNews(this.state.newsType);

      this.setState({ newsStoriesIds });
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
    const { NEWS_PER_PAGE, currentPage } = this.state;

    this.setState({
      newsStories: []
    });
    const initialRenderState = currentPage * NEWS_PER_PAGE;

    for (
      let i = initialRenderState;
      i < initialRenderState + NEWS_PER_PAGE;
      i++
    ) {
      const newsData = services.getNews(
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
   * Checks which route is currently active.
   * Based on the router pathname variable.
   *
   * @memberof Home
   */
  checkRoutes = () => {
    const { pathname } = this.props.location;

    switch (pathname) {
      case ROUTES.NEWNEWSSTORIES:
        return 'newnews';
      case ROUTES.TOPNEWSSTORIES:
        return 'topnews';
      case ROUTES.BESTNEWSSTORIES:
        return 'bestnews';
      default:
        return 'newnews';
    }
  };

  /**
   * @memberof Home
   */
  componentWillUnmount() {
    this.setState({ isLoading: false });
  }

  /**
   * @memberof Home
   * @param {Number} incrementFactor
   */
  handleUpdatae = incrementFactor => {
    this.setState({ currentPage: this.state.currentPage + incrementFactor });
    this.loadNewsFromIds();
  };

  /**
   * @returns Jsx for New news stories.
   * @memberof BestStories
   */
  render() {
    const { newsStories, NEXT_PAGE, PREVIOUS_PAGE, currentPage } = this.state;
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
                      isAuthenticated={isAuthenticated}
                      newsType={this.state.newsType}
                    />
                  </div>
                ))}
              </ul>
            </div>
            <div className="news-pagination">
              <button
                disabled={currentPage === 0 || currentPage < 0 ? true : false}
                onClick={() => this.handleUpdatae(NEXT_PAGE)}
                className="btn-floating btn-large waves-effect waves-light red previous-page"
              >
                <i className="fas fa-chevron-left" />
              </button>
              <button
                onClick={() => this.handleUpdatae(PREVIOUS_PAGE)}
                className="btn-floating btn-large waves-effect waves-light red next-page"
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
