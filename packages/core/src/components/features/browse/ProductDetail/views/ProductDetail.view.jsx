/* eslint-disable max-lines */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ExecutionEnvironment from 'exenv';
import { isClient } from '@tcp/core/src/utils';
import Constants from '@tcp/core/src/components/common/molecules/Recommendations/container/Recommendations.constants';
import Recommendations from '@tcp/web/src/components/common/molecules/Recommendations';
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
import {
  getImagesToDisplay,
  getMapSliceForColorProductId,
  getMapSliceForColor,
} from '../../ProductListing/molecules/ProductList/utils/productsCommonUtils';
import ProductReviewsContainer from '../../ProductListing/molecules/ProductReviews/container/ProductReviews.container';
import SendAnEmailGiftCard from '../molecules/SendAnEmailGiftCard';
import RelatedOutfits from '../molecules/RelatedOutfits/views';
import PromoPDPBanners from '../../../../common/organisms/PromoPDPBanners';

class ProductDetailView extends PureComponent {
  constructor(props) {
    super(props);
    this.formValues = null;
    const {
      productInfo: { colorFitsSizesMap, generalProductId, offerPrice },
    } = this.props;
    this.state = {
      currentColorEntry: getMapSliceForColorProductId(colorFitsSizesMap, generalProductId) || {},
      currentGiftCardValue: offerPrice,
      renderReceiveProps: false,
    };
  }

  onChangeColor = (e, selectedSize, selectedFit, selectedQuantity) => {
    const {
      productInfo: { colorFitsSizesMap },
    } = this.props;
    const { currentGiftCardValue } = this.state;
    this.setState({
      currentColorEntry: getMapSliceForColor(colorFitsSizesMap, e),
      renderReceiveProps: true,
      currentGiftCardValue:
        (getMapSliceForColor(colorFitsSizesMap, e) &&
          getMapSliceForColor(colorFitsSizesMap, e).offerPrice) ||
        currentGiftCardValue,
    });
    this.formValues = {
      Fit: selectedFit,
      Size: selectedSize,
      color: e,
      Quantity: selectedQuantity,
    };
  };

  onChangeSize = (selectedColor, e, selectedFit, selectedQuantity) => {
    this.setState({ currentGiftCardValue: e });
    this.formValues = {
      Fit: selectedFit,
      Size: e,
      color: selectedColor,
      Quantity: selectedQuantity,
    };
  };

  onGoBack = e => {
    e.preventDefault();
    if (window.history.length > 2) window.history.back();
    else {
      routerPush('/', '/home');
    }
  };

  getProductSummary = keepAlive => {
    const {
      productDetails,
      productInfo,
      currency,
      pdpLabels,
      currencyAttributes,
      onAddItemToFavorites,
      isLoggedIn,
      outOfStockLabels,
      AddToFavoriteErrorMsg,
      removeAddToFavoritesErrorMsg,
      ...otherProps
    } = this.props;
    const { currentGiftCardValue, currentColorEntry } = this.state;
    const selectedColorProductId = currentColorEntry && currentColorEntry.colorProductId;
    const { isGiftCard } = productInfo;
    return (
      <div className="product-summary-wrapper">
        <Product
          {...otherProps}
          isGiftCard={isGiftCard}
          productDetails={productDetails}
          currencySymbol={currency}
          selectedColorProductId={selectedColorProductId}
          currencyAttributes={currencyAttributes}
          onAddItemToFavorites={onAddItemToFavorites}
          isLoggedIn={isLoggedIn}
          keepAlive={keepAlive}
          outOfStockLabels={outOfStockLabels}
          className="hide-on-mobile"
          AddToFavoriteErrorMsg={AddToFavoriteErrorMsg}
          removeAddToFavoritesErrorMsg={removeAddToFavoritesErrorMsg}
        />
        {isGiftCard ? (
          <div className="product-price-desktop-view">
            <ProductPrice
              offerPrice={parseInt(currentGiftCardValue, 10)}
              listPrice={parseInt(currentGiftCardValue, 10)}
              currencySymbol={currency}
              currencyAttributes={currencyAttributes}
              isGiftCard={isGiftCard}
            />
          </div>
        ) : null}
        {isGiftCard ? (
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
      breadCrumbs && <FixedBreadCrumbs crumbs={breadCrumbs} separationChar=">" isPDPPage />
    );
  };

  getSendAnEmailComponent = () => {
    const { pdpLabels, productInfo } = this.props;
    return productInfo.isGiftCard ? <SendAnEmailGiftCard pdpLabels={pdpLabels} /> : null;
  };

  getProductPriceForGiftCard = () => {
    const { productInfo, currency, currencyAttributes } = this.props;
    const { currentGiftCardValue } = this.state;
    return productInfo.isGiftCard ? (
      <div className="product-price-mobile-view">
        <ProductPrice
          listPrice={parseInt(currentGiftCardValue, 10)}
          offerPrice={parseInt(currentGiftCardValue, 10)}
          currencyAttributes={currencyAttributes}
          currencySymbol={currency}
        />
      </div>
    ) : null;
  };

  // This is required for reommendations.
  getCatIdForRecommendation = () => {
    const { breadCrumbs } = this.props;
    if (breadCrumbs) {
      const category = breadCrumbs.map((crumb, index) => {
        const { displayName } = crumb;
        const separationChar = index !== breadCrumbs.length - 1 ? ':' : '';
        return displayName + separationChar;
      });
      return category.join('');
    }
    return '';
  };

  renderPromoBanner = promoBanners => {
    const { asPathVal } = this.props;
    return <PromoPDPBanners promos={promoBanners} asPath={asPathVal} />;
  };

  // eslint-disable-next-line complexity
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
      outOfStockLabels,
      handleAddToBag,
      addToBagError,
      alternateSizes,
      isKeepAliveEnabled,
      currency,
      currencyAttributes,
      onAddItemToFavorites,
      isLoggedIn,
      topPromos,
      middlePromos,
      bottomPromos,
      ...otherProps
    } = this.props;

    const { currentProduct } = productDetails;
    const isWeb = this.isWebEnvironment();
    let imagesToDisplay = [];
    const isProductDataAvailable = Object.keys(productInfo).length > 0;
    const { currentColorEntry, renderReceiveProps } = this.state;
    const selectedColorProductId = currentColorEntry && currentColorEntry.colorProductId;
    const keepAlive =
      isKeepAliveEnabled && currentColorEntry && currentColorEntry.miscInfo.keepAlive;
    const { imagesByColor } = productInfo;
    if (isProductDataAvailable) {
      imagesToDisplay = getImagesToDisplay({
        imagesByColor,
        curentColorEntry: currentColorEntry,
        isAbTestActive: false,
        isFullSet: true,
      });
    }

    const { isGiftCard } = productInfo;
    const sizeChartLinkVisibility = !isGiftCard ? SIZE_CHART_LINK_POSITIONS.AFTER_SIZE : null;

    const categoryId = this.getCatIdForRecommendation();
    const recommendationAttributes = {
      variations: 'moduleO',
      page: Constants.RECOMMENDATIONS_PAGES_MAPPING.PDP,
      categoryName: categoryId,
      partNumber: itemPartNumber,
      showLoyaltyPromotionMessage: false,
      headerAlignment: 'left',
    };

    return (
      <div className={className}>
        <Row>
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>{this.getBreadCrumb()}</Col>
        </Row>
        {topPromos && topPromos.length > 0 && (
          <Row>
            <Col className="promo-area-top" colSize={{ small: 6, medium: 8, large: 12 }}>
              {this.renderPromoBanner(topPromos)}
            </Col>
          </Row>
        )}
        <Row>
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            {isGiftCard ? (
              <div className="product-summary-mobile-view">{this.getProductSummary(keepAlive)}</div>
            ) : null}
          </Col>
          <Col className="product-image-wrapper" colSize={{ small: 6, medium: 4, large: 7 }}>
            <Product
              {...otherProps}
              isGiftCard={isGiftCard}
              productDetails={productDetails}
              currencySymbol={currency}
              selectedColorProductId={selectedColorProductId}
              currencyAttributes={currencyAttributes}
              onAddItemToFavorites={onAddItemToFavorites}
              isLoggedIn={isLoggedIn}
              reviewOnTop
            />
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
              initialValues={this.formValues}
              keepAlive={keepAlive}
              outOfStockLabels={outOfStockLabels}
            />
          </Col>
          <Col
            id="productDetailsSection"
            className="product-detail-section"
            colSize={{ small: 6, medium: 4, large: 5 }}
          >
            <div className={isGiftCard ? 'product-summary-desktop-view' : ''}>
              {this.getProductSummary(keepAlive)}
            </div>
            {this.getProductPriceForGiftCard()}
            {middlePromos && middlePromos.length > 0 && (
              <div className="promo-area-middle">{this.renderPromoBanner(middlePromos)}</div>
            )}
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
                isPDP
                alternateSizes={alternateSizes}
                sizeChartLinkVisibility={sizeChartLinkVisibility}
                isKeepAliveEnabled={isKeepAliveEnabled}
                outOfStockLabels={outOfStockLabels}
              />
            )}

            {productInfo && currentColorEntry && (
              <ProductPickupContainer
                productInfo={productInfo}
                formName={`ProductAddToBag-${productInfo.generalProductId}`}
                miscInfo={currentColorEntry.miscInfo}
                keepAlive={keepAlive}
                outOfStockLabels={outOfStockLabels}
                // onPickUpOpenClick={onPickUpOpenClick}
              />
            )}
            {<LoyaltyBanner pageCategory="isProductDetailView" />}
            {this.getSendAnEmailComponent()}
          </Col>
        </Row>
        {bottomPromos && bottomPromos.length > 0 && (
          <Row>
            <Col className="promo-area-bottom" colSize={{ small: 6, medium: 8, large: 12 }}>
              {this.renderPromoBanner(bottomPromos)}
            </Col>
          </Row>
        )}
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
        <Row>
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <div className={`${className} product-description-list`}>
              <Recommendations {...recommendationAttributes} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <div className="product-detail-section">
              <Recommendations
                headerLabel={pdpLabels.recentlyViewed}
                portalValue={Constants.RECOMMENDATIONS_MBOXNAMES.RECENTLY_VIEWED}
                {...recommendationAttributes}
              />
            </div>
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
  breadCrumbs: PropTypes.shape([]),
  pdpLabels: PropTypes.shape({}),
  currency: PropTypes.string,
  currencyAttributes: PropTypes.shape({}).isRequired,
  plpLabels: PropTypes.shape({
    lbl_sort: PropTypes.string,
  }),
  onAddItemToFavorites: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool,
  alternateSizes: PropTypes.shape({
    key: PropTypes.string,
  }),
  outOfStockLabels: PropTypes.shape({
    outOfStockCaps: PropTypes.string,
  }).isRequired,
  isKeepAliveEnabled: PropTypes.bool,
  AddToFavoriteErrorMsg: PropTypes.string,
  removeAddToFavoritesErrorMsg: PropTypes.func,
};

ProductDetailView.defaultProps = {
  className: '',
  productDetails: {},
  longDescription: '',
  shortDescription: '',
  breadCrumbs: [],
  currency: '',
  plpLabels: {
    lbl_sort: '',
  },
  itemPartNumber: '',
  productInfo: {},
  pdpLabels: {},
  addToBagError: '',
  isLoggedIn: false,
  alternateSizes: {},
  isKeepAliveEnabled: false,
  AddToFavoriteErrorMsg: '',
  removeAddToFavoritesErrorMsg: () => {},
};

export default withStyles(ProductDetailView, ProductDetailStyle);
