import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy, Anchor } from '../../../../../atoms';
import withStyles from '../../../../../hoc/withStyles';
import styles, { customPriceStyles } from '../styles/ProductCustomizeFormPart.style';
import ProductPrice from '../../../../../../features/browse/ProductDetail/molecules/ProductPrice/ProductPrice';
import { PRODUCT_INFO_PROP_TYPE_SHAPE } from '../../../../../../features/browse/ProductListing/molecules/ProductList/propTypes/productsAndItemsPropTypes';
import { COLOR_FITS_SIZES_MAP_PROP_TYPE } from '../../../../PickupStoreModal/PickUpStoreModal.proptypes';
import ProductAddToBagContainer from '../../../../../molecules/ProductAddToBag/container/ProductAddToBag.container';

import {
  getMapSliceForColorProductId,
  getMapSliceForColor,
  getPrices,
} from '../../../../../../features/browse/ProductListing/molecules/ProductList/utils/productsCommonUtils';

class ProductCustomizeFormPart extends React.Component {
  constructor(props) {
    super(props);
    const { productInfo, colorFitsSizesMap } = this.props;
    this.state = {
      currentColorEntry: getMapSliceForColorProductId(
        colorFitsSizesMap,
        productInfo.generalProductId
      ),
    };
  }

  onChangeColor = e => {
    const { colorFitsSizesMap } = this.props;
    this.setState({ currentColorEntry: getMapSliceForColor(colorFitsSizesMap, e) });
  };

  render() {
    const {
      className,
      productInfo,
      plpLabels,
      currency,
      priceCurrency,
      currencyExchange,
      isCanada,
      isHasPlcc,
      isInternationalShipping,
    } = this.props;

    const { currentColorEntry } = this.state;
    const imageUrl = currentColorEntry
      ? productInfo.imagesByColor[currentColorEntry.color.name] &&
        productInfo.imagesByColor[currentColorEntry.color.name].basicImageUrl
      : null;
    const prices = productInfo && getPrices(productInfo, currentColorEntry.color.name);
    const currentColorPdpUrl =
      currentColorEntry && currentColorEntry.pdpUrl ? currentColorEntry.pdpUrl : productInfo.pdpUrl;
    const productPriceProps = {
      currencySymbol: currency,
      currencyExchange,
      priceCurrency,
      isItemPartNumberVisible: false,
      ...prices,
      isCanada,
      inheritedStyles: customPriceStyles,
      customFonts: { listPriceFont: 'fs14' },
      isPlcc: isHasPlcc,
      isInternationalShipping,
    };

    return (
      <div className={className}>
        <div className="product-customize-form-container">
          <div className="image-wrapper">
            <img alt={productInfo.name} src={imageUrl} />
            <Anchor className="link-redirect" to={currentColorPdpUrl} asPath={currentColorPdpUrl}>
              <BodyCopy className="product-link" fontSize="fs14" fontFamily="secondary">
                View Product Details
              </BodyCopy>
            </Anchor>
          </div>
          <div className="product-detail">
            <div className="product-details-card-container">
              <BodyCopy
                fontSize="fs18"
                fontWeight="extrabold"
                fontFamily="secondary"
                className="product-name"
              >
                {productInfo.name}
              </BodyCopy>
              <ProductPrice {...productPriceProps} />
            </div>

            <ProductAddToBagContainer
              onChangeColor={this.onChangeColor}
              plpLabels={plpLabels}
              currentProduct={productInfo}
            />
          </div>
        </div>
      </div>
    );
  }
}

ProductCustomizeFormPart.propTypes = {
  plpLabels: PropTypes.shape({}).isRequired,
  colorFitsSizesMap: COLOR_FITS_SIZES_MAP_PROP_TYPE.isRequired,
  productInfo: PRODUCT_INFO_PROP_TYPE_SHAPE.isRequired,
  currency: PropTypes.string,
  className: PropTypes.string,
  priceCurrency: PropTypes.string,
  currencyExchange: PropTypes.string,
  isCanada: PropTypes.bool,
  isInternationalShipping: PropTypes.bool,
  isHasPlcc: PropTypes.bool,
};

ProductCustomizeFormPart.defaultProps = {
  currency: 'USD',
  className: '',
  priceCurrency: '',
  currencyExchange: '',
  isCanada: false,
  isHasPlcc: false,
  isInternationalShipping: false,
};

export default withStyles(ProductCustomizeFormPart, styles);
export { ProductCustomizeFormPart as ProductCustomizeFormPartVanilla };
