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
import Anchor from '../../../../../atoms/Anchor';
import BodyCopy from '../../../../../atoms/BodyCopy';
import { Row, Col } from '../../../../../atoms';
import PickupProductFormPartStyling from '../styles/PickupProductFormPart.style';
import withStyles from '../../../../../hoc/withStyles';
import ProductPrice from '../../../../../../features/browse/ProductDetail/molecules/ProductPrice/ProductPrice';

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
          fontFamily="secondary"
          fontWeight="black"
          fontSize={['fs16']}
          component="span"
        >
          {currencySymbol + offerPrice.toFixed(2)}
        </BodyCopy>
      )}
      {offerPrice && (
        <BodyCopy
          className={offerPriceClass}
          component="span"
          fontSize={['fs12']}
          fontFamily="secondary"
          color="text.secondary"
        >
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
    <BodyCopy className="product-key" fontSize="fs12" fontFamily="secondary" color="text.secondary">
      <BodyCopy fontSize="fs12" fontFamily="secondary" fontWeight="semibold" component="span">
        {productKey}
        {':'}
      </BodyCopy>
      <BodyCopy fontSize="fs12" fontFamily="secondary" color="text.secondary" component="span">
        {productValue}
      </BodyCopy>
    </BodyCopy>
  );
}

DisplayProductSpecification.propTypes = {
  /** This is used to display the correct product specification */
  productKey: PropTypes.string.isRequired,

  productValue: PropTypes.string.isRequired,
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

  renderProductValues = (initialValues, size) => {
    const fitSize = `${initialValues.Size} ${initialValues.Fit || ''}`;
    return (
      <React.Fragment>
        <DisplayProductSpecification productKey={size} productValue={fitSize} />
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
                <BodyCopy
                  fontWeight="semibold"
                  fontSize={['fs12']}
                  component="span"
                  fontFamily="secondary"
                >
                  {`${PICKUP_LABELS.PRICE_LABEL}:`}
                </BodyCopy>
                <div className="ProductPrice">
                  <ProductPrice
                    currencySymbol={currencySymbol}
                    listPrice={listPrice}
                    offerPrice={offerPrice}
                  />
                </div>
              </BodyCopy>
            </div>
            {!isPickUpWarningModal && (
              <div className="edit-link">
                <Anchor
                  noLink
                  underline
                  fontSizeVariation="medium"
                  handleLinkClick={onEditSku}
                  onKeyDown={this.handleEditSkuOnKeyPress}
                  to=""
                >
                  {EDIT}
                </Anchor>
              </div>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default withStyles(PickupProductFormPart, PickupProductFormPartStyling);
export { PickupProductFormPart as PickupProductFormPartVanilla };
