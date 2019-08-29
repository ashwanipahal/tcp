import React from 'react';
import PropTypes from 'prop-types';
import PageHeadingWithLinks from '../../common/molecule/PageHeadingWithLinks';
import MyRewards from '../../common/organism/MyRewards';

const WalletView = ({ labels }) => {
  return (
    <div>
      <PageHeadingWithLinks
        heading={labels.myPlaceRewards.lbl_my_wallet_heading}
        programDetailsCta={labels.common.lbl_common_tnc}
        termsConditionCta={labels.myPlaceRewards.lbl_my_rewards_program_details}
      >
        <MyRewards labels={labels} view="all" />
      </PageHeadingWithLinks>
    </div>
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
