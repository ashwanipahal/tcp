import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import BodyCopy from '../../../../common/atoms/BodyCopy';
import CnCTemplate from '../../common/organism/CnCTemplate';

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
      <CnCTemplate navigation={navigation} btnText="NEXT:SHIPPING" routeToPage="ShippingPage" />
    </ScrollView>
  );
};
PickupPage.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
};

export default PickupPage;
