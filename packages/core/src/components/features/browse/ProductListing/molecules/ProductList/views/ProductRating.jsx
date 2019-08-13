/** @module ProductRating
 *
 * @author Florencia Acosta <facosta@minutentag.com>
 */

import React from 'react';
import { PropTypes } from 'prop-types';
/* eslint-disable */
export class ProductRating extends React.Component {
  static propTypes = {
    ratings: PropTypes.string.isRequired,
    reviews: PropTypes.string.isRequired,
    ratingsProductId: PropTypes.string,
    /* Rating of the product (float number between 0 and 5). */
  };

  renderCustomRatings() {
    let { ratings, reviews } = this.props;
    return (
      <div className="ranking-wrapper">
        <div className="custom-ranking-container">
          <aside
            className="ranking-bar"
            style={{ fontSize: 0, width: `${(ratings / 5) * 100}%` }}
          />
          <img
            className="icons-image"
            src="/wcsstore/static/images/tcp-ranking-star.png"
            title="icon-stars"
            alt="Star Rating Icon"
          />
        </div>
        {!!reviews && <span className="qty-reviews">{'(' + reviews + ')'}</span>}
      </div>
    );
  }

  render() {
    let { ratingsProductId } = this.props;
    if (ratingsProductId) {
      return <div id={'BVRRSummaryContainer-' + ratingsProductId} className="ranking-container" />;
    } else {
      return this.renderCustomRatings();
    }
  }
}
