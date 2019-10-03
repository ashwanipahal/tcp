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
    const { currentProduct, onPickUpOpenClick } = this.props;
    const { colorFitsSizesMap, generalProductId } = currentProduct;
    const colorEntry = getMapSliceForColorProductId(colorFitsSizesMap, generalProductId);
    onPickUpOpenClick({
      generalProductId,
      colorProductId: generalProductId,
      isBopisCtaEnabled: colorEntry.miscInfo.isBopisEligible,
      isBossCtaEnabled: colorEntry.miscInfo.isBossEligible,
      currentProduct,
    });
  }

  render() {
    const { buttonLabel } = this.props;
    return (
      <React.Fragment>
        <Button
          margin="16px 0 0 0"
          color="white"
          fill="BLUE"
          buttonVariation="variable-width"
          text="Fulmilment Section"
          fontSize="fs10"
          fontWeight="extrabold"
          fontFamily="secondary"
          onPress={this.pickupOpenClick}
          accessibilityLabel="Add to Bag"
        >
          {buttonLabel}
        </Button>
      </React.Fragment>
    );
  }
}

FulfillmentSection.propTypes = {
  onPickUpOpenClick: PropTypes.func.isRequired,
  buttonLabel: PropTypes.string,
  currentProduct: PRODUCT_INFO_PROP_TYPE_SHAPE.isRequired,
};

FulfillmentSection.defaultProps = {
  buttonLabel: '',
};

export default withStyles(FulfillmentSection, styles);
export { FulfillmentSection as FulfillmentSectionVanilla };
