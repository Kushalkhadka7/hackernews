import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import ROUTES from '../constants/routes';
import { AppContext } from './AppContext';
import { ERRORS } from '../constants/message';
import CommentsChilds from './CommentsChilds';

/**
 * @class Comments
 * @augments {Component}
 */
class Comments extends React.Component {
  static contextType = AppContext;
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
      comments: [],
      newsType: 'comments'
    };
  }

  /**
   * @returns {number} Comments.
   */
  render() {
    const { isAuthenticated } = this.context;
    const kidsNewsId = this.props.history
      ? this.props.history.location.state.data.news.kids
      : this.props.data;

    return (
      <React.Fragment>
        {isAuthenticated ? (
          <div className="container local-container list-container">
            {kidsNewsId ? (
              <ul>
                {kidsNewsId.map(data => (
                  <CommentsChilds data={data} key={data.id} />
                ))}
              </ul>
            ) : (
              <div>{ERRORS.COMMENTS_NOT_FOUND}</div>
            )}
          </div>
        ) : (
          <Redirect to={ROUTES.LOGINSIGNUP} />
        )}
      </React.Fragment>
    );
  }
}

Comments.porpTypes = {
  props: PropTypes.object.isRequired
};

export default Comments;
