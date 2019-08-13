import React from 'react';
import PropTypes from 'prop-types';
import FPO from '../../../../../../common/atoms/FPO';

import AccountOverviewTile from '../../../../../../common/molecules/AccountOverviewTile';

export const MyPlaceRewardsOverviewTile = ({ labels }) => {
  return (
    <AccountOverviewTile
      title={labels.lbl_overview_myPlaceRewardsHeading}
      ctaTitle={labels.lbl_overview_myPlaceRewardsCTA}
    >
      <FPO />
    </AccountOverviewTile>
  );
};

MyPlaceRewardsOverviewTile.propTypes = {
  labels: PropTypes.shape({
    lbl_overview_myPlaceRewardsHeading: PropTypes.string,
    lbl_overview_myPlaceRewardsCTA: PropTypes.string,
  }),
};

MyPlaceRewardsOverviewTile.defaultProps = {
  labels: {
    lbl_overview_myPlaceRewardsHeading: '',
    lbl_overview_myPlaceRewardsCTA: '',
  },
};

export default MyPlaceRewardsOverviewTile;
