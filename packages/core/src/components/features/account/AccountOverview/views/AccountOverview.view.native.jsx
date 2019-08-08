import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Panel from '../../../../common/molecules/Panel';
import PaymentOverviewTile from '../../common/organism/PaymentOverviewTile';

const AccountOverview = ({ labels }) => {
  const viewContainerStyle = { marginTop: 15 };

  return (
    <View style={viewContainerStyle}>
      <Panel title={labels.lbl_overview_myPlaceRewardsHeading} />
      <Panel title={labels.lbl_overview_myWalletHeading} />
      <Panel title={labels.lbl_overview_earnPointsHeading} />
      <Panel title={labels.lbl_overview_ordersHeading} />
      <Panel title={labels.lbl_overview_profileInformationHeading} />
      <Panel title={labels.lbl_overview_addressBookHeading} />
      <Panel title={labels.lbl_overview_paymentHeading}>
        <PaymentOverviewTile />
      </Panel>
      <Panel title={labels.lbl_overview_myPreferencesHeading} />
      <Panel title={labels.lbl_overview_myPlaceRewardsCardHeading} />
      <Panel title={labels.lbl_overview_myFavoritesHeading} />
    </View>
  );
};

AccountOverview.propTypes = {
  labels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])).isRequired,
};

export default AccountOverview;
