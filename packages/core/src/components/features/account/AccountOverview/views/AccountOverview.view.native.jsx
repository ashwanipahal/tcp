import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Panel from '../../../../common/molecules/Panel';
import PaymentTile from '../../common/organism/PaymentTile';
import AddressOverviewTile from '../../common/organism/AddressOverviewTile';
import UnderlineStyle from '../styles/AccountOverview.style.native';

const AccountOverview = ({ labels, handleComponentChange }) => {
  const viewContainerStyle = { marginTop: 15 };

  return (
    <View style={viewContainerStyle}>
      <Panel title={labels.lbl_overview_myPlaceRewardsHeading} />
      <Panel title={labels.lbl_overview_myWalletHeading} />
      <Panel title={labels.lbl_overview_earnPointsHeading} />
      <Panel title={labels.lbl_overview_ordersHeading} />
      <Panel title={labels.lbl_overview_profileInformationHeading} />
      <Panel title={labels.lbl_overview_addressBookHeading}>
        <AddressOverviewTile labels={labels} handleComponentChange={handleComponentChange} />
      </Panel>
      <Panel title={labels.lbl_overview_paymentHeading}>
        <PaymentTile labels={labels} handleComponentChange={handleComponentChange} />
      </Panel>
      <Panel title={labels.lbl_overview_myPreferencesHeading} />
      <Panel title={labels.lbl_overview_myPlaceRewardsCardHeading} />
      <Panel title={labels.lbl_overview_myFavoritesHeading} />

      <UnderlineStyle />

      <Panel title={labels.lbl_overview_myPreferencesHeading} isLink />
      <Panel title={labels.lbl_overview_myPlaceRewardsCardHeading} />
      <Panel title={labels.lbl_overview_myFavoritesHeading} />
    </View>
  );
};

AccountOverview.propTypes = {
  labels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])).isRequired,
  handleComponentChange: PropTypes.func.isRequired,
};

export default AccountOverview;
