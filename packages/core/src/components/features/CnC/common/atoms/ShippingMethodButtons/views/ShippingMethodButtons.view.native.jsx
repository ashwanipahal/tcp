import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from '../styles/ShippingMethodButtons.style.native';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';

const ShippingMethodButtons = ({ title, onPress, id, selectedShipmentId, index }) => {
  const isChecked = selectedShipmentId === id;
  return (
    <Wrapper checked={isChecked} index={index} onPress={() => onPress()}>
      <BodyCopy
        textAlign="center"
        mobileFontFamily="secondary"
        fontSize="fs10"
        fontWeight={isChecked ? 'black' : 'semibold'}
        color={isChecked ? 'white' : 'gray.700'}
        checked={isChecked}
        text={title}
      />
    </Wrapper>
  );
};

ShippingMethodButtons.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
  id: PropTypes.string,
  selectedShipmentId: PropTypes.string,
  index: PropTypes.number,
};

ShippingMethodButtons.defaultProps = {
  title: '',
  onPress: () => {},
  id: null,
  selectedShipmentId: null,
  index: null,
};

export default ShippingMethodButtons;
