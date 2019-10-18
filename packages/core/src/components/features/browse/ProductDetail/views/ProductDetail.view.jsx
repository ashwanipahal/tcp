import React from 'react';
import PropTypes from 'prop-types';
import ExecutionEnvironment from 'exenv';
import { isClient, isCanada } from '@tcp/core/src/utils';
import { Row, Col, BodyCopy, Image } from '../../../../common/atoms';
import FulfillmentSection from '../../../../common/organisms/FulfillmentSection';
import withStyles from '../../../../common/hoc/withStyles';
import ProductDetailStyle, { customSubmitButtonStyle } from '../ProductDetail.style';
import { PRODUCT_INFO_PROP_TYPE_SHAPE } from '../../ProductListing/molecules/ProductList/propTypes/productsAndItemsPropTypes';
import { breakpoints } from '../../../../../../styles/themes/TCP/mediaQuery';
import Product from '../molecules/Product/views/Product.view';
import FixedBreadCrumbs from '../../ProductListing/molecules/FixedBreadCrumbs/views';
import ProductAddToBagContainer from '../../../../common/molecules/ProductAddToBag';
import ProductPickupContainer from '../../../../common/organisms/ProductPickup';
import { getLocator, routerPush, getIconPath } from '../../../../../utils';
import ProductDescription from '../molecules/ProductDescription/views';
import LoyaltyBanner from '../../../CnC/LoyaltyBanner';
import ProductPrice from '../molecules/ProductPrice/ProductPrice';

import ProductImagesWrapper from '../molecules/ProductImagesWrapper/views/ProductImagesWrapper.view';
import AddedToBagContainer from '../../../CnC/AddedToBag';
import {
  getImagesToDisplay,
  getMapSliceForColorProductId,
  getMapSliceForColor,
} from '../../ProductListing/molecules/ProductList/utils/productsCommonUtils';
import ProductReviewsContainer from '../../ProductListing/molecules/ProductReviews/container/ProductReviews.container';
import SendAnEmailGiftCard from '../molecules/SendAnEmailGiftCard';

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
      currentGiftCardValue: productInfo.offerPrice,
    };
  }

  onChangeColor = e => {
    const {
      productInfo: { colorFitsSizesMap },
    } = this.props;
    this.setState({ currentColorEntry: getMapSliceForColor(colorFitsSizesMap, e) });
  };

  onChangeSize = e => {
    this.setState({ currentGiftCardValue: e });
  };

  onGoBack = e => {
    e.preventDefault();
    if (window.history.length > 2) window.history.back();
    else {
      routerPush('/', '/home');
    }
  };

  getProductSummary = () => {
    const { productDetails, productInfo, currency, pdpLabels } = this.props;
    const { currentGiftCardValue, currentColorEntry } = this.state;
    const selectedColorProductId = currentColorEntry.colorProductId;
    return (
      <div className="product-summary-wrapper">
        <Product
          isGiftCard={productInfo.isGiftCard}
          productDetails={productDetails}
          currencySymbol={currency}
          selectedColorProductId={selectedColorProductId}
        />
        {productInfo.isGiftCard ? (
          <div className="product-price-desktop-view">
            <ProductPrice
              offerPrice={parseInt(currentGiftCardValue, 10)}
              listPrice={parseInt(currentGiftCardValue, 10)}
              currencySymbol={currency}
              isGiftCard={productInfo.isGiftCard}
            />
          </div>
        ) : null}
        {productInfo.isGiftCard ? (
          <Row fullBleed className="placeholder">
            <Col colSize={{ small: 6, medium: 8, large: 12 }}>
              <div className="product-detail-section">{pdpLabels.promoArea}</div>
            </Col>
          </Row>
        ) : null}
      </div>
    );
  };

  isWebEnvironment = () => {
    return ExecutionEnvironment.canUseDOM && document.body.offsetWidth >= breakpoints.values.lg;
  };

  getBreadCrumb = () => {
    const { pdpLabels, productInfo, breadCrumbs } = this.props;
    return productInfo.isGiftCard ? (
      <div className="go-back-container">
        <button type="button" onClick={this.onGoBack} className="button-go-back">
          <Image src={getIconPath('medium-left-arrow')} />
          <BodyCopy className="back-button" fontFamily="secondary" fontSize="fs16">
            {pdpLabels.back}
          </BodyCopy>
        </button>
      </div>
    ) : (
      breadCrumbs && <FixedBreadCrumbs crumbs={breadCrumbs} separationChar=">" />
    );
  };

  getSendAnEmailComponent = () => {
    const { pdpLabels, productInfo } = this.props;
    return productInfo.isGiftCard ? <SendAnEmailGiftCard pdpLabels={pdpLabels} /> : null;
  };

  getProductPriceForGiftCard = () => {
    const { productInfo, currency } = this.props;
    const { currentGiftCardValue } = this.state;
    return productInfo.isGiftCard ? (
      <div className="product-price-mobile-view">
        <ProductPrice
          listPrice={parseInt(currentGiftCardValue, 10)}
          offerPrice={parseInt(currentGiftCardValue, 10)}
          currencySymbol={currency}
        />
      </div>
    ) : null;
  };

  render() {
    const {
      className,
      productDetails,
      longDescription,
      shortDescription,
      itemPartNumber,
      productInfo,
      plpLabels,
      pdpLabels,
      handleAddToBag,
      addToBagError,
    } = this.props;
    const currentProduct = productDetails && productDetails.get('currentProduct');
    const isWeb = this.isWebEnvironment();
    let imagesToDisplay = [];
    const isProductDataAvailable = Object.keys(productInfo).length > 0;
    const { currentColorEntry } = this.state;
    const selectedColorProductId = currentColorEntry.colorProductId;

    if (isProductDataAvailable) {
      imagesToDisplay = getImagesToDisplay({
        imagesByColor: productInfo.imagesByColor,
        curentColorEntry: currentColorEntry,
        isAbTestActive: false,
        isFullSet: true,
      });
    }

    const { isGiftCard } = productInfo;

    return (
      <div className={className}>
        <Row>
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>{this.getBreadCrumb()}</Col>
        </Row>
        <Row className="placeholder product-detail-image-wrapper">
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <div className="promo-area-1">{pdpLabels.promoArea1}</div>
          </Col>
        </Row>
        <Row>
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            {isGiftCard ? (
              <div className="product-summary-mobile-view">{this.getProductSummary()}</div>
            ) : null}
          </Col>
          <Col className="product-image-wrapper" colSize={{ small: 6, medium: 4, large: 7 }}>
            <ProductImagesWrapper
              productName={productInfo.name}
              isGiftCard={isGiftCard}
              isThumbnailListVisible={isWeb}
              images={imagesToDisplay}
              pdpLabels={pdpLabels}
              isZoomEnabled
              currentProduct={currentProduct}
              onChangeColor={this.onChangeColor}
              currentColorEntry={currentColorEntry}
            />
          </Col>
          <Col
            id="productDetailsSection"
            className="product-detail-section"
            colSize={{ small: 6, medium: 4, large: 5 }}
          >
            <div className={isGiftCard ? 'product-summary-desktop-view' : ''}>
              {this.getProductSummary()}
            </div>
            {this.getProductPriceForGiftCard()}
            {currentProduct && (
              <ProductAddToBagContainer
                handleFormSubmit={handleAddToBag}
                errorOnHandleSubmit={addToBagError}
                currentProduct={currentProduct}
                plpLabels={plpLabels}
                onChangeColor={this.onChangeColor}
                customSubmitButtonStyle={customSubmitButtonStyle}
                onChangeSize={this.onChangeSize}
                selectedColorProductId={selectedColorProductId}
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
            {!isCanada() && <LoyaltyBanner isProductDetailView />}
            {this.getSendAnEmailComponent()}
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
