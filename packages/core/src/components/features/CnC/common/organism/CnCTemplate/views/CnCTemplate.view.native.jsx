import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import OrderLedgerContainer from '../../OrderLedger';
import CouponAndPromos from '../../CouponAndPromos';
import { ButtonWrapper, CheckoutButton } from '../styles/CnCTemplate.style.native';
import { navigateToNestedRoute } from '../../../../../../../utils/utils.app';

const CnCCommonTemplate = ({ navigation, btnText, routeToPage }) => {
  return (
    <>
      <View>
        <CouponAndPromos />
      </View>
      <View>
        <OrderLedgerContainer />
      </View>
      <ButtonWrapper>
        <CheckoutButton>
          <BodyCopy
            color="white"
            fontWeight="extrabold"
            fontFamily="secondary"
            fontSize="fs13"
            text={btnText}
            onPress={() => {
              navigateToNestedRoute(navigation, 'HomeStack', { routeToPage });
            }}
          />
        </CheckoutButton>
      </ButtonWrapper>
    </>
  );
};
CnCCommonTemplate.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
  btnText: PropTypes.string.isRequired,
  routeToPage: PropTypes.string.isRequired,
};

export default CnCCommonTemplate;
