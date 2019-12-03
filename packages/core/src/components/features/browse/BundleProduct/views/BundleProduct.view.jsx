import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from '@tcp/core/src/components/common/atoms';
import RenderPerf from '@tcp/web/src/components/common/molecules/RenderPerf';
import { PROMOTION_VISIBLE } from '@tcp/core/src/constants/rum.constants';
import Constants from '@tcp/core/src/components/common/molecules/Recommendations/container/Recommendations.constants';
import Recommendations from '@tcp/web/src/components/common/molecules/Recommendations';
import Carousel from '../../../../common/molecules/Carousel';
import withStyles from '../../../../common/hoc/withStyles';
import styles from '../styles/BundleProduct.style';
import ProductDescription from '../../ProductDetail/molecules/ProductDescription/views';
import FixedBreadCrumbs from '../../ProductListing/molecules/FixedBreadCrumbs/views';
import SocialConnect from '../../../../common/organisms/ProductImages/views/SocialConnect.view';
import Product from '../../ProductDetail/molecules/Product/views/Product.view';
import ProductDetailImage from '../../../../common/molecules/ProductDetailImage';
import BundleProductItems from '../molecules/BundleProductItems';
import config from './config';
import {
  getImagesToDisplay,
  getMapSliceForColorProductId,
} from '../../ProductListing/molecules/ProductList/utils/productsCommonUtils';
import PromoPDPBanners from '../../../../common/organisms/PromoPDPBanners';

class BundleProduct extends React.PureComponent {
  state = {
    imagesToDisplay: [],
  };

  static getDerivedStateFromProps(props) {
    const { currentProduct } = props;
    if (currentProduct) {
      let imagesToDisplay = [];
      const { colorFitsSizesMap, generalProductId } = currentProduct;

      if (colorFitsSizesMap) {
        imagesToDisplay = getImagesToDisplay({
          imagesByColor: currentProduct.imagesByColor,
          curentColorEntry: getMapSliceForColorProductId(colorFitsSizesMap, generalProductId),
          isAbTestActive: false,
          isFullSet: true,
        });
      }
      return {
        imagesToDisplay,
      };
    }
    return null;
  }

  getBreadCrumb = () => {
    const { breadCrumbs } = this.props;
    if (breadCrumbs) {
      return (
        <Row>
          <Col colSize={{ small: 6, medium: 8, large: 12 }} className="breadcrum-wrapper">
            <FixedBreadCrumbs crumbs={breadCrumbs} separationChar=">" />
          </Col>
        </Row>
      );
    }
    return '';
  };

  getSocialConnectWidget = () => {
    const { accessibilityLabels } = this.props;
    return (
      <SocialConnect
        className="bundle-social-wrapper"
        isFacebookEnabled
        isPinterestEnabled
        isTwitterEnabled
        accessibilityLabels={accessibilityLabels}
      />
    );
  };

  getProductSummary = currentColorEntry => {
    const {
      currentProduct,
      productDetails,
      pdpLabels,
      currency,
      currencyAttributes,
      ...otherProps
    } = this.props;
    const selectedColorProductId = currentColorEntry.colorProductId;

    return (
      <Row fullBleed>
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          <div className="product-summary-wrapper">
            <Product
              productDetails={productDetails}
              isGiftCard={currentProduct.isGiftCard}
              selectedColorProductId={selectedColorProductId}
              currencySymbol={currency}
              currencyAttributes={currencyAttributes}
              isBundleProduct
              {...otherProps}
            />
            {/* UX timer */}
            {/* TODO: When there is an actual promo image, revise timer logic */}
            <RenderPerf.Measure name={PROMOTION_VISIBLE} />
          </div>
        </Col>
      </Row>
    );
  };

  getBundleProductsList = () => {
    const {
      currentBundle,
      plpLabels,
      handleAddToBag,
      addToFavorites,
      addToBagEcom,
      currentState,
      isLoggedIn,
      outfitLabels,
      addToBagErrorId,
      addToBagError,
      isKeepAliveEnabled,
      outOfStockLabels,
      currencyAttributes,
      currency,
      AddToFavoriteErrorMsg,
      removeAddToFavoritesErrorMsg,
    } = this.props;
    return (
      <Row fullBleed className="product-items-section">
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          <BundleProductItems
            currentBundle={currentBundle}
            plpLabels={plpLabels}
            handleAddToBag={handleAddToBag}
            addToFavorites={addToFavorites}
            addToBagEcom={addToBagEcom}
            currentState={currentState}
            isLoggedIn={isLoggedIn}
            outfitLabels={outfitLabels}
            addToBagErrorId={addToBagErrorId}
            addToBagError={addToBagError}
            isKeepAliveEnabled={isKeepAliveEnabled}
            outOfStockLabels={outOfStockLabels}
            currencySymbol={currency}
            currencyAttributes={currencyAttributes}
            className="bundle-products-list"
            AddToFavoriteErrorMsg={AddToFavoriteErrorMsg}
            removeAddToFavoritesErrorMsg={removeAddToFavoritesErrorMsg}
          />
        </Col>
      </Row>
    );
  };

  getProductDescription = () => {
    const { itemPartNumber, pdpLabels, shortDescription, longDescription } = this.props;
    return (
      <Row fullBleed>
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          <ProductDescription
            productId={itemPartNumber}
            isShowMore={false}
            pdpLabels={pdpLabels}
            shortDescription={shortDescription}
            longDescription={longDescription}
          />
        </Col>
        <Col colSize={{ small: 2, medium: 2, large: 3 }}>{this.getSocialConnectWidget()}</Col>
      </Row>
    );
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

  getRecommendations = () => {
    const { itemPartNumber, pdpLabels } = this.props;
    const categoryId = this.getCatIdForRecommendation();
    const recommendationAttributes = {
      variations: 'moduleO',
      page: Constants.RECOMMENDATIONS_PAGES_MAPPING.COLLECTION,
      categoryName: categoryId,
      partNumber: itemPartNumber,
      showLoyaltyPromotionMessage: false,
      headerAlignment: 'left',
    };
    return (
      <div className="product-detail-section">
        <Recommendations {...recommendationAttributes} />
        <Recommendations
          headerLabel={pdpLabels.recentlyViewed}
          portalValue={Constants.RECOMMENDATIONS_MBOXNAMES.RECENTLY_VIEWED}
          {...recommendationAttributes}
        />
      </div>
    );
  };

  getMainImageCarousel = () => {
    const { currentProduct } = this.props;
    const { imagesToDisplay } = this.state;
    return (
      <Carousel
        options={config.CAROUSEL_OPTIONS}
        carouselConfig={{
          autoplay: false,
        }}
      >
        {imagesToDisplay &&
          imagesToDisplay.map(image => {
            return (
              <ProductDetailImage
                imageUrl={image && image.bigSizeImageUrl}
                imageName={currentProduct.name}
                isZoomEnabled={false}
              />
            );
          })}
      </Carousel>
    );
  };

  render() {
    const { className, currentProduct, topPromos } = this.props;
    if (currentProduct && JSON.stringify(currentProduct) !== '{}') {
      const { colorFitsSizesMap, generalProductId } = currentProduct;
      const currentColorEntry = getMapSliceForColorProductId(colorFitsSizesMap, generalProductId);

      return (
        <div className={className}>
          {this.getBreadCrumb()}
          <Row className="product-container">
            <Col colSize={{ small: 6, medium: 8, large: 12 }}>
              <PromoPDPBanners promos={topPromos} />
            </Col>
            <Col colSize={{ small: 6, medium: 3, large: 6 }}>{this.getMainImageCarousel()}</Col>
            <Col colSize={{ small: 6, medium: 5, large: 6 }}>
              <Row fullBleed className="product-summary-section">
                <Col
                  id="productDetailsSection"
                  className="product-detail-section"
                  colSize={{ small: 6, medium: 8, large: 12 }}
                >
                  {this.getProductSummary(currentColorEntry)}
                  {this.getProductDescription()}
                </Col>
              </Row>
              {this.getBundleProductsList()}
            </Col>
          </Row>
          {this.getRecommendations()}
        </div>
      );
    }
    return '';
  }
}

BundleProduct.propTypes = {
  className: PropTypes.string,
  shortDescription: PropTypes.string,
  itemPartNumber: PropTypes.string,
  longDescription: PropTypes.string,
  pdpLabels: PropTypes.shape({}),
  outfitLabels: PropTypes.shape({}),
  breadCrumbs: PropTypes.shape({}),
  currentProduct: PropTypes.shape({}).isRequired,
  productDetails: PropTypes.shape({}),
  currency: PropTypes.string,
  currencyAttributes: PropTypes.shape({}).isRequired,
  plpLabels: PropTypes.shape({}),
  currentBundle: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  handleAddToBag: PropTypes.func.isRequired,
  addToFavorites: PropTypes.func.isRequired,
  addToBagEcom: PropTypes.func.isRequired,
  currentState: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool,
  addToBagErrorId: PropTypes.string,
  addToBagError: PropTypes.string,
  isKeepAliveEnabled: PropTypes.bool.isRequired,
  outOfStockLabels: PropTypes.shape({}),
  AddToFavoriteErrorMsg: PropTypes.string,
  removeAddToFavoritesErrorMsg: PropTypes.func,
  topPromos: PropTypes.shape({}),
  accessibilityLabels: PropTypes.shape({}),
};

BundleProduct.defaultProps = {
  className: '',
  longDescription: '',
  shortDescription: '',
  itemPartNumber: '',
  pdpLabels: {},
  outfitLabels: {},
  breadCrumbs: [],
  productDetails: {},
  currency: 'USD',
  plpLabels: {},
  isLoggedIn: false,
  addToBagErrorId: '',
  addToBagError: '',
  outOfStockLabels: {},
  AddToFavoriteErrorMsg: '',
  removeAddToFavoritesErrorMsg: () => {},
  topPromos: null,
  accessibilityLabels: {},
};

export default withStyles(BundleProduct, styles);
