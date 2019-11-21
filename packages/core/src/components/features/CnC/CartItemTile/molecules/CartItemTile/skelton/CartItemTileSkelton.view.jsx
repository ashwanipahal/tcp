import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import LoaderSkelton from '@tcp/core/src/components/common/molecules/LoaderSkelton';
import { Row, Col } from '../../../../../../common/atoms';
import styles from './CartItemTileSkelton.style';

const CartItemTileSkeleton = ({ className }) => {
  return (
    <div className={`${className} tile-header`}>
      <Row fullBleed className="product product-tile-wrapper">
        <Col
          key="productDetails"
          className="align-product-img product-brand-img-wrapper"
          colSize={{ small: 1, medium: 2, large: 3 }}
        >
          <div className="imageWrapper">
            <LoaderSkelton />
          </div>
          <div className="logoWrapper">
            <LoaderSkelton />
          </div>
        </Col>
        <Col
          className="bag-product-detail-wrapper"
          key="productDetails"
          colSize={{ small: 5, medium: 6, large: 9 }}
        >
          <div className="badge-wrapper">
            <LoaderSkelton />
          </div>
          <Row className="product-detail-row">
            <Col className="productImgBrand" colSize={{ small: 5, medium: 8, large: 12 }}>
              <LoaderSkelton />
            </Col>
          </Row>
          <div className="product-upc">
            <LoaderSkelton />
          </div>
          <Row className="product-detail-row label-responsive-wrapper padding-top-10">
            <LoaderSkelton />
          </Row>
          <div className="product-price">
            <LoaderSkelton />
          </div>
          <div className="product-points">
            <LoaderSkelton />
          </div>
          <div className="save-for-later">
            <LoaderSkelton />
          </div>
          <div className="edit">
            <LoaderSkelton />
          </div>
        </Col>
      </Row>
      <Row fullBleed>
        <Row fullBleed className="row-border-top-middle">
          <div className="cart-item-radio-button-top">
            <LoaderSkelton />
          </div>
        </Row>
        <Row fullBleed className="row-border-top-middle">
          <div className="cart-item-radio-button-middle">
            <LoaderSkelton />
          </div>
        </Row>
        <Row fullBleed className="row-border-bottom">
          <div className="cart-item-radio-button-bottom">
            <LoaderSkelton />
          </div>
        </Row>
      </Row>
    </div>
  );
};

CartItemTileSkeleton.propTypes = {
  className: PropTypes.string.isRequired,
};

export default withStyles(CartItemTileSkeleton, styles);
export { CartItemTileSkeleton as CartItemTileSkeletonVanilla };
