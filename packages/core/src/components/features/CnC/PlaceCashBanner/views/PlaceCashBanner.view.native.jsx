import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import withStyles from '../../../../common/hoc/withStyles';

/**
 * PlaceCashBanner Component
 * @description Display User's place cash value earned
 * @param {*} label
 * @param {Boolean} isEnabled
 * @returns {JSX}
 */

const PlaceCashBanner = props => {
  const { labels, isEnabled } = props;
  return isEnabled ? <Text>{labels.label1}</Text> : null;
};

PlaceCashBanner.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  isEnabled: PropTypes.isRequired,
};

export default withStyles(PlaceCashBanner);
export { PlaceCashBanner as PlaceCashBannerVanilla };
