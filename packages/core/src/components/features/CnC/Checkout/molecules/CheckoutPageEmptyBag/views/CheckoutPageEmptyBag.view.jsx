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
      <EmptyBagBoldText>
        {emptyBagText}
        Your shipping bag is empty.
      </EmptyBagBoldText>
      <EmptyBagSubText>
        {emptyBagSubText}
        Your shipping bag is empty.Your shipping bag is empty.Your shipping bag is empty.Your
        shipping bag is empty.Your shipping bag is empty.Your shipping bag is empty.Your shipping
        bag is empty.Your shipping bag is empty.Your shipping bag is empty.
      </EmptyBagSubText>
    </EmptyBagTextContainer>
  );
};

CheckoutPageEmptyBag.propTypes = {
  labels: PropTypes.shape({}).isRequired,
};

export default CheckoutPageEmptyBag;
