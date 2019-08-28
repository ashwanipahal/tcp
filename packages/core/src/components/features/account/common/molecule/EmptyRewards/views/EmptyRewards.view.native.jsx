import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import { StyledBodyCopy } from '../styles/EmptyRewards.style.native';
import Button from '../../../../../../common/atoms/Button';

const buttonStyle = { fontWeight: '400', marginBottom: 48 };

const EmptyRewards = ({ labels }) => {
  const heading = `${labels.myPlaceRewards.lbl_my_rewards_heading} (0)`;

  return (
    <View>
      <StyledBodyCopy>
        <BodyCopy
          mobileFontFamily="secondary"
          fontSize="fs16"
          fontWeight="semibold"
          data-locator="my-rewards-heading"
          text={heading}
        />
      </StyledBodyCopy>
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
      <Button
        buttonVariation="variable-width"
        fill="BLUE"
        color="white"
        data-locator="my-rewards-shop-now-btn"
        text={labels.myPlaceRewards.lbl_my_rewards_shop_now}
        style={buttonStyle}
      />
    </View>
  );
};

EmptyRewards.propTypes = {
  labels: PropTypes.shape({ common: {}, myPlaceRewards: {} }),
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
