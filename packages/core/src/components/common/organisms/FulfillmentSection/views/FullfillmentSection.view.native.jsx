import React from 'react';
import PropTypes from 'prop-types';
import { Anchor } from '@tcp/core/src/components/common/atoms';
import Button from '../../../atoms/Button';
import withStyles from '../../../hoc/withStyles';
import styles from '../styles/FullfillmentSection.style';
import { PRODUCT_INFO_PROP_TYPE_SHAPE } from '../../../../features/browse/ProductListing/molecules/ProductList/propTypes/productsAndItemsPropTypes';

// TODO - These are psuedo files, added to include functionality of PickupStore. These files will be updated later.
// const PickupStoreLabel = 'Pick up in store';

class FulfillmentSection extends React.Component {
  constructor(props) {
    super(props);
    this.pickupOpenClick = this.pickupOpenClick.bind(this);
  }

  pickupOpenClick() {
    const { currentProduct, onPickUpOpenClick, closeQuickViewClick } = this.props;
    const { generalProductId } = currentProduct;
    if (closeQuickViewClick) {
      closeQuickViewClick();
    }
    onPickUpOpenClick({
      generalProductId,
      colorProductId: generalProductId,
      // isBopisCtaEnabled: colorEntry.miscInfo.isBopisEligible,
      // sBossCtaEnabled: colorEntry.miscInfo.isBossEligible,
      currentProduct,
    });
  }

  render() {
    const { buttonLabel, isAnchor } = this.props;
    return (
      <React.Fragment>
        {!isAnchor ? (
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
        ) : (
          <Anchor
            noLink
            onPress={this.pickupOpenClick}
            accessibilityRole="link"
            accessibilityLabel={buttonLabel}
            text={buttonLabel}
            anchorVariation="custom"
            colorName="gray.900"
            fontSizeVariation="medium"
            centered
            underline
          />
        )}
      </React.Fragment>
    );
  }
}

FulfillmentSection.propTypes = {
  onPickUpOpenClick: PropTypes.func.isRequired,
  closeQuickViewClick: PropTypes.func,
  buttonLabel: PropTypes.string,
  currentProduct: PRODUCT_INFO_PROP_TYPE_SHAPE.isRequired,
  isAnchor: PropTypes.bool,
};

FulfillmentSection.defaultProps = {
  buttonLabel: '',
  closeQuickViewClick: () => {},
  isAnchor: false,
};

export default withStyles(FulfillmentSection, styles);
export { FulfillmentSection as FulfillmentSectionVanilla };
