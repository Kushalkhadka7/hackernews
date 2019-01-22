import React from 'react';
import * as services from '../services/hackerNews';

/**
 * @class Comments
 * @augments {Component}
 */
class CommentsChilds extends React.Component {
  /**
   * Creates an instance of Comments.
   *
   * @param {*} props
   * @memberof Comments
   */
  constructor(props) {
    super(props);
    this.state = { commentsChilds: [] };
    this.newsType = 'comments';
  }

  /**
   * @memberof Comments
   * Recursively calls api for each comments childrens.
   * Sets those childrens in state.
   */
  componentDidMount = () => {
    const { kids } = this.props.data;

    if (kids) {
      kids.forEach(kid => {
        services
          .getNews(this.newsType, kid)
          .then(data =>
            this.setState({
              commentsChilds: [...this.state.commentsChilds, data.data]
            })
          )
          .catch(error => error);
      });
    } else {
      this.setState({ errors: 'no commentsChilds to display' });
    }
  };

  /**
   * @returns
   * @memberof commentsChilds
   */
  render() {
    const { data } = this.props;

    return (
      <div>
        <li className="comment-list" key={data.id}>
          {data.text}
          <p className="created-date">
            {' '}
            createdAt: {new Date(data.time).toLocaleString()}
          </p>
        </li>
        {this.state.commentsChilds ? (
          this.state.commentsChilds.map(value => (
            <div className="child-comment" key={value.id}>
              <CommentsChilds data={value} key={value.id} />
            </div>
          ))
        ) : (
          <div className="progress progress-bar">
            <div className="indeterminate" />
          </div>
        )}
      </div>
    );
  }
}

export default CommentsChilds;
