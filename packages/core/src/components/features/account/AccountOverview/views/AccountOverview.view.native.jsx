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
      <Panel title={labels.lbl_overview_addressBookHeading} isLinkVariation={false}>
        <AddressOverviewTile labels={labels} handleComponentChange={handleComponentChange} />
      </Panel>
      <Panel title={labels.lbl_overview_paymentHeading}>
        <PaymentTile labels={labels} handleComponentChange={handleComponentChange} />
      </Panel>
      <Panel title={labels.lbl_overview_myPreferencesHeading} />
      <Panel title={labels.lbl_overview_myPlaceRewardsCardHeading} />
      <Panel title={labels.lbl_overview_myFavoritesHeading} isFavorite isVariationTypeLink />

      <UnderlineStyle />

      <Panel
        title={labels.lbl_overview_apply_today}
        isVariationTypeLink
        handleComponentChange={handleComponentChange}
        isCardApply
      />
      <Panel title={labels.lbl_overview_manage_creditCard} isVariationTypeLink />

      <UnderlineStyle />

      <Panel title={labels.lbl_overview_purchase_giftCards} isVariationTypeLink />
      <Panel title={labels.lbl_overview_refer_friend} isVariationTypeLink />

      <UnderlineStyle />

      <Panel title={labels.lbl_overview_app_settings} isVariationTypeLink />
      <Panel title={labels.lbl_overview_help} isVariationTypeLink />
      <Panel title={labels.lbl_overview_messages} isVariationTypeLink />
      <Panel title={labels.lbl_overview_logout} isVariationTypeLink />

      <UnderlineStyle />
    </View>
  );
};

AccountOverview.propTypes = {
  labels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])).isRequired,
  handleComponentChange: PropTypes.func.isRequired,
};

export default AccountOverview;
