import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { ViewWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';
import { navigateToNestedRoute } from '@tcp/core/src/utils/utils.app';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import { StyledBodyCopy } from '../styles/EmptyRewards.style.native';
import Button from '../../../../../../common/atoms/Button';

const EmptyRewards = ({ labels, navigation }) => {
  return (
    <View>
      <StyledBodyCopy>
        <BodyCopy
          mobileFontFamily="secondary"
          fontSize="fs14"
          fontWeight="regular"
          data-locator="no_rewards_msg"
          text={getLabelValue(labels, 'lbl_my_rewards_no_available_rewards', 'placeRewards')}
        />
        <BodyCopy
          mobileFontFamily="secondary"
          fontSize="fs14"
          fontWeight="regular"
          data-locator="no_rewards_msg"
          text={getLabelValue(labels, 'lbl_my_rewards_start_shopping', 'placeRewards')}
        />
      </StyledBodyCopy>
      <ViewWithSpacing spacingStyles="margin-bottom-LRG">
        <Button
          buttonVariation="variable-width"
          fill="BLUE"
          color="white"
          onPress={() => navigateToNestedRoute(navigation, 'HomeStack', 'home')}
          data-locator="my-rewards-shop-now-btn"
          text={getLabelValue(labels, 'lbl_my_rewards_shop_now', 'placeRewards')}
        />
      </ViewWithSpacing>
    </View>
  );
};

EmptyRewards.propTypes = {
  labels: PropTypes.shape({ common: {}, placeRewards: {} }),
  navigation: PropTypes.shape({}),
};

EmptyRewards.defaultProps = {
  labels: {
    common: { lbl_common_tnc: '' },
    placeRewards: {
      lbl_my_rewards_no_available_rewards: '',
      lbl_my_rewards_shop_now: '',
      lbl_my_rewards_start_shopping: '',
      lbl_my_rewards_heading: '',
    },
  },
  navigation: {},
};

export default EmptyRewards;
