import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import LoaderSkelton from '../../../../../../common/molecules/LoaderSkelton';
import { Row } from '../../../../../../common/atoms';
import styles from '../styles/BundleProductItemsSkeleton.style';

const BundleProductItemsSkeleton = ({ className }) => {
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
          <div className="product-overview-detail-wrapper">
            <div className="product-image">
              <LoaderSkelton />
            </div>
            <div className="product-title-price-wrapper">
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
            </div>
          </div>
          <div className="product-add-to-bag">
            <LoaderSkelton />
          </div>
        </div>
      </Row>
    </div>
  );
};

BundleProductItemsSkeleton.propTypes = {
  className: PropTypes.string.isRequired,
};

export default withStyles(BundleProductItemsSkeleton, styles);
export { BundleProductItemsSkeleton as BundleProductItemsSkeletonVanilla };
