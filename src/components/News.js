import React from 'react';
import { Redirect, Link } from 'react-router-dom';

/**
 * @class News
 * @extends {Component}
 */
class News extends React.PureComponent {
  /**
   * @returns Render News to dom.
   * @memberof News
   */
  render() {
    const { news, isAuthenticated } = this.props;

    return (
      <React.Fragment>
        {isAuthenticated ? (
          <React.Fragment>
            {news ? (
              <Link
                to={{
                  pathname: `/news/${news.id}`,
                  state: { data: this.props, isAuthenticated: isAuthenticated }
                }}
              >
                <li>
                  <div className="card each-list">
                    {news.title}
                    <p className="created-date ">
                      createdAt: {new Date(news.time).toLocaleString()}
                    </p>
                  </div>
                </li>
              </Link>
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

export default News;
