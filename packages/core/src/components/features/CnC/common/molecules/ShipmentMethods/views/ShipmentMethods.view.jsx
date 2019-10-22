import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import LabeledRadioButton from '../../../../../../common/atoms/LabeledRadioButton';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import styles from '../styles/ShipmentMethods.style';
import withStyles from '../../../../../../common/hoc/withStyles';

const ShipmentMethods = ({ shipmentMethods, selectedShipmentId, className, shipmentHeader }) => {
  const selectedShipment =
    shipmentMethods && shipmentMethods.find(method => method.id === selectedShipmentId);
  return (
    <>
      <BodyCopy
        fontFamily="secondary"
        fontSize="fs16"
        fontWeight="extrabold"
        className="elem-mb-XXS"
        dataLocator="shippingMethods"
      >
        {shipmentHeader}
      </BodyCopy>
      <Row fullBleed className={className}>
        {shipmentMethods &&
          shipmentMethods.length > 0 &&
          shipmentMethods.map(option => {
            const { id, displayName, price, shippingSpeed } = option;
            const title = price > 0 ? `${displayName} - $${price}` : displayName;
            const subtitle = shippingSpeed ? `(${shippingSpeed})` : '';
            return (
              <Col colSize={{ small: 2, medium: 8, large: 12 }} className="radio-method">
                <Field
                  component={LabeledRadioButton}
                  key={id}
                  selectedValue={id}
                  title={title}
                  subtitle={subtitle}
                  name="shippingMethodId"
                  hideSubtitleOnMobile
                  variation="secondary"
                  className="estimated-shipping-size"
                />
              </Col>
            );
          })}
        {selectedShipment && (
          <Col colSize={{ small: 6, medium: 0, large: 0 }}>
            <BodyCopy
              fontFamily="secondary"
              fontSize="fs12"
              fontWeight="semibold"
              className="estimated-shipping-rate elem-mt-LRG"
              textAlign="center"
            >
              {`${selectedShipment.displayName || ''} - `}
              <BodyCopy
                fontFamily="secondary"
                fontSize="fs12"
                fontWeight="semibold"
                component="span"
                className="estimated-shipping-speed"
              >
                {` ${selectedShipment.shippingSpeed || ''}`}
              </BodyCopy>
            </BodyCopy>
          </Col>
        )}
      </Row>
    </>
  );
};

ShipmentMethods.propTypes = {
  shipmentMethods: PropTypes.shape([]),
  selectedShipmentId: PropTypes.string,
  className: PropTypes.string,
  shipmentHeader: PropTypes.string,
};
ShipmentMethods.defaultProps = {
  shipmentMethods: null,
  selectedShipmentId: null,
  className: '',
  shipmentHeader: '',
};

export default withStyles(ShipmentMethods, styles);
export { ShipmentMethods as ShipmentMethodsVanilla };
