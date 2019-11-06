import React from 'react';
import PropTypes from 'prop-types';
import ExecutionEnvironment from 'exenv';
import { isClient } from '@tcp/core/src/utils';
import { Row, Col, BodyCopy, Image } from '../../../../common/atoms';
import withStyles from '../../../../common/hoc/withStyles';
import ProductDetailStyle, { customSubmitButtonStyle } from '../ProductDetail.style';
import { PRODUCT_INFO_PROP_TYPE_SHAPE } from '../../ProductListing/molecules/ProductList/propTypes/productsAndItemsPropTypes';
import { breakpoints } from '../../../../../../styles/themes/TCP/mediaQuery';
import Product from '../molecules/Product/views/Product.view';
import FixedBreadCrumbs from '../../ProductListing/molecules/FixedBreadCrumbs/views';
import ProductAddToBagContainer from '../../../../common/molecules/ProductAddToBag';
import { SIZE_CHART_LINK_POSITIONS } from '../../../../common/molecules/ProductAddToBag/views/ProductAddToBag.view';
import ProductPickupContainer from '../../../../common/organisms/ProductPickup';
import { routerPush, getIconPath } from '../../../../../utils';
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
import RelatedOutfits from '../molecules/RelatedOutfits/views';

class ProductDetailView extends React.Component {
  constructor(props) {
    super(props);
    this.formValues = null;
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
      renderReceiveProps: false,
      initialValues: {},
    };
  }

  onChangeColor = (e, selectedSize, selectedFit, selectedQuantity) => {
    const {
      productInfo: { colorFitsSizesMap },
    } = this.props;
    this.setState({
      currentColorEntry: getMapSliceForColor(colorFitsSizesMap, e),
      renderReceiveProps: true,
    });
    this.formValues = {
      Fit: selectedFit,
      Size: selectedSize,
      color: e,
      Quantity: selectedQuantity,
    };
  };

  setInitialValues = initialValues => {
    this.setState({
      initialValues,
    });
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
    const {
      productDetails,
      productInfo,
      currency,
      pdpLabels,
      currencyExchange,
      onAddItemToFavorites,
      isLoggedIn,
      ...otherProps
    } = this.props;
    const { currentGiftCardValue, currentColorEntry } = this.state;
    const selectedColorProductId = currentColorEntry.colorProductId;

    return (
      <div className="product-summary-wrapper">
        <Product
          isGiftCard={productInfo.isGiftCard}
          productDetails={productDetails}
          currencySymbol={currency}
          selectedColorProductId={selectedColorProductId}
          currencyExchange={currencyExchange}
          onAddItemToFavorites={onAddItemToFavorites}
          isLoggedIn={isLoggedIn}
          {...otherProps}
        />
        {productInfo.isGiftCard ? (
          <div className="product-price-desktop-view">
            <ProductPrice
              offerPrice={parseInt(currentGiftCardValue, 10)}
              listPrice={parseInt(currentGiftCardValue, 10)}
              currencySymbol={currency}
              currencyExchange={currencyExchange}
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
    const { productInfo, currency, currencyExchange } = this.props;
    const { currentGiftCardValue } = this.state;
    return productInfo.isGiftCard ? (
      <div className="product-price-mobile-view">
        <ProductPrice
          listPrice={parseInt(currentGiftCardValue, 10)}
          offerPrice={parseInt(currentGiftCardValue, 10)}
          currencyExchange={currencyExchange}
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
      alternateSizes,
    } = this.props;
    const currentProduct = productDetails && productDetails.get('currentProduct');
    const isWeb = this.isWebEnvironment();
    let imagesToDisplay = [];
    const isProductDataAvailable = Object.keys(productInfo).length > 0;
    const { currentColorEntry, renderReceiveProps, initialValues } = this.state;
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
    const sizeChartLinkVisibility = !isGiftCard ? SIZE_CHART_LINK_POSITIONS.AFTER_SIZE : null;

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
              initialValues={initialValues}
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
                renderReceiveProps={renderReceiveProps}
                initialFormValues={this.formValues}
                getProductInitialValues={this.setInitialValues}
                isPDP
                alternateSizes={alternateSizes}
                sizeChartLinkVisibility={sizeChartLinkVisibility}
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
            {<LoyaltyBanner isProductDetailView />}
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
        <Row>
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <div className="product-detail-section">
              <RelatedOutfits pdpLabels={pdpLabels} selectedColorProductId={itemPartNumber} />
            </div>
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
  currencyExchange: PropTypes.string,
  plpLabels: PropTypes.shape({
    lbl_sort: PropTypes.string,
  }),
  onAddItemToFavorites: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool,
  alternateSizes: PropTypes.shape({
    key: PropTypes.string,
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
  currencyExchange: 1,
  isLoggedIn: false,
  alternateSizes: {},
};

export default withStyles(ProductDetailView, ProductDetailStyle);
