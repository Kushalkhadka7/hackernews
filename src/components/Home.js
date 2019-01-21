import React from 'react';
import { Redirect } from 'react-router-dom';

import News from './News';
import * as services from '../services/hackerNews';

/**
 * @class Home
 * @extends {React.PureComponent}
 */
class Home extends React.PureComponent {
  /**
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
      newsStories: []
    };
    this.newsType = '';
    this.isLoading = false;
    this.newsStoriesIds = [];
  }

  /**
   * @memberof Home
   * Fetch news from api.
   * Pass the data from api to function setDataToState.
   */
  async componentDidMount() {
    this.newsType = await this.checkRoutes();

    this.isLoading = true;
    if (this.isLoading) {
      this.newsStoriesIds = await services.getNews(this.newsType);

      this.loadNewsFromIds();
    }
  }

  /**
   * Loads news headlines using the ids that have been fetched in first api call.
   * Sets the news data to array newsStories in state.
   *
   * @memberof Home
   */
  loadNewsFromIds = () => {
    this.setState({
      newsStories: []
    });
    const initialRenderState = this.state.currentPage * 10;

    for (let i = initialRenderState; i < initialRenderState + 10; i++) {
      const newsData = services.getNews(this.newsType, this.newsStoriesIds[i]);

      newsData
        .then(data =>
          this.setState({
            newsStories: [...this.state.newsStories, data.data]
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
      case '/':
        return 'newnews';
      case '/topstories':
        return 'topnews';
      case '/beststories':
        return 'bestnews';
      default:
        return 'newnews';
    }
  };

  /**
   * @memberof Home
   */
  componentWillUnmount() {
    this.isLoading = false;
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
    const { newsStories } = this.state;
    const { isAuthenticated } = this.props;
    const CHANGE_PAGE_STATE = -1;

    return (
      <React.Fragment>
        {isAuthenticated ? (
          <React.Fragment>
            <div className="container local-container list-container">
              <ul>
                {newsStories.map((value, index) => (
                  <div key={index}>
                    <News news={value} index={index} newsType={this.newsType} />
                  </div>
                ))}
              </ul>
            </div>
            <div className="news-pagination">
              <button
                onClick={() => this.handleUpdatae(CHANGE_PAGE_STATE)}
                className="btn-floating btn-large waves-effect waves-light red previous-page"
              >
                <i className="fas fa-chevron-left" />
              </button>
              <button
                onClick={() => this.handleUpdatae(CHANGE_PAGE_STATE)}
                className="btn-floating btn-large waves-effect waves-light red next-page"
              >
                <i className="fas fa-chevron-right" />
              </button>
            </div>
          </React.Fragment>
        ) : (
          <Redirect to="/login" />
        )}
      </React.Fragment>
    );
  }
}

export default Home;
