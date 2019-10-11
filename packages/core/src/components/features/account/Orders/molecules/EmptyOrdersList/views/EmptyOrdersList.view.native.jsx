import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Button from '@tcp/core/src/components/common/atoms/Button';
import { View, Text } from 'react-native';
// import Col from '@tcp/core/src/components/common/atoms/Col';
// import Button from '@tcp/core/src/components/common/atoms/Button';
// import { routerPush } from '@tcp/core/src/utils';
// import internalEndpoints from '../../../../common/internalEndpoints';

/**
 * This function will handle click to go to homepage
 * @param {} -
 */

/**
 * This component will render EmptyOrdersList component
 * @param { string, object }
 */
export const EmptyOrdersList = ({ className, labels }) => {
  console.info('EmptyOrdersList')
  return (
    <>
      <BodyCopy
        mobileFontFamily="secondary"
        fontSize="fs14"
        fontWeight="semibold"
        data-locator="no_rewards_msg"
        text={getLabelValue(labels, 'lbl_ordersTile_noOrderYet', 'orders')}
      />
      <Button
        buttonVariation="variable-width"
        fill="WHITE"
        color="gray"
        onPress={() => navigateToNestedRoute(navigation, 'HomeStack', 'home')}
        data-locator="orders-shop-now-btn"
        text={getLabelValue(labels, 'lbl_orders_shopNow', 'orders')}
      />
    </>
  );
};

EmptyOrdersList.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  className: PropTypes.string,
};

EmptyOrdersList.defaultProps = {
  className: '',
};

export default EmptyOrdersList;
