import React from 'react';
import PropTypes from 'prop-types';
import ExecutionEnvironment from 'exenv';
import { Row, Col, Button } from '@tcp/core/src/components/common/atoms';
import withStyles from '../../../../common/hoc/withStyles';
import styles from '../styles/BundleProduct.style';
import ProductDescription from '../../ProductDetail/molecules/ProductDescription/views';
import FixedBreadCrumbs from '../../ProductListing/molecules/FixedBreadCrumbs/views';
import ProductImagesWrapper from '../../ProductDetail/molecules/ProductImagesWrapper/views/ProductImagesWrapper.view';
import Product from '../../ProductDetail/molecules/Product/views/Product.view';
import { breakpoints } from '../../../../../../styles/themes/TCP/mediaQuery';
import {
  getImagesToDisplay,
  getMapSliceForColorProductId,
} from '../../ProductListing/molecules/ProductList/utils/productsCommonUtils';

class BundleProduct extends React.Component {
  constructor(props) {
    super(props);
    console.log('----11111-----');
  }

  scrollToChildrens = () => {
    console.log('------2222------');
  };

  renderChooseItemBtn = chooseItemBtnLbl => {
    return (
      <div className="button-container">
        <Button
          onClick={this.scrollToChildrens}
          buttonVariation="fixed-width"
          className="choose-child-btn"
          data-locator=""
        >
          {chooseItemBtnLbl}
        </Button>
      </div>
    );
  };

  getBreadCrumb = () => {
    const { breadCrumbs } = this.props;
    return breadCrumbs && <FixedBreadCrumbs crumbs={breadCrumbs} separationChar=">" />;
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
      <Row className="product-desc-row">
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
            {this.renderChooseItemBtn(pdpLabels.chooseItemBtnLbl)}
          </div>
        </Col>
      </Row>
    );
  };

  isWebEnvironment = () => {
    return ExecutionEnvironment.canUseDOM && document.body.offsetWidth >= breakpoints.values.lg;
  };

  render() {
    const {
      longDescription,
      shortDescription,
      itemPartNumber,
      pdpLabels,
      className,
      currentProduct,
    } = this.props;
    if (currentProduct && JSON.stringify(currentProduct) !== '{}') {
      let imagesToDisplay = [];
      const { colorFitsSizesMap, generalProductId } = currentProduct;

      const isWeb = this.isWebEnvironment();
      const currentColorEntry = getMapSliceForColorProductId(colorFitsSizesMap, generalProductId);
      if (colorFitsSizesMap) {
        imagesToDisplay = getImagesToDisplay({
          imagesByColor: currentProduct.imagesByColor,
          curentColorEntry: getMapSliceForColorProductId(colorFitsSizesMap, generalProductId),
          isAbTestActive: false,
          isFullSet: true,
        });
      }

      return (
        <div className={className}>
          <Row>
            <Col colSize={{ small: 6, medium: 8, large: 12 }} className="breadcrum-wrapper">
              {this.getBreadCrumb()}
            </Col>
          </Row>
          <Row className="placeholder">
            <Col colSize={{ small: 6, medium: 8, large: 12 }}>
              <div className="promo-area-1">{pdpLabels.promoArea1}</div>
            </Col>
          </Row>
          <Row className="product-summary-section">
            <Col className="product-image-wrapper" colSize={{ small: 6, medium: 4, large: 7 }}>
              <ProductImagesWrapper
                isThumbnailListVisible={isWeb}
                images={imagesToDisplay}
                pdpLabels={pdpLabels}
                currentProduct={currentProduct}
              />
            </Col>
            <Col
              id="productDetailsSection"
              className="product-detail-section"
              colSize={{ small: 6, medium: 4, large: 5 }}
            >
              <div>{this.getProductSummary(currentColorEntry)}</div>
              <div>
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
};

export default withStyles(BundleProduct, styles);
