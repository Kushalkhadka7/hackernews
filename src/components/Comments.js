import React from 'react';

import CommentsChilds from './CommentsChilds';
import * as services from '../services/hackerNews';

/**
 * @class Comments
 * @augments {Component}
 */
class Comments extends React.Component {
  /**
   * Creates an instance of Comments.
   *
   * @param {*} props
   * @memberof Comments
   */
  constructor(props) {
    super(props);
    this.state = {
      errors: '',
      comments: []
    };
    this.newsType = 'comments';
  }

  /**
   * Api call here.
   */
  componentDidMount() {
    const { kids } = this.props.history.location.state.data.news;

    if (kids) {
      kids.forEach(kid => {
        services
          .getNews(this.newsType, null, kid)
          .then(data =>
            this.setState({
              comments: [...this.state.comments, data.data]
            })
          )
          .catch(error => error);
      });
    } else {
      this.setState({ errors: 'no comments to display' });
    }
  }

  /**
   * Render comments.
   */
  render() {
    const { comments, errors } = this.state;

    return (
      <div className="container local-container list-container">
        {comments.length !== 0 ? (
          <ul>
            {comments.map(data => (
              <CommentsChilds data={data} key={data.id} />
            ))}
          </ul>
        ) : (
          <React.Fragment>
            {errors}
            <div className="progress progress-bar">
              <div className="indeterminate" />
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Comments;
