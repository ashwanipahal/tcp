import React, { PureComponent } from 'react';
import { View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import RewardsPoints from '@tcp/core/src/components/features/account/common/organism/RewardsPoints';
import { getLabelValue, getScreenHeight } from '@tcp/core/src/utils';
import WalletLayout from '../styles/Wallet.style.native';
import MyRewards from '../../common/organism/MyRewards';
import AccountNumber from '../../common/organism/AccountNumber';
import PageHeadingWithLinks from '../../common/molecule/PageHeadingWithLinks';
import mock from './mock';
import FooterLinks from '../../common/molecule/FooterLinks';

class WalletView extends PureComponent {
  render() {
    const {
      labels,
      commonLabels,
      overViewLabels,
      isUserLoggedIn,
      navigation,
      openApplyNowModal,
      ...props
    } = this.props;
    const viewContainerStyle = { height: getScreenHeight() };
    return (
      <View style={viewContainerStyle}>
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
            <FooterLinks
              isUserLoggedIn={isUserLoggedIn}
              labels={{ ...labels, ...commonLabels, ...overViewLabels }}
              navigation={navigation}
              openApplyNowModal={openApplyNowModal}
              footerLinks={mock.walletFooterNavLegalLinks}
            />
          </WalletLayout>
        </ScrollView>
      </View>
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
};

export default WalletView;
