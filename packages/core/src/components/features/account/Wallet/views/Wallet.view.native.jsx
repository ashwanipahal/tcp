import React, { PureComponent } from 'react';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import RewardsPoints from '@tcp/core/src/components/features/account/common/organism/RewardsPoints';
import { getLabelValue } from '@tcp/core/src/utils';
import WalletLayout from '../styles/Wallet.style.native';
import MyRewards from '../../common/organism/MyRewards';
import AccountNumber from '../../common/organism/AccountNumber';
import PageHeadingWithLinks from '../../common/molecule/PageHeadingWithLinks';
import FooterLinks from '../../common/molecule/FooterLinks';
import GuestLoginOverview from '../../common/molecule/GuestLoginModule';

class WalletView extends PureComponent {
  render() {
    const {
      labels,
      commonLabels,
      overViewLabels,
      isUserLoggedIn,
      navigation,
      openApplyNowModal,
      footerLinks,
      ...props
    } = this.props;
    return (
      <>
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <WalletLayout>
            {isUserLoggedIn ? (
              <>
                <RewardsPoints tableView />
                <PageHeadingWithLinks
                  heading={getLabelValue(labels, 'lbl_my_wallet_heading', 'placeRewards')}
                  noTopPadding
                  noCTA
                >
                  <AccountNumber />
                  <MyRewards labels={labels} view="all" {...props} />
                </PageHeadingWithLinks>
              </>
            ) : null}
            <GuestLoginOverview
              isUserLoggedIn={isUserLoggedIn}
              labels={{ ...labels, ...commonLabels, ...overViewLabels }}
              navigation={navigation}
            />
            {footerLinks && footerLinks.length > 0 ? (
              <FooterLinks
                isUserLoggedIn={isUserLoggedIn}
                labels={{ ...labels, ...commonLabels, ...overViewLabels }}
                navigation={navigation}
                openApplyNowModal={openApplyNowModal}
                footerLinks={footerLinks}
              />
            ) : null}
          </WalletLayout>
        </ScrollView>
      </>
    );
  }
}

WalletView.propTypes = {
  labels: PropTypes.shape({
    placeRewards: PropTypes.shape({
      lbl_my_wallet_heading: PropTypes.string,
      lbl_my_rewards_program_details: PropTypes.string,
    }),
    common: PropTypes.shape({
      lbl_common_tnc: PropTypes.string,
    }),
  }),
  commonLabels: PropTypes.shape({}),
  overViewLabels: PropTypes.shape({}),
  navigation: PropTypes.func,
  isUserLoggedIn: PropTypes.string.isRequired,
  openApplyNowModal: PropTypes.func.isRequired,
  footerLinks: PropTypes.shape([]),
};

WalletView.defaultProps = {
  labels: {
    placeRewards: {
      lbl_my_wallet_heading: '',
      lbl_my_rewards_program_details: '',
    },
    common: {
      lbl_common_tnc: '',
    },
  },
  commonLabels: {},
  overViewLabels: {},
  navigation: () => {},
  footerLinks: [],
};

export default WalletView;
