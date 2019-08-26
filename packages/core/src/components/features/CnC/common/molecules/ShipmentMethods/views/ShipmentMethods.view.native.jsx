import React from 'react';
import { Field, change, } from 'redux-form';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import ShippingMethodButtons from '../../../atoms/ShippingMethodButtons';
import { ShippingMsgWrapper, FieldWrapper, italicStyle } from '../styles/ShipmentMethods.style.native';

const onShipmentMethodChange = ({ id, dispatch, formName, formSection }) => {
  dispatch(change(formName, `${formSection}.shippingMethodId`, id))
}

const ShipmentMethods = ({ shipmentHeader, shipmentMethods, selectedShipmentId, dispatch, formName, formSection }) => {

  const selectedShipment =
    shipmentMethods && shipmentMethods.find(method => method.id === selectedShipmentId);
  return (
    <>
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
                  className="radio-method"
                  selectedShipmentId={selectedShipmentId}
                  index={index}
                  // checked
                  name="shippingMethodId"
                  variation="secondary"
                  title={title}
                  obj={{}}
                  onPress={() => onShipmentMethodChange({ id, dispatch, formName, formSection })}
                />
              </>
            )
          })
        }
      </FieldWrapper>
      {
        selectedShipment && (
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
        )
      }
    </>
  )
}

export default ShipmentMethods;
