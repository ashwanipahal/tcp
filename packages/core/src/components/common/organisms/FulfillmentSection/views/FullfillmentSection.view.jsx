/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../../atoms/Button';
import withStyles from '../../../hoc/withStyles';
import styles from '../styles/FullfillmentSection.style';
import { getMapSliceForColorProductId } from '../../../../features/browse/ProductListing/molecules/ProductList/utils/productsCommonUtils';
import { PRODUCT_INFO_PROP_TYPE_SHAPE } from '../../../../features/browse/ProductListing/molecules/ProductList/propTypes/productsAndItemsPropTypes';

// TODO - These are psuedo files, added to include functionality of PickupStore. These files will be updated later.
// const PickupStoreLabel = 'Pick up in store';

class FulfillmentSection extends React.Component {
  constructor(props) {
    super(props);
    this.pickupOpenClick = this.pickupOpenClick.bind(this);
  }

  pickupOpenClick() {
    const { currentProduct, onPickUpOpenClick, onPickupClickAddon } = this.props;
    const { colorFitsSizesMap, generalProductId } = currentProduct;
    const colorEntry = getMapSliceForColorProductId(colorFitsSizesMap, generalProductId);
    onPickUpOpenClick({
      generalProductId,
      colorProductId: generalProductId,
      // isBopisCtaEnabled: colorEntry.miscInfo.isBopisEligible,
      // isBossCtaEnabled: colorEntry.miscInfo.isBossEligible,
      currentProduct,
    });
    if (onPickupClickAddon) {
      onPickupClickAddon();
    }
  }

  render() {
    const { className, buttonLabel, dataLocator, btnClassName } = this.props;
    return (
      <React.Fragment>
        <Button
          className={`${className} ${btnClassName} fulfillment-section`}
          fullWidth
          buttonVariation="fixed-width"
          onClick={this.pickupOpenClick}
          dataLocator={dataLocator}
        >
          {"Pick Up In Store"}
        </Button>
      </React.Fragment>
    );
  }
}

FulfillmentSection.propTypes = {
  onPickUpOpenClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  buttonLabel: PropTypes.string,
  dataLocator: PropTypes.string,
  btnClassName: PropTypes.string,
  currentProduct: PRODUCT_INFO_PROP_TYPE_SHAPE.isRequired,
};

FulfillmentSection.defaultProps = {
  className: '',
  buttonLabel: '',
  dataLocator: '',
  btnClassName: '',
};

export default withStyles(FulfillmentSection, styles);
export { FulfillmentSection as FulfillmentSectionVanilla };
