import React from 'react';
import PropTypes from 'prop-types';
import { EmptyBagTextContainer } from '../styles/CheckoutPageEmptyBag.style.native';
import { BodyCopyWithSpacing } from '../../../../../../common/atoms/styledWrapper';

const CheckoutPageEmptyBag = ({ labels: { emptyBagText, emptyBagSubText } = {} }) => {
  return (
    <EmptyBagTextContainer>
      <BodyCopyWithSpacing
        text={emptyBagText}
        fontSize="fs18"
        fontWeight="extrabold"
        fontFamily="secondary"
        spacingStyles="margin-bottom-MED margin-left-MED margin-right-MED"
      />
      <BodyCopyWithSpacing
        text={emptyBagSubText}
        fontSize="fs14"
        fontFamily="secondary"
        spacingStyles="margin-bottom-MED margin-left-MED margin-right-MED"
      />
    </EmptyBagTextContainer>
  );
};

CheckoutPageEmptyBag.propTypes = {
  labels: PropTypes.shape({}).isRequired,
};

export default CheckoutPageEmptyBag;
