import React from 'react';
import { Link } from 'react-router-dom';

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
    const { news } = this.props;

    return (
      <React.Fragment>
        {news ? (
          <Link
            to={{ pathname: `/news/${news.id}`, state: { data: this.props } }}
          >
            <li>
              <div className="card each-list">{news.title}</div>
            </li>
          </Link>
        ) : (
          <div>loading...</div>
        )}
      </React.Fragment>
    );
  }
}

export default News;
