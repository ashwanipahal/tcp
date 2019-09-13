import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, RichText } from '../../../../common/atoms';
import withStyles from '../../../../common/hoc/withStyles';
import ProductDetailStyle from '../ProductDetail.style';
import Product from '../molecules/Product/views/Product.view';
import FixedBreadCrumbs from '../../ProductListing/molecules/FixedBreadCrumbs/views';

const ProductDetailView = ({
  className,
  productDetails,
  longDescription,
  breadCrumbs,
  defaultImage,
}) => {
  return (
    <div className={className}>
      <Row>
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          {/* <div className="promo-area-1">BREAD CRUMB</div> */}
          {breadCrumbs && <FixedBreadCrumbs crumbs={breadCrumbs} separationChar=">" />}
        </Col>
      </Row>
      <Row className="placeholder">
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          <div className="promo-area-1">PROMO AREA 1</div>
        </Col>
      </Row>
      <Row>
        <Col colSize={{ small: 6, medium: 8, large: 1 }}>
          <div className="side-tile">MINI TILE PDP</div>
        </Col>
        <Col colSize={{ small: 6, medium: 8, large: 6 }}>
          <div className="product-image-carousel">PRODUCT IMAGE CAROUSEL SECTION</div>
          <img src={defaultImage} alt="product" />
        </Col>
        <Col colSize={{ small: 6, medium: 8, large: 5 }}>
          <Product productDetails={productDetails} />
        </Col>
      </Row>
      <Row className="placeholder">
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          <div className="product-detail-section">PROMO AREA 3</div>
        </Col>
      </Row>
      <Row>
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          <div className="product-detail-section">
            <RichText richTextHtml={longDescription} />
          </div>
        </Col>
      </Row>
      <Row className="placeholder">
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          <div className="product-detail-section">COMPLETE THE LOOK</div>
        </Col>
      </Row>
      <Row className="placeholder">
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          <div className="product-detail-section">YOU MAY ALSO LIKE</div>
        </Col>
      </Row>
      <Row className="placeholder">
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          <div className="product-detail-section">RECENTLY VIEWED</div>
        </Col>
      </Row>
      <Row className="placeholder">
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          <div className="product-detail-section">MY STYLE PLACE</div>
        </Col>
      </Row>
      <Row className="placeholder">
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          <div className="product-detail-section">RATINGS AND REVIEWS</div>
        </Col>
      </Row>
    </div>
  );
};

ProductDetailView.propTypes = {
  className: PropTypes.string,
  productDetails: PropTypes.shape({}),
  longDescription: PropTypes.string,
  breadCrumbs: PropTypes.shape({}),
  defaultImage: PropTypes.string,
};

ProductDetailView.defaultProps = {
  className: '',
  productDetails: {},
  longDescription: '',
  breadCrumbs: {},
  defaultImage: '',
};

export default withStyles(ProductDetailView, ProductDetailStyle);
