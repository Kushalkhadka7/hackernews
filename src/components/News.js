import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';

import { AppContext } from './AppContext';

/**
 * @class News
 * @extends {Component}
 */
class News extends React.PureComponent {
  static contextType = AppContext;
  /**
   * @memberof News
   * @returns {number}
   */
  render() {
    const { news } = this.props;
    const { isAuthenticated } = this.context;

    return (
      <React.Fragment>
        {isAuthenticated ? (
          <React.Fragment>
            {news ? (
              <li>
                <div className="card each-list">
                  <div
                    className="news-content"
                    onClick={() => (window.location.href = news.url)}
                  >
                    <div className="newsAuthor">
                      author:<span className="authorName"> {news.by}</span>
                    </div>
                    <span className="newsSpan">{news.title}</span>
                    <span className="created-date ">
                      createdAt: {new Date(news.time).toLocaleString()}
                    </span>
                  </div>
                  <div className="link-to-comments clearfix">
                    <Link
                      to={{
                        pathname: `/news/${news.id}`,
                        state: {
                          data: this.props,
                          isAuthenticated: isAuthenticated
                        }
                      }}
                    >
                      comments
                      {news.kids ? (
                        <span className="new badge blue">
                          {news.kids.length}
                        </span>
                      ) : (
                        <span />
                      )}
                    </Link>
                  </div>
                </div>
              </li>
            ) : (
              <div className="progress progress-bar">
                <div className="indeterminate" />
              </div>
            )}
          </React.Fragment>
        ) : (
          <Redirect to="/login" />
        )}
      </React.Fragment>
    );
  }
}

News.porpTypes = {
  news: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

export default News;
