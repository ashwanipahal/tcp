import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import SettingsView from '../views/SettingsModal.view.native';
import { getLabels } from '../../Account/container/Account.selectors';
import getAccountOverviewLabels from './Settings.selectors';

export class SettingsContainer extends PureComponent {
  render() {
    const { accountLabels, navigation, isUserLoggedIn } = this.props;
    const labels = getAccountOverviewLabels(accountLabels);

    return <SettingsView labels={labels} navigation={navigation} isUserLoggedIn={isUserLoggedIn} />;
  }
}

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
