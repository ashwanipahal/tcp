import React from 'react';
import PropTypes from 'prop-types';
import ExecutionEnvironment from 'exenv';
import { isClient } from '@tcp/core/src/utils';
import { Row, Col } from '../../../../common/atoms';
import FulfillmentSection from '../../../../common/organisms/FulfillmentSection';
import withStyles from '../../../../common/hoc/withStyles';
import ProductDetailStyle from '../ProductDetail.style';
import { PRODUCT_INFO_PROP_TYPE_SHAPE } from '../../ProductListing/molecules/ProductList/propTypes/productsAndItemsPropTypes';
import { breakpoints } from '../../../../../../styles/themes/TCP/mediaQuery';
import Product from '../molecules/Product/views/Product.view';
import FixedBreadCrumbs from '../../ProductListing/molecules/FixedBreadCrumbs/views';
import ProductAddToBagContainer from '../../../../common/molecules/ProductAddToBag';
import ProductPickupContainer from '../../../../common/organisms/ProductPickup';
import { getLocator } from '../../../../../utils';
import ProductDescription from '../molecules/ProductDescription/views';
import LoyaltyBanner from '../../../CnC/LoyaltyBanner';

import ProductImagesWrapper from '../molecules/ProductImagesWrapper/views/ProductImagesWrapper.view';
import AddedToBagContainer from '../../../CnC/AddedToBag';
import {
  getImagesToDisplay,
  getMapSliceForColorProductId,
  getMapSliceForColor,
} from '../../ProductListing/molecules/ProductList/utils/productsCommonUtils';
import ProductReviewsContainer from '../../ProductListing/molecules/ProductReviews/container/ProductReviews.container';

class ProductDetailView extends React.Component {
  constructor(props) {
    super(props);
    const {
      productInfo,
      productInfo: { colorFitsSizesMap },
    } = this.props;
    this.state = {
      currentColorEntry: getMapSliceForColorProductId(
        colorFitsSizesMap,
        productInfo.generalProductId
      ),
    };
  }

  onChangeColor = e => {
    const {
      productInfo: { colorFitsSizesMap },
    } = this.props;
    this.setState({ currentColorEntry: getMapSliceForColor(colorFitsSizesMap, e) });
  };

  render() {
    const {
      className,
      productDetails,
      longDescription,
      shortDescription,
      itemPartNumber,
      breadCrumbs,
      currency,
      productInfo,
      plpLabels,
      pdpLabels,
      handleAddToBag,
      addToBagError,
    } = this.props;
    const currentProduct = productDetails && productDetails.get('currentProduct');
    const isWeb =
      ExecutionEnvironment.canUseDOM && document.body.offsetWidth >= breakpoints.values.lg;
    let imagesToDisplay = [];
    const isProductDataAvailable = Object.keys(productInfo).length > 0;
    const { currentColorEntry } = this.state;
    if (isProductDataAvailable) {
      imagesToDisplay = getImagesToDisplay({
        imagesByColor: productInfo.imagesByColor,
        curentColorEntry: currentColorEntry,
        isAbTestActive: false,
        isFullSet: true,
      });

      imagesToDisplay = getImagesToDisplay({
        imagesByColor: productInfo.imagesByColor,
        curentColorEntry: currentColorEntry,
        isAbTestActive: false,
        isFullSet: true,
      });
    }

    return (
      <div className={className}>
        <Row>
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            {breadCrumbs && <FixedBreadCrumbs crumbs={breadCrumbs} separationChar=">" />}
          </Col>
        </Row>
        <Row className="placeholder product-detail-image-wrapper">
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <div className="promo-area-1">{pdpLabels.promoArea1}</div>
          </Col>
        </Row>
        <Row>
          <Col className="product-image-wrapper" colSize={{ small: 6, medium: 4, large: 7 }}>
            <ProductImagesWrapper
              productName={productInfo.name}
              isThumbnailListVisible={isWeb}
              images={imagesToDisplay}
              pdpLabels={pdpLabels}
              isZoomEnabled
            />
          </Col>
          <Col
            id="productDetailsSection"
            className="product-detail-section"
            colSize={{ small: 6, medium: 4, large: 5 }}
          >
            <Product productDetails={productDetails} currencySymbol={currency} />
            {currentProduct && (
              <ProductAddToBagContainer
                handleFormSubmit={handleAddToBag}
                errorOnHandleSubmit={addToBagError}
                currentProduct={currentProduct}
                plpLabels={plpLabels}
                onChangeColor={this.onChangeColor}
              />
            )}
            {productInfo && currentColorEntry && (
              <ProductPickupContainer
                productInfo={productInfo}
                formName={`ProductAddToBag-${productInfo.generalProductId}`}
                miscInfo={currentColorEntry.miscInfo}
                // onPickUpOpenClick={onPickUpOpenClick}
              />
            )}
            <div className="fulfillment-section">
              <FulfillmentSection
                btnClassName="added-to-bag"
                dataLocator={getLocator('global_addtocart_Button')}
                buttonLabel={plpLabels.addToBag}
                currentProduct={currentProduct}
              />
            </div>
            <LoyaltyBanner isProductDetailView />
          </Col>
        </Row>
        <Row className="placeholder">
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <div className="product-detail-section">{pdpLabels.promoArea3}</div>
          </Col>
        </Row>
        <Row>
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <div className="product-detail-section">
              <ProductDescription
                productId={itemPartNumber}
                isShowMore={false}
                pdpLabels={pdpLabels}
                shortDescription={shortDescription}
                longDescription={longDescription}
              />
            </div>
          </Col>
        </Row>
        <Row className="placeholder">
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <div className="product-detail-section">{pdpLabels.completeTheLook}</div>
          </Col>
        </Row>
        <Row className="placeholder">
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <div className="product-detail-section">{pdpLabels.youMayAlsoLike}</div>
          </Col>
        </Row>
        <Row className="placeholder">
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <div className="product-detail-section">{pdpLabels.recentlyViewed}</div>
          </Col>
        </Row>
        <Row className="placeholder">
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <div className="product-detail-section">{pdpLabels.myStylePlace}</div>
          </Col>
        </Row>
        <Row>
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <ProductReviewsContainer
              expanded={false}
              reviewsCount={productInfo.reviewsCount}
              ratingsProductId={productInfo.ratingsProductId}
              isClient={isClient()}
            />
          </Col>
        </Row>
        <AddedToBagContainer />
      </div>
    );
  }
}

ProductDetailView.propTypes = {
  className: PropTypes.string,
  addToBagError: PropTypes.string,
  handleAddToBag: PropTypes.func.isRequired,
  productDetails: PropTypes.shape({}),
  productInfo: PRODUCT_INFO_PROP_TYPE_SHAPE,
  shortDescription: PropTypes.string,
  itemPartNumber: PropTypes.string,
  longDescription: PropTypes.string,
  breadCrumbs: PropTypes.shape({}),
  pdpLabels: PropTypes.shape({}),
  currency: PropTypes.string,
  plpLabels: PropTypes.shape({
    lbl_sort: PropTypes.string,
  }),
};

ProductDetailView.defaultProps = {
  className: '',
  productDetails: {},
  longDescription: '',
  shortDescription: '',
  breadCrumbs: {},
  currency: '',
  plpLabels: {
    lbl_sort: '',
  },
  itemPartNumber: '',
  productInfo: {},
  pdpLabels: {},
  addToBagError: '',
};

export default withStyles(ProductDetailView, ProductDetailStyle);
