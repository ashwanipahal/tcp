import React from 'react';
import { Field, change } from 'redux-form';
import PropTypes from 'prop-types';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import ShippingMethodButtons from '../../../atoms/ShippingMethodButtons';
import {
  ShippingMsgWrapper,
  FieldWrapper,
  italicStyle,
  ShipmentMethodsWrapper,
} from '../styles/ShipmentMethods.style.native';

export const onShipmentMethodChange = ({ id, dispatch, formName, formSection }) => {
  dispatch(change(formName, `${formSection}.shippingMethodId`, id));
};

const ShipmentMethods = ({
  shipmentHeader,
  shipmentMethods,
  selectedShipmentId,
  dispatch,
  formName,
  formSection,
}) => {
  const selectedShipment =
    shipmentMethods && shipmentMethods.find(method => method.id === selectedShipmentId);
  return (
    <ShipmentMethodsWrapper>
      <BodyCopy
        color="gray.900"
        fontWeight="semibold"
        mobileFontFamily="secondary"
        fontSize="fs16"
        text={shipmentHeader}
        textAlign="left"
      />
      <FieldWrapper>
        {shipmentMethods &&
          shipmentMethods.length > 0 &&
          shipmentMethods.map((option, index) => {
            const { id, displayName, price } = option;
            const title = price > 0 ? `${displayName} - $${price}` : displayName;
            return (
              <>
                <Field
                  component={ShippingMethodButtons}
                  id={id}
                  selectedShipmentId={selectedShipmentId}
                  index={index}
                  name="shippingMethodId"
                  title={title}
                  onPress={() => onShipmentMethodChange({ id, dispatch, formName, formSection })}
                />
              </>
            );
          })}
      </FieldWrapper>
      {selectedShipment && (
        <ShippingMsgWrapper>
          <BodyCopy
            mobileFontFamily="secondary"
            fontSize="fs12"
            fontWeight="semibold"
            text={`${selectedShipment.displayName || ''} - `}
          />
          <BodyCopy
            mobileFontFamily="secondary"
            fontSize="fs12"
            fontWeight="semibold"
            style={italicStyle}
            text={` ${selectedShipment.shippingSpeed || ''}`}
          />
        </ShippingMsgWrapper>
      )}
    </ShipmentMethodsWrapper>
  );
};

ShipmentMethods.propTypes = {
  shipmentMethods: PropTypes.shape([]),
  selectedShipmentId: PropTypes.string,
  shipmentHeader: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  formName: PropTypes.string.isRequired,
  formSection: PropTypes.string.isRequired,
};
ShipmentMethods.defaultProps = {
  shipmentMethods: null,
  selectedShipmentId: null,
  shipmentHeader: '',
};

export default ShipmentMethods;
