import React from 'react';
import { Field } from 'redux-form';
import LabeledRadioButton from '../../../../../../common/atoms/LabeledRadioButton';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import styles from '../styles/ShipmentMethods.style';
import withStyles from '../../../../../../common/hoc/withStyles';

const ShipmentMethods = ({ shipmentMethods, selectedShipmentId, className }) => {
  const selectedShipment = shipmentMethods.find(method => method.id === selectedShipmentId);
  return (
    <>
      <BodyCopy
        fontFamily="secondary"
        fontSize="fs16"
        fontWeight="extrabold"
        className="elem-mb-MED"
      >
        Shipping Method
      </BodyCopy>
      <Row fullBleed className={className}>
        {shipmentMethods.length > 0 &&
          shipmentMethods.map(option => {
            const { id, displayName, price, shippingSpeed } = option;
            const title = price > 0 ? `${displayName} - $${price}` : displayName;
            const subtitle = shippingSpeed ? `(${shippingSpeed})` : '';
            return (
              <Col colSize={{ small: 2, medium: 8, large: 12 }}>
                <Field
                  component={LabeledRadioButton}
                  key={id}
                  className="radio-method"
                  selectedValue={id}
                  title={title}
                  subtitle={subtitle}
                  name="shippingMethodId"
                  hideSubtitleOnMobile
                  variation="secondary"
                />
              </Col>
            );
          })}
        {selectedShipment && (
          <>
            <BodyCopy
              fontFamily="secondary"
              fontSize="fs12"
              fontWeight="semibold"
              className="estimated-shipping-rate elem-mt-LRG"
            >
              {`${selectedShipment.displayName || ''} - `}
            </BodyCopy>
            <BodyCopy
              fontFamily="secondary"
              fontSize="fs12"
              fontWeight="semibold"
              className="estimated-shipping-rate elem-mt-LRG"
            >
              {` ${selectedShipment.shippingSpeed || ''}`}
            </BodyCopy>
          </>
        )}
      </Row>
    </>
  );
};

export default withStyles(ShipmentMethods, styles);
