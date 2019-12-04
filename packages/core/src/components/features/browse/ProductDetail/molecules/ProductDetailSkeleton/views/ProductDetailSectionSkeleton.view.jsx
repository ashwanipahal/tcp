import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import LoaderSkelton from '../../../../../../common/molecules/LoaderSkelton';
import { Row } from '../../../../../../common/atoms';
import styles from '../styles/ProductDetailSkeleton.style';

const ProductDetailSectionSkeleton = ({ className }) => {
  return (
    <div className={`${className} product-detail-section`}>
      <Row fullBleed className="product-detail-skeleton-wrapper">
        <div className="product-overview-wrapper product-overview-section">
          <div className="product-color">
            <LoaderSkelton />
          </div>
          <div className="product-color">
            <LoaderSkelton />
          </div>
          <div className="product-size">
            <LoaderSkelton />
          </div>
          <div className="loyality-banner">
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

ProductDetailSectionSkeleton.propTypes = {
  className: PropTypes.string.isRequired,
};

const StyledProductDetailSectionSkeleton = withStyles(ProductDetailSectionSkeleton, styles);

export default StyledProductDetailSectionSkeleton;
export { StyledProductDetailSectionSkeleton as ProductDetailSectionSkeleton };
