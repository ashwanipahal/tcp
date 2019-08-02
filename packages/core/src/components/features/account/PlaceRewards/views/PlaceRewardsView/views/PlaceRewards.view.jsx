import React from 'react';
import PropTypes from 'prop-types';
import PlaceRewardsSection from '../../../organism/PlaceRewardsSection';

const PlaceRewardsView = ({ labels }) => {
  return <PlaceRewardsSection labels={labels} />;
};

PlaceRewardsView.propTypes = {
  labels: PropTypes.shape({}),
};

PlaceRewardsView.defaultProps = {
  labels: { common: {}, myPlaceRewards: {} },
};

export default PlaceRewardsView;
