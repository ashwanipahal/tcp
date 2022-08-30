/** @module ProductRating
 */

import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '../../../../../common/hoc/withStyles';
import ProductRatingStyle from './ProductRating.style';

const renderCustomRatings = (ratings, reviews, className) => {
  return (
    <div className={`ranking-wrapper${className}`}>
      <div className="custom-ranking-container">
        {/* TODO - check if this is required in RWD - raise a dependency with Design team for image */
        /* eslint-disable-next-line */}
        <aside className="ranking-bar" style={{ fontSize: 0, width: `${(ratings / 5) * 100}%` }} />
        <img
          className="icons-image"
          src="/wcsstore/static/images/tcp-ranking-star.png"
          title="icon-stars"
          alt="Star Rating Icon"
        />
      </div>
      {!!reviews && <span className="qty-reviews">{`( ${reviews} )`}</span>}
    </div>
  );
};
const ProductRating = props => {
  const { ratingsProductId, ratings, reviews, className } = props;
  if (ratingsProductId) {
    return (
      <div
        id={`BVRRSummaryContainer-${ratingsProductId}`}
        className={`ranking-container${className}`}
      />
    );
  }
  return renderCustomRatings(ratings, reviews, className);
};

ProductRating.propTypes = {
  ratings: PropTypes.string.isRequired,
  reviews: PropTypes.string.isRequired,
  ratingsProductId: PropTypes.string,
  /* Rating of the product (float number between 0 and 5). */
};

ProductRating.defaultProps = {
  ratingsProductId: '',
};

export default withStyles(ProductRating, ProductRatingStyle);
