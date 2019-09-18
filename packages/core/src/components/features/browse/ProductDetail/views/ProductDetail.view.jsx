import React from 'react';
import PropTypes from 'prop-types';
import ExecutionEnvironment from 'exenv';
import { Row, Col, RichText } from '../../../../common/atoms';
import withStyles from '../../../../common/hoc/withStyles';
import ProductDetailStyle from '../ProductDetail.style';
import { breakpoints } from '../../../../../../styles/themes/TCP/mediaQuery';
import Product from '../molecules/Product/views/Product.view';
import FixedBreadCrumbs from '../../ProductListing/molecules/FixedBreadCrumbs/views';
import ProductImages from '../../../../common/organisms/ProductImages';
import {
  getImagesToDisplay,
  getMapSliceForColorProductId,
} from '../../ProductListing/molecules/ProductList/utils/productsCommonUtils';

const ProductDetailView = ({
  className,
  productDetails,
  longDescription,
  breadCrumbs,
  currency,
  productInfo,
}) => {
  const isWeb =
    ExecutionEnvironment.canUseDOM && document.body.offsetWidth >= breakpoints.values.lg;
  let imagesToDisplay = [];
  if (Object.keys(productInfo).length !== 0 && productInfo.constructor === Object) {
    const colorProduct = getMapSliceForColorProductId(
      productInfo.colorFitsSizesMap,
      /* colorProductId would not be hard coded and it will be replaced in near future when it done */
      productInfo.colorFitsSizesMap[0].colorProductId
    );
    imagesToDisplay = getImagesToDisplay({
      imagesByColor: productInfo.imagesByColor,
      curentColorEntry: colorProduct,
      isAbTestActive: false,
      isFullSet: true,
    });
  }

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
          {!!imagesToDisplay.length && (
            <ProductImages
              productName={productInfo.name}
              isThumbnailListVisible={isWeb}
              images={imagesToDisplay}
              isZoomEnabled
            />
          )}
        </Col>
        <Col
          id="productDetailsSection"
          className="product-detail-section"
          colSize={{ small: 6, medium: 4, large: 5 }}
        >
          <Product productDetails={productDetails} currencySymbol={currency} />
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
  productInfo: PropTypes.shape({}),
  longDescription: PropTypes.string,
  breadCrumbs: PropTypes.shape({}),
  currency: PropTypes.string,
};

ProductDetailView.defaultProps = {
  className: '',
  productDetails: {},
  longDescription: '',
  breadCrumbs: {},
  currency: '',
  productInfo: {},
};

export default withStyles(ProductDetailView, ProductDetailStyle);
