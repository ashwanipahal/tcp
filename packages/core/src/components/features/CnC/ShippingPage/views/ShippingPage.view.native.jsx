import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import OrderLedgerContainer from '@tcp/core/src/components/features/CnC/common/organism/OrderLedger';
import BodyCopy from '../../../../common/atoms/BodyCopy';
import { ButtonWrapper, CheckoutButton } from '../styles/ShippingPage.style.native';
import CouponAndPromos from '../../common/organism/CouponAndPromos';

const ShippingPage = () => {
  return (
    <ScrollView>
      <View>
        <Text>Checkout Progress Bar container</Text>
      </View>
      <BodyCopy
        color="black"
        fontWeight="regular"
        fontFamily="primary"
        fontSize="fs28"
        text="Shipping Details"
        textAlign="left"
      />
      <View>
        <Text>Shipping Form Container</Text>
      </View>
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
            text="NEXT:BILLING"
          />
        </CheckoutButton>
      </ButtonWrapper>
    </ScrollView>
  );
};

export default ShippingPage;
