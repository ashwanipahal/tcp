import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import BodyCopy from '../../../../common/atoms/BodyCopy';
import CnCTemplate from '../../common/organism/CnCTemplate';

const ShippingPage = ({ navigation }) => {
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
      <CnCTemplate navigation={navigation} btnText="NEXT:BILLING" routeToPage="" />
    </ScrollView>
  );
};
ShippingPage.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
};

export default ShippingPage;
