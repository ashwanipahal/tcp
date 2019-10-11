import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Button from '@tcp/core/src/components/common/atoms/Button';
import { navigateToNestedRoute } from '@tcp/core/src/utils/utils.app';
import ButtonWrapper from '../styles/EmptyOrdersList.style.native';
/**
 * This function will handle click to go to homepage
 * @param {} -
 */

/**
 * This component will render EmptyOrdersList component
 * @param { string, object }
 */
export const EmptyOrdersList = ({ labels, navigation }) => {
  return (
    <>
      <BodyCopy
        mobileFontFamily="secondary"
        fontSize="fs14"
        fontWeight="regular"
        data-locator="no_rewards_msg"
        className="elem-mt-LRG elem-mb-LRG"
        text={getLabelValue(labels, 'lbl_orders_emptySupportingText', 'orders')}
      />
      <ButtonWrapper>
        <Button
          buttonVariation="fixed-width"
          fill="BLUE"
          color="white"
          onPress={() => navigateToNestedRoute(navigation, 'HomeStack', 'home')}
          data-locator="orders-shop-now-btn"
          text={getLabelValue(labels, 'lbl_orders_shopNow', 'orders')}
        />
      </ButtonWrapper>
    </>
  );
};

EmptyOrdersList.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  navigation: PropTypes.shape({}).isRequired,
};

export default EmptyOrdersList;
