import React from 'react';
import PropTypes from 'prop-types';
import Image from '@tcp/core/src/components/common/atoms/Image';
import { getIconCard } from '@tcp/core/src/utils/index.native';
import { Wrapper, ImageWrapper } from '../styles/PaymentMethodTypes.style.native';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';

const getIcon = type => {
  switch (type) {
    case 'payPal':
      return getIconCard('paypal-icon');
    case 'venmo':
      return getIconCard('venmo-blue-acceptance-mark');
    default:
      return null;
  }
};
const PaymentMethodTypes = ({ title, onPress, id, selectedPaymentId, index }) => {
  const isChecked = selectedPaymentId === id;
  const paymentTypeIcon = getIcon(id);
  return (
    <Wrapper checked={isChecked} index={index} onPress={() => onPress()}>
      <BodyCopy
        textAlign="center"
        mobileFontFamily="secondary"
        fontSize="fs13"
        fontWeight="extrabold"
        color={paymentTypeIcon ? 'white' : 'gray.700'}
        checked={isChecked}
        text={title.toUpperCase()}
      />
      {paymentTypeIcon && (
        <ImageWrapper>{<Image source={paymentTypeIcon} width="95" height="30" />}</ImageWrapper>
      )}
    </Wrapper>
  );
};

PaymentMethodTypes.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
  id: PropTypes.string,
  selectedPaymentId: PropTypes.string,
  index: PropTypes.number,
};

PaymentMethodTypes.defaultProps = {
  title: '',
  onPress: () => {},
  id: null,
  selectedPaymentId: null,
  index: null,
};

export default PaymentMethodTypes;
