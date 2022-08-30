import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../hoc/withStyles';
import LoaderSkelton from '../../../../../molecules/LoaderSkelton';
import { Row } from '../../../../../atoms';
import styles from '../styles/QuickViewSkeleton.style';

const QuickViewSkeleton = ({ className }) => {
  return (
    <div className={className}>
      <Row fullBleed className="product-detail-skeleton-wrapper">
        <div className="product-main-image">
          <LoaderSkelton />
        </div>
        <div className="product-overview-wrapper">
          <div className="product-title">
            <LoaderSkelton />
          </div>
          <div className="product-price">
            <LoaderSkelton />
          </div>
          <div className="product-color">
            <LoaderSkelton />
          </div>
          <div className="product-size">
            <LoaderSkelton />
          </div>
          <div className="product-add-to-bag">
            <LoaderSkelton />
          </div>
        </div>
      </Row>
    </div>
  );
};

QuickViewSkeleton.propTypes = {
  className: PropTypes.string.isRequired,
};

export default withStyles(QuickViewSkeleton, styles);
export { QuickViewSkeleton as QuickViewSkeletonVanilla };
