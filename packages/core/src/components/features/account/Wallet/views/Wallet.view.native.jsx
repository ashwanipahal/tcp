import React from 'react';
import { View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import RewardsPoints from '@tcp/core/src/components/features/account/common/organism/RewardsPoints';
import { getLabelValue } from '@tcp/core/src/utils';
import WalletLayout from '../styles/Wallet.style.native';
import MyRewards from '../../common/organism/MyRewards';
import PageHeadingWithLinks from '../../common/molecule/PageHeadingWithLinks';

export const WalletView = ({ labels, commonLabels, ...props }) => {
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <WalletLayout>
          <RewardsPoints tableView />
          <PageHeadingWithLinks
            heading={getLabelValue(labels, 'lbl_my_wallet_heading', 'placeRewards')}
            programDetailsCta={getLabelValue(
              labels,
              'lbl_my_rewards_program_details',
              'placeRewards'
            )}
            termsConditionCta={getLabelValue(commonLabels, 'lbl_common_tnc')}
          >
            <MyRewards labels={labels} view="all" {...props} />
          </PageHeadingWithLinks>
        </WalletLayout>
      </ScrollView>
    </View>
  );
};

WalletView.propTypes = {
  labels: PropTypes.shape({
    placeRewards: PropTypes.shape({
      lbl_my_wallet_heading: PropTypes.string,
      lbl_my_rewards_program_details: PropTypes.string,
    }),
    common: PropTypes.shape({
      lbl_common_tnc: PropTypes.string,
    }),
  }),
  commonLabels: PropTypes.shape({}),
};

WalletView.defaultProps = {
  labels: {
    placeRewards: {
      lbl_my_wallet_heading: '',
      lbl_my_rewards_program_details: '',
    },
    common: {
      lbl_common_tnc: '',
    },
  },
  commonLabels: {},
};

export default WalletView;
