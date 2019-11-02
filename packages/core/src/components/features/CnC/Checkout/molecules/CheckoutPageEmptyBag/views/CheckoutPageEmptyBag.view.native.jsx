import React from 'react';
import PropTypes from 'prop-types';
import {
  EmptyBagTextContainer,
  EmptyBagSubText,
  EmptyBagBoldText,
} from '../styles/CheckoutPageEmptyBag.style.native';

const CheckoutPageEmptyBag = ({ labels: { emptyBagText, emptyBagSubText } = {} }) => {
  return (
    <EmptyBagTextContainer>
      <EmptyBagBoldText>{emptyBagText}</EmptyBagBoldText>
      <EmptyBagSubText>{emptyBagSubText}</EmptyBagSubText>
    </EmptyBagTextContainer>
  );
};

CheckoutPageEmptyBag.propTypes = {
  labels: PropTypes.shape({}).isRequired,
};

export default CheckoutPageEmptyBag;
