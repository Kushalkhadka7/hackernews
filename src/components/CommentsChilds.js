import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import Comments from './Comments';
import { AppContext } from './AppContext';
import NEWSTYPE from '../constants/newsType';
import { ERRORS } from '../constants/message';
import * as hackerNewsServices from '../services/hackerNews';

/**
 * @class Comments
 * @augments {Component}
 */
class CommentsChilds extends React.Component {
  static contextType = AppContext;
  /**
   * Creates an instance of Comments.
   *
   * @param {*} props
   * @memberof Comments
   */
  constructor(props) {
    super(props);
    this.state = { commentsChild: null, newsType: NEWSTYPE.COMMENTS };
  }

  /**
   * @memberof Comments
   * Recursively calls api for each comments childrens.
   * Sets those childrens in state.
   */
  componentDidMount = () => {
    const kidsNews = this.props.data;

    if (kidsNews) {
      hackerNewsServices
        .getNews(this.state.newsType, kidsNews)
        .then(({ data }) =>
          this.setState({
            ...this.state.commentsChild,
            commentsChild: data
          })
        )
        .catch(error => error);
    } else {
      this.setState({ errors: ERRORS.CHILD_COMMENTS_NOT_FOUND });
    }
  };

  /**
   * @returns {jsx} Jsx to display comments.
   */
  render() {
    const { commentsChild } = this.state;
    const { isAuthenticated } = this.context;

    return (
      <React.Fragment>
        {isAuthenticated ? (
          commentsChild ? (
            <div>
              <li className="comment-list" key={commentsChild.id}>
                <div className="newsAuthor">
                  author:<span className="authorName"> {commentsChild.by}</span>
                </div>
                <span className="newsSpan">{commentsChild.text}</span>
                <span className="created-date ">
                  createdAt: {new Date(commentsChild.time).toLocaleString()}
                </span>
                <div className="child-comment">
                  <Comments data={commentsChild.kids} />
                </div>
              </li>
            </div>
          ) : (
            <div className="loader">
              <div className="preloader-wrapper active">
                <div className="spinner-layer spinner-red-only">
                  <div className="circle-clipper left">
                    <div className="circle" />
                  </div>
                  <div className="gap-patch">
                    <div className="circle" />
                  </div>
                  <div className="circle-clipper right">
                    <div className="circle" />
                  </div>
                </div>
              </div>
            </div>
          )
        ) : (
          <Redirect to="/login" />
        )}
      </React.Fragment>
    );
  }
}

CommentsChilds.porpTypes = {
  commentsChild: PropTypes.object.isRequired
};

export default CommentsChilds;
