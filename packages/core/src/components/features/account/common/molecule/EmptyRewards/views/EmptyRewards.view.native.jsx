import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { ViewWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import { StyledBodyCopy } from '../styles/EmptyRewards.style.native';
import Button from '../../../../../../common/atoms/Button';

const EmptyRewards = ({ labels }) => {
  return (
    <View>
      <StyledBodyCopy>
        <BodyCopy
          mobileFontFamily="secondary"
          fontSize="fs14"
          fontWeight="regular"
          data-locator="no_rewards_msg"
          text={labels.placeRewards.lbl_my_rewards_no_available_rewards}
        />
        <BodyCopy
          mobileFontFamily="secondary"
          fontSize="fs14"
          fontWeight="regular"
          data-locator="no_rewards_msg"
          text={labels.placeRewards.lbl_my_rewards_start_shopping}
        />
      </StyledBodyCopy>
      <ViewWithSpacing spacingStyles="margin-bottom-LRG">
        <Button
          buttonVariation="variable-width"
          fill="BLUE"
          color="white"
          data-locator="my-rewards-shop-now-btn"
          text={labels.placeRewards.lbl_my_rewards_shop_now}
        />
      </ViewWithSpacing>
    </View>
  );
};

EmptyRewards.propTypes = {
  labels: PropTypes.shape({ common: {}, placeRewards: {} }),
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
};

export default EmptyRewards;
