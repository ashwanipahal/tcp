import React, { PureComponent } from 'react';
import { View, Platform } from 'react-native';
import PropTypes from 'prop-types';
import MyPlaceRewardsOverviewTile from '@tcp/core/src/components/features/account/common/organism/MyPlaceRewardsOverviewTile';
import MyWalletTile from '@tcp/core/src/components/features/account/common/organism/MyWalletTile';
import EarnExtraPointsOverview from '@tcp/core/src/components/features/account/common/organism/EarnExtraPointsOverview';
import { getLabelValue } from '@tcp/core/src/utils';
import AsyncStorage from '@react-native-community/async-storage';
import CookieManager from 'react-native-cookies';
import Panel from '../../../../common/molecules/Panel';
import PaymentTile from '../../common/organism/PaymentTile';
import LegalLinks from '../../../../common/molecules/LegalLinks';
import MyPlaceRewardsCreditCard from '../../common/organism/MyPlaceRewardsCreditCard';
import AddressOverviewTile from '../../common/organism/AddressOverviewTile';
import OrdersTile from '../../common/organism/OrdersTile';
import MyPreferencesTile from '../../common/organism/MyPreferencesTile';
import {
  LegalStyleLinkStyles,
  CopyrightText,
  UnderlineStyle,
} from '../styles/AccountOverview.style.native';
import ProfileInfoContainer from '../../common/organism/ProfileInfoTile';
import OrderNotification from '../../OrderNotification';
import FooterLinks from '../../common/molecule/FooterLinks';
import mock from './mock';

class AccountOverview extends PureComponent<Props> {
  componentDidUpdate(prevPops) {
    const { isUserLoggedIn } = this.props;
    if (prevPops.isUserLoggedIn !== isUserLoggedIn && isUserLoggedIn && Platform.OS === 'ios')
      // save cookies in the async storage for ios
      CookieManager.getAll().then(res => {
        Object.keys(res).forEach(key => {
          if (key.startsWith('WC_')) {
            AsyncStorage.setItem(key, res[key].value);
          }
        });
      });
  }

  render() {
    const {
      isUserLoggedIn,
      labels,
      commonLabels,
      handleComponentChange,
      navigation,
      openApplyNowModal,
    } = this.props;
    const viewContainerStyle = { marginTop: 15 };
    const { legalLinks } = mock;
    const accountFooterLinks = mock.accountFooterNavLegalLinks;

    return (
      <View style={viewContainerStyle}>
        <OrderNotification />
        {isUserLoggedIn && (
          <React.Fragment>
            <Panel title={getLabelValue(labels, 'lbl_overview_myPlaceRewardsHeading')}>
              <MyPlaceRewardsOverviewTile
                labels={labels}
                commonLabels={commonLabels}
                handleComponentChange={handleComponentChange}
              />
            </Panel>

            <Panel title={getLabelValue(labels, 'lbl_overview_myWalletHeading')}>
              <MyWalletTile
                labels={labels}
                commonLabels={commonLabels}
                handleComponentChange={handleComponentChange}
              />
            </Panel>
            <Panel title={getLabelValue(labels, 'lbl_overview_earnPointsHeading')}>
              <EarnExtraPointsOverview handleComponentChange={handleComponentChange} />
            </Panel>
            <Panel title={getLabelValue(labels, 'lbl_overview_ordersHeading')}>
              <OrdersTile
                labels={labels}
                navigation={navigation}
                handleComponentChange={handleComponentChange}
              />
            </Panel>
            <Panel title={getLabelValue(labels, 'lbl_overview_addressBookHeading')}>
              <AddressOverviewTile labels={labels} handleComponentChange={handleComponentChange} />
            </Panel>
            <Panel title={getLabelValue(labels, 'lbl_overview_profileInformationHeading')}>
              <ProfileInfoContainer labels={labels} handleComponentChange={handleComponentChange} />
            </Panel>
            <Panel title={getLabelValue(labels, 'lbl_overview_paymentHeading')}>
              <PaymentTile labels={labels} handleComponentChange={handleComponentChange} />
            </Panel>
            <Panel title={getLabelValue(labels, 'lbl_overview_myPreferencesHeading')}>
              <MyPreferencesTile labels={labels} handleComponentChange={handleComponentChange} />
            </Panel>
            <Panel title={getLabelValue(labels, 'lbl_overview_myPlaceRewardsCardHeading')}>
              <MyPlaceRewardsCreditCard
                labels={labels}
                handleComponentChange={handleComponentChange}
              />
            </Panel>
          </React.Fragment>
        )}
        {accountFooterLinks && accountFooterLinks.length > 0 ? (
          <FooterLinks
            isUserLoggedIn={isUserLoggedIn}
            labels={labels}
            navigation={navigation}
            handleComponentChange={handleComponentChange}
            openApplyNowModal={openApplyNowModal}
            footerLinks={accountFooterLinks}
            showDivider
          />
        ) : null}
        <UnderlineStyle />
        <View style={LegalStyleLinkStyles}>
          <LegalLinks links={legalLinks} />
        </View>
        <CopyrightText>{getLabelValue(labels, 'lbl_overview_copyrightTxt')}</CopyrightText>
      </View>
    );
  }
}

AccountOverview.propTypes = {
  labels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
  handleComponentChange: PropTypes.func.isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
  commonLabels: PropTypes.shape({}),
};

AccountOverview.defaultProps = {
  labels: {
    lbl_overview_messages: '',
    lbl_overview_help: '',
    lbl_overview_app_settings: '',
    lbl_overview_refer_friend: '',
    lbl_overview_purchase_giftCards: '',
    lbl_overview_manage_creditCard: '',
    lbl_overview_apply_today: '',
    lbl_overview_myFavoritesHeading: '',
    lbl_overview_createAccount: '',
    lbl_overview_login_text: '',
    lbl_overview_join_text: '',
    lbl_overview_logout_heading_Text_2: '',
    lbl_overview_logout_heading_Text_1: '',
    lbl_overview_myPlaceRewardsCardHeading: '',
    lbl_overview_myPreferencesHeading: '',
    lbl_overview_paymentHeading: '',
    lbl_overview_addressBookHeading: '',
    lbl_overview_profileInformationHeading: '',
    lbl_overview_ordersHeading: '',
    lbl_overview_earnPointsHeading: '',
    lbl_overview_myWalletHeading: '',
    lbl_overview_myPlaceRewardsHeading: '',
  },
  commonLabels: {},
};

export default AccountOverview;
