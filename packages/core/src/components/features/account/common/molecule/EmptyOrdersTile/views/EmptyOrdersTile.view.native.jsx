import React from 'react';
import PropTypes from 'prop-types';
import { ViewWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';
import { navigateToNestedRoute } from '@tcp/core/src/utils/utils.app';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Button from '../../../../../../common/atoms/Button';

const EmptyOrdersTile = ({ labels, navigation }) => {
  return (
    <>
      <BodyCopy
        mobileFontFamily="secondary"
        fontSize="fs14"
        fontWeight="semibold"
        data-locator="no_rewards_msg"
        text={getLabelValue(labels, 'lbl_ordersTile_noOrderYet', 'orders')}
      />

      <ViewWithSpacing spacingStyles="margin-top-LRG">
        <Button
          buttonVariation="variable-width"
          fill="WHITE"
          color="gray"
          onPress={() => navigateToNestedRoute(navigation, 'HomeStack', 'home')}
          data-locator="orders-shop-now-btn"
          text={getLabelValue(labels, 'lbl_orders_shopNow', 'orders')}
        />
      </ViewWithSpacing>
    </>
  );
};

EmptyOrdersTile.propTypes = {
  labels: PropTypes.shape({}),
  navigation: PropTypes.shape({}),
};

EmptyOrdersTile.defaultProps = {
  labels: {
    orders: {
      lbl_ordersTile_noOrderYet: '',
      lbl_orders_shopNow: '',
    },
  },
  navigation: {},
};

export default EmptyOrdersTile;
