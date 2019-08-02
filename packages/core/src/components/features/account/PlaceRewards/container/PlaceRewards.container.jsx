import React from 'react';
import PropTypes from 'prop-types';
import PlaceRewardsView from '../views/PlaceRewardsView';
import utils from '../../../../../utils';

const PlaceRewardsContainer = ({ labels }) => {
  const siteId = utils.getSiteId();
  return siteId !== 'ca' && <PlaceRewardsView labels={labels} />;
};

PlaceRewardsContainer.propTypes = {
  labels: PropTypes.shape({}),
};

PlaceRewardsContainer.defaultProps = {
  labels: { common: {}, myPlaceRewards: {} },
};

export default PlaceRewardsContainer;
