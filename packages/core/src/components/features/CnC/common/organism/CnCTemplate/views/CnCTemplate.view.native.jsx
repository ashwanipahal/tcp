import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import OrderLedgerContainer from '../../OrderLedger';
import CouponAndPromos from '../../CouponAndPromos';
import { ButtonWrapper, CheckoutButton } from '../styles/CnCTemplate.style.native';

const CnCCommonTemplate = ({ btnText, onPress }) => {
  return (
    <>
      <View>
        <CouponAndPromos isCheckout />
      </View>
      <View>
        <OrderLedgerContainer />
      </View>
      <ButtonWrapper>
        <CheckoutButton onPress={onPress}>
          <BodyCopy
            color="white"
            fontWeight="extrabold"
            fontFamily="secondary"
            fontSize="fs13"
            text={btnText}
          />
        </CheckoutButton>
      </ButtonWrapper>
    </>
  );
};
CnCCommonTemplate.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
  btnText: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default CnCCommonTemplate;
