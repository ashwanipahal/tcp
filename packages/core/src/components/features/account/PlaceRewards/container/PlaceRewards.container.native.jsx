import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PlaceRewardsView from '../views/PlaceRewardsView';
import { getGlobalLabels, getCommonLabels } from '../../Account/container/Account.selectors';

const PlaceRewardsContainer = ({ labels, ...otherProps }) => {
  return <PlaceRewardsView labels={labels} {...otherProps} />;
};

export const mapStateToProps = state => {
  return {
    labels: getGlobalLabels(state),
    commonLabels: getCommonLabels(state),
  };
};

PlaceRewardsContainer.propTypes = {
  labels: PropTypes.shape({}),
  commonLabels: PropTypes.shape({}),
};

PlaceRewardsContainer.defaultProps = {
  labels: {},
  commonLabels: {},
};

export default connect(mapStateToProps)(PlaceRewardsContainer);
