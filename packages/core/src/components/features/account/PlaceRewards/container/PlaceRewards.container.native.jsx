import React from 'react';
import PropTypes from 'prop-types';
import PlaceRewardsView from '../views/PlaceRewardsView';

const PlaceRewardsContainer = ({ labels }) => {
  return <PlaceRewardsView labels={labels} />;
};

PlaceRewardsContainer.propTypes = {
  labels: PropTypes.shape({}),
};

PlaceRewardsContainer.defaultProps = {
  labels: {},
};

export default PlaceRewardsContainer;
