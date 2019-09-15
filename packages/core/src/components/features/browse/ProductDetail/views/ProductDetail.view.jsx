import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, RichText } from '../../../../common/atoms';
import withStyles from '../../../../common/hoc/withStyles';
import ProductDetailStyle from '../ProductDetail.style';
import Product from '../molecules/Product/views/Product.view';
import FixedBreadCrumbs from '../../ProductListing/molecules/FixedBreadCrumbs/views';
import ProductImages from '../../../../common/organisms/ProductImages';

const ProductDetailView = ({ className, productDetails, longDescription, breadCrumbs }) => {
  const productImagesProps = {
    isZoomEnabled: true,
    images: [
      {
        isOnModalImage: false,
        iconSizeImageUrl:
          'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/125/2082931_IV.jpg',
        listingSizeImageUrl:
          'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/380/2082931_IV.jpg',
        regularSizeImageUrl:
          'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/500/2082931_IV.jpg',
        bigSizeImageUrl:
          'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/900/2082931_IV.jpg',
        superSizeImageUrl:
          'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/900/2082931_IV.jpg',
      },
      {
        isOnModalImage: false,
        iconSizeImageUrl:
          'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/125/2082931_IV-1.jpg',
        listingSizeImageUrl:
          'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/380/2082931_IV-1.jpg',
        regularSizeImageUrl:
          'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/500/2082931_IV-1.jpg',
        bigSizeImageUrl:
          'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/900/2082931_IV-1.jpg',
        superSizeImageUrl:
          'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/900/2082931_IV-1.jpg',
      },
    ],
    isThumbnailListVisible: true,
    productName: 'Girls Uniform Active Shorts',
  };
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
        <Col className="product-image-wrapper" colSize={{ small: 6, medium: 4, large: 7 }}>
          <ProductImages {...productImagesProps} />
        </Col>
        <Col
          id="productDetailsSection"
          className="product-detail-section"
          colSize={{ small: 6, medium: 4, large: 5 }}
        >
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
