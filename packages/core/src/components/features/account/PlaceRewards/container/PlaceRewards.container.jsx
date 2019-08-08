import React from 'react';
import PropTypes from 'prop-types';
import PlaceRewardsView from '../views/PlaceRewardsView';
import { getSiteId } from '../../../../../utils/utils.web';
import { API_CONFIG } from '../../../../../services/config';

const PlaceRewardsContainer = ({ labels }) => {
  const siteId = getSiteId();
  return siteId !== API_CONFIG.siteIds.ca && <PlaceRewardsView labels={labels} />;
};

PlaceRewardsContainer.propTypes = {
  labels: PropTypes.shape({}),
};

PlaceRewardsContainer.defaultProps = {
  labels: {},
};

export default PlaceRewardsContainer;
