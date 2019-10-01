import React from 'react';
import { PropTypes } from 'prop-types';
import { BOPIS_PRODUCT_INFO_PROP_TYPES } from '../../../PickUpStoreModal.proptypes';
import { handleGenericKeyDown } from '../../../../../../../utils';
import cssClassName from '../../../../../../../utils/cssClassName';
import {
  ENTER_KEY_CODE,
  PRODUCT_VALUES,
  EDIT,
  PICKUP_LABELS,
} from '../../../PickUpStoreModal.constants';
import Button from '../../../../../atoms/Button';
import BodyCopy from '../../../../../atoms/BodyCopy';
import { Row, Col } from '../../../../../atoms';
import PickupProductFormPartStyling from '../styles/PickupProductFormPart.style';
import withStyles from '../../../../../hoc/withStyles';

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
    <span className="container-price-bopis">
      {offerPrice && offerPrice !== listPrice && (
        <BodyCopy
          className={listPriceClass}
          fontWeight="extrabold"
          fontSize={['fs16']}
          component="span"
        >
          {currencySymbol + offerPrice.toFixed(2)}
        </BodyCopy>
      )}
      {offerPrice && (
        <BodyCopy className={offerPriceClass} component="span" fontSize={['fs12']}>
          {currencySymbol + listPrice.toFixed(2)}
        </BodyCopy>
      )}
    </span>
  );
}

ProductPricesBopisSection.propTypes = {
  /** This is used to display the correct currency symbol */
  currencySymbol: PropTypes.string.isRequired,

  listPrice: PropTypes.string.isRequired,

  offerPrice: PropTypes.string.isRequired,
};

export function DisplayProductSpecification(props) {
  const { productKey, productValue } = props;
  return (
    <BodyCopy className="product-key" fontSize={['fs12']}>
      <BodyCopy fontWeight="semibold" component="span">
        {productKey}
        {':'}
      </BodyCopy>
      {productValue}
    </BodyCopy>
  );
}

DisplayProductSpecification.propTypes = {
  /** This is used to display the correct product specification */
  productKey: PropTypes.string.isRequired,

  productValue: PropTypes.string.isRequired,
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
    isPickUpWarningModal: PropTypes.bool,
  };

  static defaultProps = {
    isPickUpWarningModal: false,
  };

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
    const fitSize = `${initialValues.Size} ${initialValues.Fit}`;
    return (
      <React.Fragment>
        {initialValues.Fit && (
          <DisplayProductSpecification productKey={size} productValue={fitSize} />
        )}
        <DisplayProductSpecification
          productKey={PRODUCT_VALUES.quantity}
          productValue={initialValues.Quantity}
        />
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
      initialValues,
      isPickUpWarningModal,
      currencySymbol,
      listPrice,
      offerPrice,
      className,
      colorFitSizeDisplayNames,
    } = this.props;

    const altImageText = `Image for product ${name}`;
    return (
      <div className={`${className} item-product-container clearfix`}>
        <Row>
          <Col colSize={{ small: 3, medium: 4, large: 6 }} className="container-image">
            <img src={imagePath} alt={altImageText} />
          </Col>
          <Col colSize={{ small: 3, medium: 4, large: 6 }} className="product-description">
            <BodyCopy
              className="product-title"
              fontSize={['fs14', 'fs14', 'fs18']}
              fontWeight={['semibold', 'extrabold', 'black']}
              fontFamily="secondary"
            >
              {name}
            </BodyCopy>
            <div>
              <BodyCopy className="product-color">
                <DisplayProductSpecification
                  productKey={colorFitSizeDisplayNames.color}
                  productValue={initialValues.color}
                />
              </BodyCopy>
              <BodyCopy className="product-values">
                {this.renderProductValues(initialValues, colorFitSizeDisplayNames.size_alt)}
              </BodyCopy>
              <BodyCopy className="product-Price">
                <BodyCopy fontWeight="semibold" fontSize={['fs12']} component="span">
                  {`${PICKUP_LABELS.PRICE_LABEL}:`}
                </BodyCopy>
                <ProductPricesBopisSection
                  currencySymbol={currencySymbol}
                  listPrice={listPrice}
                  offerPrice={offerPrice}
                />
              </BodyCopy>
            </div>
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
          </Col>
        </Row>
      </div>
    );
  }
}

export default withStyles(PickupProductFormPart, PickupProductFormPartStyling);
export { PickupProductFormPart as PickupProductFormPartVanilla };
