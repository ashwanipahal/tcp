import React from 'react';
import PropTypes from 'prop-types';
import AccountOverviewTile from '../../../../../../common/molecules/AccountOverviewTile';
import BodyCopy from '../../../../../../common/atoms/BodyCopy/views/BodyCopy';
import withStyles from '../../../../../../common/hoc/withStyles';
import internalEndpoints from '../../../internalEndpoints';
import EarnExtraPointsTileContainer from '../../EarnExtraPointsTile';
import { getLabelValue } from '../../../../../../../utils';

/**
 *
 * @function EarnExtraPointsOverview
 * @description renders the Earn Extra Points component on Account Overview
 */
const EarnExtraPointsOverview = ({ labels }) => {
  return (
    <AccountOverviewTile
      title={getLabelValue(labels, 'lbl_common_earnExtraPoints')}
      ctaTitle={getLabelValue(labels, 'lbl_common_viewAll')}
      ctaLink={internalEndpoints.extraPointsPage.link}
      ctaPath={internalEndpoints.extraPointsPage.path}
      dataLocatorPrefix="earnExtaPointTitle"
    >
      <section className="elem-pb-MED">
        <BodyCopy
          className="elem-mb-LRG"
          fontSize="fs14"
          fontWeight="semibold"
          data-locator="getCloserToRewarddf"
        >
          {getLabelValue(labels, 'lbl_earnExtraPoints_getReward')}
        </BodyCopy>

        <EarnExtraPointsTileContainer isAccountOverview />
      </section>
    </AccountOverviewTile>
  );
};

EarnExtraPointsOverview.propTypes = {
  labels: PropTypes.shape({}).isRequired,
};

export default withStyles(EarnExtraPointsOverview);
