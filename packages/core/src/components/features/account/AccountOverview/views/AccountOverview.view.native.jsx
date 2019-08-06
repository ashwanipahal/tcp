import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Panel from '../../../../common/molecules/Panel';

const AccountOverview = ({ labels }) => {
  const viewContainerStyle = { marginTop: 15 };
  return (
    <View style={viewContainerStyle}>
      <Panel title={labels.lbl_place_rewards || 'My Place Rewards'} />
      <Panel title="My Wallet" />
      <Panel title="Earn Extra Points" />
      <Panel title="Orders" />
      <Panel title="Profile Information" />
      <Panel title="Address Book" />
      <Panel title="Payment & Gift Cards" />
      <Panel title="My Preferences" />
      <Panel title="My Place Rewards Credit Card" />
      <Panel title="My Favorites" />
    </View>
  );
};

AccountOverview.propTypes = {
  labels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
};

AccountOverview.defaultProps = {
  labels: {
    lbl_place_rewards: 'My Place Rewards',
  },
};

export default AccountOverview;
