import React from 'react';
import Wrapper from '../styles/ShippingMethodButtons.style.native';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';

const ShippingMethodButtons = ({ title, checked, onPress, id, selectedShipmentId, index }) => {
  const isChecked = selectedShipmentId === id;
  return (
    <Wrapper checked={isChecked} index={index} onPress={() => onPress()}>
      <BodyCopy textAlign="center" mobileFontFamily="secondary" fontSize="fs10" fontWeight={isChecked ? 'black' : 'semibold'} color={isChecked ? 'white' : 'gray.700'} checked={isChecked} text={title} />
    </Wrapper>
  )

}

export default ShippingMethodButtons;
