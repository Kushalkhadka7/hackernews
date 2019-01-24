import React from 'react';
import * as services from '../services/hackerNews';

/**
 * @class SingelNews
 * @augments {Component}
 */
class SingelNews extends React.Component {
  /**
   * Creates an instance of SingelNews.
   *
   * @param {*} props
   * @memberof SingelNews
   */
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      errors: ''
    };
    this.newsData = 'comments';
  }

  /**
   * Api call here.
   */
  componentDidMount() {
    const kidsNews = this.props.history.location.state.data.news.kids;

    if (kidsNews) {
      kidsNews.forEach(kid => {
        services
          .getComments(this.newsData, kid)
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
            {comments.map((data, index) => (
              <li className="comment-list" key={index}>
                {data.text}
              </li>
            ))}
          </ul>
        ) : (
          <div> {errors}</div>
        )}
      </div>
    );
  }
}

export default SingelNews;
