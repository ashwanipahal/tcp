import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, BodyCopy } from '../../../../../atoms';
import withStyles from '../../../../../hoc/withStyles';
import styles from '../styles/ProductCustomizeFormPart.style';
import ProductPricesBopisSection from './QuickViewComponents';
import { PRODUCT_INFO_PROP_TYPE_SHAPE } from '../../../../../../features/browse/ProductListing/molecules/ProductList/propTypes/productsAndItemsPropTypes';
import { COLOR_FITS_SIZES_MAP_PROP_TYPE } from '../../../../PickupStoreModal/PickUpStoreModal.proptypes';
import ProductAddToBagContainer from '../../../../../molecules/ProductAddToBag/container/ProductAddToBag.container';

import {
  getMapSliceForColorProductId,
  getMapSliceForColor,
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
      productInfo: { listPrice, offerPrice },
      plpLabels,
      currency,
    } = this.props;

    const { currentColorEntry } = this.state;

    const imageUrl = currentColorEntry
      ? productInfo.imagesByColor[currentColorEntry.color.name].basicImageUrl
      : null;

    return (
      <div className={className}>
        <Row>
          <Col colSize={{ small: 6, medium: 4, large: 4 }}>
            <img alt={productInfo.name} src={imageUrl} />
          </Col>
          <Col colSize={{ small: 6, medium: 4, large: 8 }}>
            <div className="product-details-card-container">
              <BodyCopy
                fontSize="fs18"
                fontWeight="extrabold"
                fontFamily="secondary"
                className="product-name"
              >
                {productInfo.name}
              </BodyCopy>

              <ProductPricesBopisSection
                currencySymbol={currency}
                currentColorEntry={currentColorEntry}
                listPrice={listPrice}
                offerPrice={offerPrice}
              />
            </div>
            <ProductAddToBagContainer
              onChangeColor={this.onChangeColor}
              plpLabels={plpLabels}
              currentProduct={productInfo}
            />
          </Col>
        </Row>
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
};

ProductCustomizeFormPart.defaultProps = {
  currency: 'USD',
  className: '',
};

export default withStyles(ProductCustomizeFormPart, styles);
