import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import SettingsView from '../views/SettingsModal.view.native';
import { getLabels } from '../../Account/container/Account.selectors';
import getAccountOverviewLabels from './Settings.selectors';

export const SettingsContainer = props => {
  const { accountLabels, navigation, isUserLoggedIn } = props;
  const labels = getAccountOverviewLabels(accountLabels);
  return <SettingsView labels={labels} navigation={navigation} isUserLoggedIn={isUserLoggedIn} />;
};

export const mapStateToProps = state => {
  return {
    accountLabels: getLabels(state),
  };
};

SettingsContainer.propTypes = {
  accountLabels: PropTypes.shape({}).isRequired,
  navigation: PropTypes.shape({}).isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(SettingsContainer);
