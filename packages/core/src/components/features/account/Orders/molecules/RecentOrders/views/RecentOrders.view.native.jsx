import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import { View, Text } from 'react-native';
import OrdersListItem from '../../OrdersListItem';
import EmptyOrdersList from '../../EmptyOrdersList';

/**
 * This component will render RecentOrders component
 * @param { string, object, object }
 */
export const RecentOrders = ({ className, ordersListItems, labels }) => {
  console.info('RecentOrders')
  return (
    <View>
      <Text>Recent orders..</Text>
      <EmptyOrdersList />
    </View>
  );
};

RecentOrders.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  ordersListItems: PropTypes.shape([]).isRequired,
  className: PropTypes.string,
};

RecentOrders.defaultProps = {
  className: '',
};

export default RecentOrders;
