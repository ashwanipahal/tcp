import React from 'react';
import { PropTypes } from 'prop-types';
import { BOPIS_PRODUCT_INFO_PROP_TYPES } from '../../../PickUpStoreModal.proptypes';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import { handleGenericKeyDown } from '../../../../../../../utils';
import cssClassName from '../../../../../../../utils/cssClassName';
import { ENTER_KEY_CODE, PRODUCT_VALUES, EDIT } from '../../../PickUpStoreModal.constants';
import Button from '../../../../../atoms/Button';
import BodyCopy from '../../../../../atoms/BodyCopy';

/**
 * @method ProductPricesBopisSection this method component to display
 *  offer price and list price
 * @param {props} props contain price values.
 */
export function ProductPricesBopisSection(props) {
  const { currencySymbol, listPrice, offerPrice } = props;
  const offerPriceClass = cssClassName('text-price ', 'offer-price ', {
    'offer-price-only': offerPrice === listPrice,
  });
  const listPriceClass = cssClassName('text-price ', 'list-price ');
  return (
    <div className="container-price-bopis">
      {offerPrice && offerPrice !== listPrice && (
        <BodyCopy className={listPriceClass}>{currencySymbol + listPrice.toFixed(2)}</BodyCopy>
      )}
      {offerPrice && (
        <BodyCopy className={offerPriceClass}>{currencySymbol + offerPrice.toFixed(2)}</BodyCopy>
      )}
    </div>
  );
}

ProductPricesBopisSection.propTypes = {
  /** This is used to display the correct currency symbol */
  currencySymbol: PropTypes.string.isRequired,

  listPrice: PropTypes.string.isRequired,

  offerPrice: PropTypes.string.isRequired,
};

const getColorFitsSizesMap = props => {
  return (
    props.colorFitsSizesMap &&
    props.colorFitsSizesMap.filter(
      colorEntry =>
        colorEntry.miscInfo &&
        (colorEntry.miscInfo.isBopisEligible || colorEntry.miscInfo.isBossEligible)
    )
  );
};

class PickupProductFormPart extends React.Component {
  static propTypes = {
    /** the whole product detail to have it engaged on BOPIS form */
    ...BOPIS_PRODUCT_INFO_PROP_TYPES,
    /** This is used to display the correct currency symbol */
    currencySymbol: PropTypes.string.isRequired,
    isPreferredStoreError: PropTypes.bool.isRequired,
    isPickUpWarningModal: PropTypes.bool,
  };

  static defaultProps = {
    isPickUpWarningModal: false,
  };

  static defaultValidation = getStandardConfig(
    [
      { color: 'bopisSearchColor' },
      { fit: 'bopisSearchFit' },
      { size: 'bopisSearchSize' },
      { quantity: 'bopisSearchQuantity' },
      { addressLocation: 'addressLine1' },
      { distance: 'distance' },
    ],
    { stopOnFirstError: true }
  );

  constructor(props) {
    super(props);

    this.colorFitsSizesMap = getColorFitsSizesMap(props);
  }

  componentWillReceiveProps(nextProps) {
    const { colorFitsSizesMap } = this.props;
    if (colorFitsSizesMap !== nextProps.colorFitsSizesMap) {
      this.colorFitsSizesMap = getColorFitsSizesMap(nextProps);
    }
  }

  renderProductValues = (initialValues, size) => {
    const fitLabel = `${PRODUCT_VALUES.fit}: ${initialValues.fit}`;
    const sizeLabel = `${size}: ${initialValues.size}`;
    const qtyLabel = `${PRODUCT_VALUES.quantity}: ${initialValues.quantity}`;
    return (
      <React.Fragment>
        {initialValues.fit && <BodyCopy>{fitLabel}</BodyCopy>}
        <BodyCopy>{sizeLabel}</BodyCopy>
        <BodyCopy>{qtyLabel}</BodyCopy>
      </React.Fragment>
    );
  };

  /**
   * @method handleEditSkuOnKeyPress
   * handles the keypress with tabbing focus.
   * triggers the edit method when enter key is pressed
   */
  handleEditSkuOnKeyPress = event => {
    const { onEditSku } = this.props;
    return handleGenericKeyDown(event, ENTER_KEY_CODE, onEditSku);
  };

  render() {
    const {
      name,
      imagePath,
      onEditSku,
      isPreferredStoreError,
      initialValues,
      isPickUpWarningModal,
      currencySymbol,
      listPrice,
      offerPrice,
      colorFitSizeDisplayNames,
    } = this.props;
    const altImageText = `Image for product ${name}`;
    const colorLabel = `${colorFitSizeDisplayNames.color}: ${initialValues.color}`;
    return (
      <div className="item-product-container clearfix">
        <div className="container-image">
          <img src={imagePath} alt={altImageText} />
        </div>
        <div className="product-description">
          <h4 className="product-title">{name}</h4>
          <p className="product-values">{colorLabel}</p>
          <p className="product-values">
            {this.renderProductValues(initialValues, colorFitSizeDisplayNames.size_alt)}
          </p>
          {isPreferredStoreError && (
            <p className="preferred-store-message">
              The color and size selected are not available in your favorite store. Please search
              for another store or try a different color and/or size.
            </p>
          )}
          {!isPickUpWarningModal && (
            <Button
              className="edit-link"
              tabIndex="0"
              onClick={onEditSku}
              onKeyDown={this.handleEditSkuOnKeyPress}
            >
              {' '}
              {EDIT}
            </Button>
          )}
          <ProductPricesBopisSection
            currencySymbol={currencySymbol}
            listPrice={listPrice}
            offerPrice={offerPrice}
          />
        </div>
      </div>
    );
  }
}

export default PickupProductFormPart;
