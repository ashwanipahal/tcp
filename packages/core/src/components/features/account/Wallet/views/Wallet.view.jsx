import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import PageHeadingWithLinks from '../../common/molecule/PageHeadingWithLinks';
import MyRewards from '../../common/organism/MyRewards';

const WalletView = ({ labels }) => {
  return (
    <PageHeadingWithLinks
      heading={getLabelValue(labels, 'lbl_my_wallet_heading', 'placeRewards')}
      programDetailsCta={getLabelValue(labels, 'lbl_my_rewards_program_details', 'placeRewards')}
      termsConditionCta={getLabelValue(labels, 'lbl_common_tnc', 'placeRewards')}
    >
      <MyRewards labels={labels} view="all" />
    </PageHeadingWithLinks>
  );
};

WalletView.propTypes = {
  labels: PropTypes.shape({
    placeRewards: PropTypes.shape({
      lbl_my_wallet_heading: PropTypes.string,
      lbl_my_rewards_program_details: PropTypes.string,
      lbl_common_tnc: PropTypes.string,
    }),
  }),
};

WalletView.defaultProps = {
  labels: {
    placeRewards: {
      lbl_my_wallet_heading: '',
      lbl_my_rewards_program_details: '',
      lbl_common_tnc: '',
    },
  },
};

export default WalletView;
