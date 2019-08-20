import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import OrderLedgerContainer from '@tcp/core/src/components/features/CnC/common/organism/OrderLedger';
import PropTypes from 'prop-types';
import BodyCopy from '../../../../common/atoms/BodyCopy';
import { ButtonWrapper, CheckoutButton } from '../styles/PickupPage.style.native';
import { navigateToNestedRoute } from '../../../../../utils/utils.app';
import CouponAndPromos from '../../common/organism/CouponAndPromos';

const PickupPage = ({ navigation }) => {
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
        text="Pickup Contact"
        textAlign="left"
      />
      <View>
        <Text>PickUp Form Container</Text>
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
            text="NEXT:SHIPPING"
            onPress={() => {
              console.log('ShippingPage to bag clicked');
              navigateToNestedRoute(navigation, 'HomeStack', 'ShippingPage');
            }}
          />
        </CheckoutButton>
      </ButtonWrapper>
    </ScrollView>
  );
};
PickupPage.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
};

export default PickupPage;
