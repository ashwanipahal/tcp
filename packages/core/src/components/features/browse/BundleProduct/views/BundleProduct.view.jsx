import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from '@tcp/core/src/components/common/atoms';
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
    return breadCrumbs && <FixedBreadCrumbs crumbs={breadCrumbs} separationChar=">" />;
  };

  getSocialConnectWidget = () => {
    return (
      <SocialConnect
        className="bundle-social-wrapper"
        isFacebookEnabled
        isPinterestEnabled
        isTwitterEnabled
      />
    );
  };

  getProductSummary = currentColorEntry => {
    const {
      currentProduct,
      productDetails,
      pdpLabels,
      currency,
      currencyExchange,
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
              currencyExchange={currencyExchange}
              isBundleProduct
              {...otherProps}
            />
          </div>
          <Row className="placeholder-small">
            <Col colSize={{ small: 6, medium: 8, large: 12 }}>
              <div className="promo-area-1">{pdpLabels.promoArea1}</div>
            </Col>
          </Row>
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
    const {
      className,
      currentProduct,
      currentBundle,
      pdpLabels,
      plpLabels,
      handleAddToBag,
      addToFavorites,
      addToBagEcom,
      currentState,
      isLoggedIn,
    } = this.props;
    if (currentProduct && JSON.stringify(currentProduct) !== '{}') {
      const { colorFitsSizesMap, generalProductId } = currentProduct;
      const currentColorEntry = getMapSliceForColorProductId(colorFitsSizesMap, generalProductId);

      return (
        <div className={className}>
          <Row>
            <Col colSize={{ small: 6, medium: 8, large: 12 }} className="breadcrum-wrapper">
              {this.getBreadCrumb()}
            </Col>
          </Row>
          <Row className="placeholder-large">
            <Col colSize={{ small: 6, medium: 8, large: 12 }}>
              <div className="promo-area-1">{pdpLabels.promoArea1}</div>
            </Col>
          </Row>
          <Row>
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
                  />
                </Col>
              </Row>
            </Col>
          </Row>
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
  breadCrumbs: PropTypes.shape({}),
  currentProduct: PropTypes.shape({}).isRequired,
  productDetails: PropTypes.shape({}),
  currency: PropTypes.string,
  currencyExchange: PropTypes.string,
  plpLabels: PropTypes.shape({}),
  currentBundle: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  handleAddToBag: PropTypes.func.isRequired,
  addToFavorites: PropTypes.func.isRequired,
  addToBagEcom: PropTypes.func.isRequired,
  currentState: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool,
};

BundleProduct.defaultProps = {
  className: '',
  longDescription: '',
  shortDescription: '',
  itemPartNumber: '',
  pdpLabels: {},
  breadCrumbs: [],
  productDetails: {},
  currency: 'USD',
  currencyExchange: '',
  plpLabels: {},
  isLoggedIn: false,
};

export default withStyles(BundleProduct, styles);
