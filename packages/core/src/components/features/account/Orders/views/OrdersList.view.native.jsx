import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import RecentOrders from '../molecules/RecentOrders';

export const OrdersList = ({ labels, ordersListItems, ...otherprops }) => {
  console.info('OrdersList')
  return (
    <React.Fragment>
      <View>
        <Text>This is orders listing view</Text>
      </View>
      <RecentOrders labels={labels} ordersListItems={ordersListItems} />
    </React.Fragment>
  );
};

OrdersList.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  ordersListItems: PropTypes.shape([]).isRequired,
};

export default OrdersList;
