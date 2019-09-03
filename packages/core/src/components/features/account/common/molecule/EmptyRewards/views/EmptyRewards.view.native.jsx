import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { ViewWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import { StyledBodyCopy } from '../styles/EmptyRewards.style.native';
import Button from '../../../../../../common/atoms/Button';
import { navigateToNestedRoute } from '../../../../../../../utils/index.native';

const EmptyRewards = ({ labels, navigation }) => {
  return (
    <View>
      <StyledBodyCopy>
        <BodyCopy
          mobileFontFamily="secondary"
          fontSize="fs14"
          fontWeight="regular"
          data-locator="no_rewards_msg"
          text={labels.myPlaceRewards.lbl_my_rewards_no_available_rewards}
        />
        <BodyCopy
          mobileFontFamily="secondary"
          fontSize="fs14"
          fontWeight="regular"
          data-locator="no_rewards_msg"
          text={labels.myPlaceRewards.lbl_my_rewards_start_shopping}
        />
      </StyledBodyCopy>
      <ViewWithSpacing spacingStyles="margin-bottom-LRG">
        <Button
          buttonVariation="variable-width"
          fill="BLUE"
          color="white"
          data-locator="my-rewards-shop-now-btn"
          text={labels.myPlaceRewards.lbl_my_rewards_shop_now}
          onPress={() => {
            navigateToNestedRoute(navigation, 'HomeStack', 'home');
          }}
        />
      </ViewWithSpacing>
    </View>
  );
};

EmptyRewards.propTypes = {
  labels: PropTypes.shape({ common: {}, myPlaceRewards: {} }),
  navigation: PropTypes.shape({}).isRequired,
};

EmptyRewards.defaultProps = {
  labels: {
    common: { lbl_common_tnc: '' },
    myPlaceRewards: {
      lbl_my_rewards_no_available_rewards: '',
      lbl_my_rewards_shop_now: '',
      lbl_my_rewards_start_shopping: '',
      lbl_my_rewards_heading: '',
    },
  },
};

export default EmptyRewards;
