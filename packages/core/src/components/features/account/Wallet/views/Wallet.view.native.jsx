import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import MyRewards from '../../common/organism/MyRewards';

export const WalletView = ({labels}) => {
  return (
    <View>
      <MyRewards labels={labels} view="all" />
    </View>
  );
};

WalletView.propTypes = {
  labels: PropTypes.shape({
    myPlaceRewards: PropTypes.shape({
      lbl_my_wallet_heading: PropTypes.string,
      lbl_my_rewards_program_details: PropTypes.string,
    }),
    common: PropTypes.shape({
      lbl_common_tnc: PropTypes.string,
    }),
  }),
};

WalletView.defaultProps = {
  labels: {
    myPlaceRewards: {
      lbl_my_wallet_heading: '',
      lbl_my_rewards_program_details: '',
    },
    common: {
      lbl_common_tnc: '',
    },
  },
};

export default WalletView;
